import { loadedPictures } from './server-service';
import { openFullPhoto } from './full-size-photo';
import { photoList } from './gallery';
import { getRandomArrayElem, debounce } from './random-utils';

const templateContent = document.querySelector('#picture').content.querySelector('a');
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');

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


const debouncedRenderPhotoList = debounce((photoObjects) => {
  clearPicturesContainer();
  renderPhotoList(photoObjects);
}, 500);


function clearPicturesContainer() {
  const picturesContainer = document.querySelector('.pictures');
  if (picturesContainer) {
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((picture) => picture.remove());
  }
}

function getDefaultPictures() {
  return loadedPictures && loadedPictures.length > 0 ? loadedPictures : [];
}


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

function getBestCommentsPictures() {
  return loadedPictures.slice().sort((a, b) => b.comments.length - a.comments.length);
}

const handleFilterClick = (filterFunction) => {
  const filteredPictures = filterFunction();
  if (filteredPictures && filteredPictures.length > 0) {
    debouncedRenderPhotoList(filteredPictures);
  }
};

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

export { renderPhotoList, clearPicturesContainer };
