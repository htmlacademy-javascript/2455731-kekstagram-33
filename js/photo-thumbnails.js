
import { loadedPictures } from './server-service';
import { openFullPhoto } from './full-size-photo';
import { photoList } from './gallery';
import { getRandomArrayElem } from './random-utils';

//const photoList = document.querySelector('.pictures');
const templateContent = document.querySelector('#picture').content.querySelector('a');
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');


const renderPhotoList = (createdPhotoObjects) => {
  //photoList.innerHTML = '';
  //console.log('Фото для отображения:', createdPhotoObjects);
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
    fragment.append(photoItem);
  });
  photoList.append(fragment);
};

buttonFilterDefault.addEventListener('click', () => {
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.add('img-filters__button--active');

  renderPhotoList(loadedPictures);
});

buttonFilterRandom.addEventListener('click', () => {
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.add('img-filters__button--active');

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
});

buttonFilterDiscussed.addEventListener('click', () => {
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.add('img-filters__button--active');

  const bestCommentsCount = loadedPictures.slice();
  //console.log('До сортировки:', bestCommentsCount);
  const bestCommentsSorted = bestCommentsCount.sort((a, b) => b.comments.length - a.comments.length);
  //console.log('После сортировки:', bestCommentsSorted);

  renderPhotoList(bestCommentsSorted);
});

export { renderPhotoList };
