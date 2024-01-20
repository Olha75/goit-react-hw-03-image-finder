import * as basicLightbox from 'basiclightbox';
import css from './modal.module.css';

{
  /* <div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>; */
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
