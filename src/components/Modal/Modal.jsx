import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, close }) => {
  useEffect(() => {
    const instance = basicLightbox.create(children, {
      onShow: () => {
        document.body.style.overflow = 'hidden';
      },
      onClose: () => {
        document.body.style.overflow = 'visible';
        close();
      },
    });

    instance.show();

    return () => instance.close();
  }, [children, close]);

  const closeModal = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      close();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <span onClick={close} className={css.close}>
          X
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
