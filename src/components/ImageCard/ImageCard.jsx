import css from './ImageCard.module.css';

export const ImageCard = ({ description, small, onClick }) => {
  return (
    <div className={css.conteiner} onClick={onClick}>
      <img src={small} alt={description} className={css.image} />
    </div>
  );
};
