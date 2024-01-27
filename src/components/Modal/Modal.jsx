import React, { Component } from 'react';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    this.showModal();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  showModal = () => {
    const { children } = this.props;

    this.instance = basicLightbox.create(children, {
      onShow: () => {
        document.body.style.overflow = 'hidden';
      },
      onClose: () => {
        document.body.style.overflow = 'visible';
        this.props.close();
      },
    });

    this.instance.show();
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.close();
    }
  };

  closeModal = event => {
    if (event.target === event.currentTarget) {
      this.props.close();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
          <span onClick={this.props.close} className={css.close}>
            X
          </span>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
