
import { isEscapeKey } from './random-utils';
import { validator } from './upload-form-validation';
import { effects, getEffect } from './editor-photo-slider';

const uploadForm = document.querySelector('#upload-select-image');
const pictureUploadInput = document.querySelector('.img-upload__input');
const pictureUploadEdit = document.querySelector('.img-upload__overlay');
const closeEditor = document.querySelector('.img-upload__cancel');
const uploadFormInputsContainer = document.querySelector('.img-upload__text');
const uploadFormInputs = uploadFormInputsContainer.querySelectorAll('input, textarea');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
if (uploadSubmitButton) {
  //
}

const onDocumentKeyDown = function (evt) {
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
  pictureUploadEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  effects.addEventListener('change', getEffect);
}

function closeEditorPicture() {
  pictureUploadEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  effects.removeEventListener('change', getEffect);
  uploadForm.reset();
  if (validator) {
    validator.reset();
  }
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = validator.validate();
  if (isValid) {
    uploadForm.submit();
  }
});

pictureUploadInput.addEventListener('change', openEditorPicture);
closeEditor.addEventListener('click', closeEditorPicture);

export { openEditorPicture, closeEditorPicture };
