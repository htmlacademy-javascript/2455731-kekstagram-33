import { photoObjectsSet } from './photo-data';
import { openFullPhoto } from './full-size-photo';

const photoList = document.querySelector('.pictures');
const templateContent = document.querySelector('#picture').content.querySelector('a');


const createdPhotoObjects = photoObjectsSet(25);

const renderPhotoList = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < createdPhotoObjects.length; i++) {
    const element = createdPhotoObjects[i];
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
  }
  photoList.append(fragment);
};

export { createdPhotoObjects, renderPhotoList };
