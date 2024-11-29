import { openFullPhoto } from './full-size-photo';
import { getLoadedPictures } from './server-service';

const photoList = document.querySelector('.pictures');

photoList.addEventListener ('click',(evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    const photoId = Number(thumbnail.dataset.id);

    const selectedPhoto = getLoadedPictures().find((photo) => photo.id === Number(photoId));

    if (selectedPhoto) {
      openFullPhoto (selectedPhoto);
    }
  }
});
export { photoList };
