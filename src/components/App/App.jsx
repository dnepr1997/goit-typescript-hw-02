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

function App() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageNow, setImageNow] = useState({ src: '', alt: '' });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [showBtnGalery, setShowBtnGalery] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const searchPhoto = async (query, page = 1) => {
      if (!query) return;
      try {
        setLoader(true);
        setError(false);
        const data = await PhotoService(query, page);
        setShowBtnGalery(data.total_pages && data.total_pages !== page);
        setPhotos(prev => [...prev, ...data.results]);
        console.log(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
        setIsFirstLoad(false);
      }
    };
    searchPhoto(search, page);
  }, [page, search]);

  const openModal = img => {
    setImageNow(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = search => {
    if (!search) {
      return;
    }
    setSearch(search);
    setPage(1);
    setPhotos([]);
    setError(false);
  };
  const hendleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} />
      {!isFirstLoad && error && <ErrorMessage />}
      {loader && <ColorRingSpinners />}
      <ImageGallery photos={photos} openModal={openModal} />
      {showBtnGalery > 0 && <LoadMoreBtn onClick={hendleLoadMoreBtn} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={imageNow.src}
        alt={imageNow.alt}
      />
      <Toaster />
    </div>
  );
}

export default App;
