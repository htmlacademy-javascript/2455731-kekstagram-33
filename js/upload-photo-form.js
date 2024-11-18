import { isEscapeKey } from './random-utils';
import { validator } from './upload-form-validation';
import { pictureSizeInput } from './editor-photo-scale';
import { effects, getEffect, picturePreview, slider } from './editor-photo-slider';

const uploadForm = document.querySelector('#upload-select-image');
const pictureUploadInput = document.querySelector('.img-upload__input');
const pictureUploadEdit = document.querySelector('.img-upload__overlay');
const closeEditor = document.querySelector('.img-upload__cancel');
const uploadFormInputsContainer = document.querySelector('.img-upload__text');
const uploadFormInputs = uploadFormInputsContainer.querySelectorAll('input, textarea');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
const hashtagValue = document.querySelector('.text__hashtags').value;
const commentValue = document.querySelector('.text__description').value;
const photoFile = document.querySelector('.img-upload__input [type="file"]').files[0];


const submitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};


const onDocumentKeyDownEdit = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    for (const elem of uploadFormInputs) {
      if (document.activeElement === elem) {
        evt.stopPropagation();
        return;
      }
    }
    closeEditorPicture();
  }
};

function openEditorPicture() {
  picturePreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  picturePreview.style.filter = '';
  pictureUploadEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDownEdit);
  const defaultEffect = 'none';
  const effectRadio = document.querySelector(`#effect-${defaultEffect}`);

  if (effectRadio) {
    effectRadio.checked = true;
    getEffect({ target: effectRadio });
  }
  effects.addEventListener('change', getEffect);
}

function closeEditorPicture() {
  picturePreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  picturePreview.style.filter = '';
  pictureUploadEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDownEdit);
  pictureUploadInput.value = '';
  pictureSizeInput.value = '100%';
  uploadFormInputs.value = '';

  slider.noUiSlider.set(100);
  effects.removeEventListener('change', getEffect);
  uploadForm.reset();
  if (validator) {
    validator.reset();
  }
}

pictureUploadInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    picturePreview.src = imageUrl;
  }
  openEditorPicture();
});

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = submitButtonText.IDLE;
};


const setFormSubmit = (onSuccess, onError) => {

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validator.validate();
    if (isValid) {
      blockSubmitButton();

      const formData = new FormData(evt.target);
      fetch('https://32.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        }
      ).then(() => {
        unblockSubmitButton();
        onSuccess();
      })

        .catch((err) => {
          onError(err);
          document.querySelector('.text__hashtags').value = hashtagValue;
          document.querySelector('.text__description').value = commentValue;
          if (photoFile) {
            const imgPreview = document.querySelector('.img-upload__preview img');
            const objectURL = URL.createObjectURL(photoFile);
            imgPreview.src = objectURL;
          }
        });
    }
  });
};

closeEditor.addEventListener('click', closeEditorPicture);

export { openEditorPicture, closeEditorPicture, setFormSubmit };
