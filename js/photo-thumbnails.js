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

buttonFilterDefault.addEventListener('click', () => {
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.add('img-filters__button--active');

  const uploadInput = getUploadInput();
  if (uploadInput) {
    void uploadInput;
  }

  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((picture) => picture.remove());
  }
  debounce(() => renderPhotoList(loadedPictures))();
});

buttonFilterRandom.addEventListener('click', () => {
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.add('img-filters__button--active');

  const uploadInput = getUploadInput();
  if (uploadInput) {
    void uploadInput;
  }

  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((picture) => picture.remove());
  }
  debounce(() => {
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
    renderPhotoList(randomPictures);
  })();
});

buttonFilterDiscussed.addEventListener('click', () => {
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.add('img-filters__button--active');

  const uploadInput = getUploadInput();
  if (uploadInput) {
    void uploadInput;
  }

  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((picture) => picture.remove());
  }


  debounce(() => {
    const bestCommentsCount = loadedPictures.slice();
    const bestCommentsSorted = bestCommentsCount.sort((a, b) => b.comments.length - a.comments.length);
    renderPhotoList(bestCommentsSorted);
  })();
});

export { renderPhotoList };
