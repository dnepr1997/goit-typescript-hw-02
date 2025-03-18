import { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { PhotoService } from '../PhotoService/PhotoService';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageModal } from '../ImageModal/ImageModal';
import { ColorRingSpinners } from '../Loader/ColorRingSpinners';
import { Toaster } from 'react-hot-toast';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Image, ImageNow } from '../types/types';

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Image[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [imageNow, setImageNow] = useState<ImageNow>({ src: '', alt: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showBtnGalery, setShowBtnGalery] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    const searchPhoto = async (query: string, page: number = 1) => {
      if (!query) return;
      try {
        setLoader(true);
        setError(false);
        const data = await PhotoService(query, page);
        setShowBtnGalery(Boolean(data.total_pages) && data.total_pages !== page);
        setPhotos(prev => [...prev, ...data.results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
        setIsFirstLoad(false);
      }
    };
    searchPhoto(search, page);
  }, [page, search]);

  const openModal = (img: ImageNow) => {
    setImageNow(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (search: string) => {
    if (!search) return;
    setSearch(search);
    setPage(1);
    setPhotos([]);
    setError(false);
  };

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} />
      {!isFirstLoad && error && <ErrorMessage />}
      {loader && <ColorRingSpinners />}
      <ImageGallery photos={photos} openModal={openModal} />
      {showBtnGalery && <LoadMoreBtn onClick={handleLoadMoreBtn} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={imageNow.src}
        alt={imageNow.alt}
      />
      <Toaster />
    </div>
  );
};

export default App;
