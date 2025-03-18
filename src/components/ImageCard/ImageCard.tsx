import css from './ImageCard.module.css';

interface ImageCardProps {
  description: string;
  small: string;
  onClick: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ description, small, onClick }) => {
  return (
    <div className={css.conteiner} onClick={onClick}>
      <img src={small} alt={description} className={css.image} />
    </div>
  );
};
