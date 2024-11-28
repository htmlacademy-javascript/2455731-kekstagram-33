import { renderPhotoList } from './photo-thumbnails';
import { clearErrors } from './upload-photo-form';
import { isEscapeKey } from './random-utils';
const BASE__URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET__DATA: '/data',
  POST__DATA: '/',
};

const PICTURES__COUNT = 25;
const pictureFilter = document.querySelector('.img-filters');
let loadedPictures = [];


function showErrorMessage() {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageEdit = errorMessageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorMessageEdit);
  const errorMessageButton = document.querySelector('.error__button');

  const onDocumentKeyPress = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageEdit.remove();
    }
  };


  const onDocumentClick = (evt) => {
    if (errorMessageEdit.contains(evt.target)) {
      errorMessageEdit.remove();
    }
  };


  function closeErrorMessageEdit() {
    errorMessageButton.addEventListener('click', () => {
      errorMessageEdit.remove();
      document.removeEventListener('keydown', onDocumentKeyPress);
      document.removeEventListener('click', onDocumentClick);
    });

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyPress);
  }
  closeErrorMessageEdit();
}


function showSuccessMessage() {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  successMessage.setAttribute('data-id', 'success-message');
  document.body.insertAdjacentElement('beforeend', successMessage);
  const successMessageButton = successMessage.querySelector('.success__button');

  successMessageButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    removeSuccessMessage();
  });

  const onDocumentKeyPress = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeSuccessMessage();
    }
  };

  const onDocumentClick = function (evt) {
    const messageElement = document.querySelector('[data-id="success-message"]');
    if (messageElement.contains(evt.target)) {
      removeSuccessMessage();
    }
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeyPress);

  function removeSuccessMessage() {
    const messageElement = document.querySelector('[data-id="success-message"]');
    if (messageElement) {
      messageElement.remove();

      document.removeEventListener('keydown', onDocumentKeyPress);
      document.removeEventListener('click', onDocumentClick);
    }
  }
}

function getErrorMessage(error) {

  const loadingBigDataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadingBigDataErrorTemplate.cloneNode(true);

  errorMessage.textContent = error ? `Ошибка: ${error.message || error}` : 'Ошибка: не определена';

  document.body.insertAdjacentElement('beforeend', errorMessage);


  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
}


function loadingData(url, onError) {
  fetch(`${BASE__URL}${ROUTE.GET__DATA}`)

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })

    .then((pictures) => {
      pictureFilter.classList.remove('img-filters--inactive');
      loadedPictures = pictures.slice(0, PICTURES__COUNT);
      renderPhotoList(loadedPictures);
    })
    .catch((err) => {
      onError(err);
    });
}


const sendData = (url, body, onSuccess, onError, restoreData) => {
  fetch(`${BASE__URL}${ROUTE.POST__DATA}`, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} — ${response.statusText}`);
      }
      return response.json();
    })
    .then(() => {
      onSuccess();
      clearErrors();
    })
    .catch((err) => {
      if (typeof onError === 'function') {
        onError(err, restoreData);
      }
    });
};

export { loadingData, getErrorMessage, showSuccessMessage, showErrorMessage, sendData, ROUTE, BASE__URL, loadedPictures };
