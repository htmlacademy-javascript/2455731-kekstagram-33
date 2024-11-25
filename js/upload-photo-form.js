import { isEscapeKey } from './random-utils';
import { validator} from './upload-form-validation';
import { sendData, ROUTE, BASE__URL } from './server-service';
import { pictureSizeInput } from './editor-photo-scale';
import { effects, getEffect, picturePreview, slider} from './editor-photo-slider';


const uploadForm = document.querySelector('#upload-select-image');
const pictureUploadInput = document.querySelector('.img-upload__input');
const pictureUploadEdit = document.querySelector('.img-upload__overlay');
const closeEditor = document.querySelector('.img-upload__cancel');
const uploadFormInputsContainer = document.querySelector('.img-upload__text');
const uploadFormInputs = uploadFormInputsContainer.querySelectorAll('input, textarea');
const uploadSubmitButton = document.querySelector('.img-upload__submit');


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
  pictureUploadEdit.classList.add('hidden');
  picturePreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  picturePreview.style.filter = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDownEdit);
  pictureUploadInput.value = '';
  pictureSizeInput.value = '100%';
  uploadFormInputs.value = '';

  slider.noUiSlider.set(100);
  effects.removeEventListener('change', getEffect);
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
  //console.log('Blocking submit button');
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  //console.log('Unblocking submit button');
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = submitButtonText.IDLE;
};

const unblockFormElements = () => {
  const formElements = document.querySelectorAll('input, textarea');
  formElements.forEach((element) => {
    element.disabled = false;
  });
};


function clearErrors() {
  document.querySelectorAll('.pristine-error').forEach((err) => err.parentNode.removeChild(err));
  document.querySelectorAll('.img-upload__field-wrapper--error').forEach((wrapper) => {
    wrapper.classList.remove('img-upload__field-wrapper--error');
  });
}

const setFormSubmit = (onSuccess, onError) => {

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validator.validate();
    if (isValid) {
      blockSubmitButton();


      const hashtagValue = document.querySelector('.text__hashtags').value;
      const commentValue = document.querySelector('.text__description').value;
      const photoFile = document.querySelector('#upload-file').files[0];
      const formData = new FormData(evt.target);
      const restoreData = { hashtagValue, commentValue, photoFile };

      //formData.append('scale', currentScaleValue);
      //formData.append('effect', selectedEffectValue);

      sendData(ROUTE.POST__DATA, formData, () => {

        fetch(`${BASE__URL}${ROUTE.POST__DATA}`, {

          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Ошибка: ${response.status} — ${response.statusText}`);
            }
            return response.json();
          })
          .then(() => {

            document.querySelector('.text__hashtags').value = '';
            document.querySelector('.text__description').value = '';
            document.querySelector('#upload-file').value = '';
            uploadForm.reset();

            unblockSubmitButton();
            unblockFormElements();
            onSuccess();
            clearErrors();


          })
          .catch((err) => {
            document.querySelector('.text__hashtags').value = restoreData.hashtagValue;
            document.querySelector('.text__description').value = restoreData.commentValue;
            unblockSubmitButton();
            unblockFormElements();
            onError(err, restoreData);

            if (restoreData.photoFile) {
              const imgPreview = document.querySelector('.img-upload__preview img');
              const objectURL = URL.createObjectURL(restoreData.photoFile);
              imgPreview.src = objectURL;
            }
          },
          onError
          );
      });
    }
  });
};

closeEditor.addEventListener('click', closeEditorPicture);

export { openEditorPicture, closeEditorPicture, setFormSubmit, clearErrors };
