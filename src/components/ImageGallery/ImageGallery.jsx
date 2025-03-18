import { ImageCard } from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul>
      {photos.map(({ alt_description, id, urls: { small, regular } }) => (
        <li
          className={css.conteiner}
          key={id}
          onClick={() => openModal({ src: regular, alt: alt_description })}
        >
          <ImageCard
            description={alt_description}
            small={small}
            onClick={() => openModal({ src: regular, alt: alt_description })}
          />
        </li>
      ))}
    </ul>
  );
};
