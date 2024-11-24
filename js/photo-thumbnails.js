import { loadedPictures } from './server-service';
import { openFullPhoto } from './full-size-photo';
import { photoList } from './gallery';
import { getRandomArrayElem, debounce } from './random-utils';

const templateContent = document.querySelector('#picture').content.querySelector('a');
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');

function getUploadInput() {
  return document.querySelector('#upload-select-image');
}


/*const renderPhotoList = (createdPhotoObjects) => {

  const fragment = document.createDocumentFragment();

  createdPhotoObjects.forEach((element) => {
    const photoItem = templateContent.cloneNode(true);
    photoItem.dataset.id = element.id;
    photoItem.querySelector('.picture__img').src = element.url;
    photoItem.querySelector('.picture__img').alt = element.description;
    photoItem.querySelector('.picture__likes').textContent = element.likes;
    photoItem.querySelector('.picture__comments').textContent = element.comments.length;

    photoItem.addEventListener('click', () => {
      openFullPhoto(element);
    });
    fragment.appendChild(photoItem);
  });
  photoList.append(fragment);
};

const debouncedRenderPhotoList = debounce((photoObjects) => {
  console.log('Render вызван в', Date.now());
  clearPicturesContainer();
  renderPhotoList(photoObjects);
}, 500);

function clearPicturesContainer () {
  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((picture) => picture.remove());
  }
}

const handleFilterClick = (filterFunction) => {
  clearPicturesContainer();

  const filteredPictures = filterFunction();
  debouncedRenderPhotoList(filteredPictures);
  console.log('Фильтр применён, количество картинок:', filteredPictures.length);
};

function getDefaultPictures() {
  return loadedPictures && loadedPictures.length > 0 ? loadedPictures : [];
  //return loadedPictures; // Возвращаем все картинки без изменений
}

buttonFilterDefault.addEventListener('click', () => {
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.add('img-filters__button--active');

  const uploadInput = getUploadInput();
  if (uploadInput) {
    void uploadInput;
  }

  const defaultPictures = getDefaultPictures();
  debouncedRenderPhotoList(defaultPictures);
});

buttonFilterRandom.addEventListener('click', () => {
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.add('img-filters__button--active');

  const uploadInput = getUploadInput();
  if (uploadInput) {
    void uploadInput;
  }


  const randomPictures = [];
  const randomPicturesEdit = loadedPictures.slice();
  const randomMaxIteration = 25;
  let i = 0;

  while (randomPictures.length < 10 && i < randomMaxIteration) {
    i++;

    const randomPicturesResult = getRandomArrayElem(randomPicturesEdit);

    if (!randomPictures.includes(randomPicturesResult)) {
      randomPictures.push(randomPicturesResult);
    }
  }
  debouncedRenderPhotoList(randomPictures);
});


buttonFilterDiscussed.addEventListener('click', () => {
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.add('img-filters__button--active');

  const uploadInput = getUploadInput();
  if (uploadInput) {
    void uploadInput;
  }


  const bestCommentsCount = loadedPictures.slice();
  const bestCommentsSorted = bestCommentsCount.sort((a, b) => b.comments.length - a.comments.length);
  debouncedRenderPhotoList(bestCommentsSorted);
});

export { renderPhotoList };*/
const renderPhotoList = (createdPhotoObjects) => {
  const fragment = document.createDocumentFragment();

  createdPhotoObjects.forEach((element) => {
    const photoItem = templateContent.cloneNode(true);
    photoItem.dataset.id = element.id;
    photoItem.querySelector('.picture__img').src = element.url;
    photoItem.querySelector('.picture__img').alt = element.description;
    photoItem.querySelector('.picture__likes').textContent = element.likes;
    photoItem.querySelector('.picture__comments').textContent = element.comments.length;

    photoItem.addEventListener('click', () => {
      openFullPhoto(element);
    });
    fragment.appendChild(photoItem);
  });

  photoList.append(fragment);
};

// Дебаунс-функция для рендеринга списка
const debouncedRenderPhotoList = debounce((photoObjects) => {
  console.log('Render вызван в', Date.now());
  clearPicturesContainer();
  renderPhotoList(photoObjects);
}, 500);

// Функция для очистки контейнера с картинками
function clearPicturesContainer() {
  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((picture) => picture.remove());
  }
}

// Функция для получения картинок по умолчанию
function getDefaultPictures() {
  return loadedPictures && loadedPictures.length > 0 ? loadedPictures : [];
}

// Функция для случайного фильтра
function getRandomPictures() {
  const randomPictures = [];
  const randomPicturesEdit = loadedPictures.slice();
  const randomMaxIteration = 25;
  let i = 0;

  while (randomPictures.length < 10 && i < randomMaxIteration) {
    i++;
    const randomPicturesResult = getRandomArrayElem(randomPicturesEdit);

    if (!randomPictures.includes(randomPicturesResult)) {
      randomPictures.push(randomPicturesResult);
    }
  }

  return randomPictures;
}

// Функция для фильтра обсуждаемых картинок
function getBestCommentsPictures() {
  return loadedPictures.slice().sort((a, b) => b.comments.length - a.comments.length);
}

// Универсальная функция для обработки клика по фильтру
const handleFilterClick = (filterFunction) => {
  const filteredPictures = filterFunction();
  if (filteredPictures && filteredPictures.length > 0) {
    console.log('Фильтр применён, количество картинок:', filteredPictures.length);
    debouncedRenderPhotoList(filteredPictures);
  } else {
    console.warn('Нет картинок для отображения после фильтрации');
  }
};

// Обработчики событий для кнопок фильтров
buttonFilterDefault.addEventListener('click', () => {
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.add('img-filters__button--active');

  handleFilterClick(getDefaultPictures);
});

buttonFilterRandom.addEventListener('click', () => {
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.add('img-filters__button--active');

  handleFilterClick(getRandomPictures);
});

buttonFilterDiscussed.addEventListener('click', () => {
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.add('img-filters__button--active');

  handleFilterClick(getBestCommentsPictures);
});

export { renderPhotoList };
