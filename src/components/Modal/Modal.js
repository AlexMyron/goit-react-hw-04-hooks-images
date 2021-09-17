import PropTypes from "prop-types";
import { useEffect } from "react";
import { ModalContent, Overlay } from "./Modal.styled";

const Modal = ({ handleOverlayClick, handleKeycode, children }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code !== "Escape") return;
      handleKeycode();
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>{children}</ModalContent>
    </Overlay>
  );
};

Modal.propTypes = { handleOverlayClick: PropTypes.func.isRequired };

export default Modal;
