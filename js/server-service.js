import { renderPhotoList } from './photo-thumbnails';
import { isEscapeKey } from './random-utils';

const PICTURES__COUNT = 25;

function showErrorMessage() {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageEdit = errorMessageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforebegin', errorMessageEdit);
  const errorMessageButton = errorMessageEdit.querySelector('.error__button');

  const onDocumentKeyPress = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageEdit.remove();
    }
  };
  const onDocumentClick = (evt) => {
    if (!errorMessageEdit.contains(evt.target)) {
      errorMessageEdit.remove();
    }
  };
  function closeErrorMessageEdit() {

    errorMessageButton.addEventListener('click', () => {
      errorMessageEdit.remove();
      document.removeEventListener('keydown', onDocumentKeyPress);
      window.removeEventListener('click', onDocumentClick);

    });

    window.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyPress);
  }
  closeErrorMessageEdit();
}


function showSuccessMessage() {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successMessage);
  const successMessageButton = successMessage.querySelector('.success__button');

  const onDocumentKeyPress = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
    }
  };
  const onDocumentClick = (evt) => {
    if (!successMessage.contains(evt.target)) {
      successMessage.remove();
    }
  };

  function closeSuccesMessage() {

    successMessageButton.addEventListener('click', () => {
      successMessage.remove();
      document.removeEventListener('keydown', onDocumentKeyPress);
      window.removeEventListener('click', onDocumentClick);

    });

    window.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyPress);
  }
  closeSuccesMessage();
}


function getErrorMessage() {
  const loadingBigDataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadingBigDataErrorTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
}

function loadingData (onError) {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })

    .then((pictures) => {
      renderPhotoList(pictures.slice(0, PICTURES__COUNT));
    })
    .catch((err) => {
      onError(err);
    });
}

export { loadingData, getErrorMessage };
