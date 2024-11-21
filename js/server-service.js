import { renderPhotoList } from './photo-thumbnails';
import { isEscapeKey, isDocumentEvent } from './random-utils';
import { closeEditorPicture, setFormSubmit } from './upload-photo-form';

const BASE__URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET__DATA: '/data',
  POST__DATA: '/',
};
const PICTURES__COUNT = 25;


function showErrorMessage() {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageEdit = errorMessageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforebegin', errorMessageEdit);
  const errorMessageButton = document.querySelector('.error__button');

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
  successMessage.setAttribute('data-id', 'success-message');
  document.body.insertAdjacentElement('beforeend', successMessage);
  //console.log('Сообщение добавлено в DOM');
  // console.log('Количество элементов с классом .success:', document.querySelectorAll('.success').length);
  const successMessageButton = successMessage.querySelector('.success__button');

  successMessageButton.addEventListener('click', () => {
    //console.log('Кнопка закрытия нажата');
    removeSuccessMessage();
  });

  const onDocumentKeyPress = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeSuccessMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (isDocumentEvent(evt)) {
      removeSuccessMessage();
    }


    //const messageElement = document.querySelector('[data-id="success-message"]');
    //console.log('Клик зарегистрирован, цель события:', evt.target);
    //console.log('Удаляем сообщение');
    //if (messageElement && !messageElement.contains(evt.target)) {
  // removeSuccessMessage();
  // }
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeyPress);


  function removeSuccessMessage() {
    const messageElement = document.querySelector('[data-id="success-message"]');
    //console.log('Удаление сообщения, найден элемент:', messageElement);
    if (messageElement) {
      //console.log('Сообщение удалено, оставшиеся элементы с классом .success:', document.querySelectorAll('.success').length);
      messageElement.remove();
      document.removeEventListener('keydown', onDocumentKeyPress);
      document.removeEventListener('click', onDocumentClick);
      //console.log('Удаляем сообщение и обработчики');

    } else {
      //console.log('Элемент не найден для удаления');
    }
  }
}

function getErrorMessage() {
  const loadingBigDataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = loadingBigDataErrorTemplate.cloneNode(true);
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
      renderPhotoList(pictures.slice(0, PICTURES__COUNT));
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
    })
    .catch((err) => {
      onError(err, restoreData);
    });
};

export { loadingData, getErrorMessage, showSuccessMessage, showErrorMessage, sendData, ROUTE, BASE__URL};
