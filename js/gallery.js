import { openFullPhoto } from './full-size-photo';

const photoList = document.querySelector('.pictures');

photoList.addEventListener = ('click',(evt, pictures) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    const photoId = Number(thumbnail.dataset.id);

    const selectedPhoto = pictures.find((photo) => photo.id === Number(photoId));

    if (selectedPhoto) {
      openFullPhoto (selectedPhoto);
    }
  }
});
