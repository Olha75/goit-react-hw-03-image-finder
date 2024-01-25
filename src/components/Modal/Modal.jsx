import * as basicLightbox from 'basiclightbox';
import css from './modal.module.css';

class Modal extends Component {
  render() {
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <span className={css.close}>X</span>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}

const instance = basicLightbox.create(`
    <div class="modal">
        <p>
            Your first lightbox with just a few lines of code.
            Yes, it's really that simple.
        </p>
    </div>
`);

instance.show();

export default Modal;
