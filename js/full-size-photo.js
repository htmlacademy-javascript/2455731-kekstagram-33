import { isEscapeKey, isEnterKey } from './random-utils';

const pictureContainer = document.querySelector('.big-picture');
const closeButton = pictureContainer.querySelector('#picture-cancel');
const bigPictureImage = pictureContainer.querySelector('.big-picture__img img');
const bigPictureLikes = pictureContainer.querySelector('.likes-count');

const bigPictureCommentsList = pictureContainer.querySelector('.social__comments');
const bigPictureCapture = pictureContainer.querySelector('.social__caption');
const bigPictureCommentsLoader = pictureContainer.querySelector('.comments-loader');
let commentsShownCount = 0;
let currentPhotoData = null;


const onDocumentKeyDown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const onDocumentKeyEnter = function (evt) {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    openFullPhoto();
  }
};

function renderComments(photoData) {
  const totalComments = photoData.comments.length;
  const commentsToShow = photoData.comments.slice(0, commentsShownCount);
  bigPictureCommentsList.innerHTML = '';

  commentsToShow.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentItem.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
    bigPictureCommentsList.appendChild(commentItem);
  });

  const bigPictureCommentsShown = pictureContainer.querySelector('.social__comment-shown-count');
  const bigPictureCommentsTotal = pictureContainer.querySelector('.social__comment-total-count');

  bigPictureCommentsShown.textContent = commentsToShow.length;
  bigPictureCommentsTotal.textContent = totalComments;

  if (commentsShownCount >= totalComments) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
  }
}

function loadMoreComments() {
  commentsShownCount += 5;
  renderComments(currentPhotoData);
}

function openFullPhoto(photoData) {
  commentsShownCount = 5;
  currentPhotoData = photoData;
  bigPictureImage.src = photoData.url;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureCapture.textContent = photoData.description;

  renderComments(photoData);

  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('keydown', onDocumentKeyEnter);
  bigPictureCommentsLoader.addEventListener('click',loadMoreComments);
}


function closeFullPhoto() {
  pictureContainer.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('keydown', onDocumentKeyEnter);
  document.body.classList.remove('modal-open');
  bigPictureCommentsLoader.removeEventListener('click', loadMoreComments);
}

closeButton.addEventListener('click', closeFullPhoto);

export { renderComments, openFullPhoto, closeFullPhoto };
