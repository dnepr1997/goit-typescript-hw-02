import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '600px',
    width: '1100px',
  },
};

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  src: string;
  alt: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ modalIsOpen, closeModal, src, alt }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img src={src} alt={alt} />
    </Modal>
  );
};

Modal.setAppElement('#root');
