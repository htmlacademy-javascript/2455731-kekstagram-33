import { createdPhotoObjects } from './photo-thumbnails';
import { openFullPhoto } from './full-size-photo';

const photoList = document.querySelector('.pictures');

photoList.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    const photoId = Number(thumbnail.dataset.id);

    const selectedPhoto = createdPhotoObjects.find((photo) => photo.id === Number(photoId));

    if (selectedPhoto) {
      openFullPhoto (selectedPhoto);
    }
  }
});

