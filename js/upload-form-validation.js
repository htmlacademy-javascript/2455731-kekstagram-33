const uploadForm = document.querySelector('#upload-select-image');

const validator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

function validateComments(value) {
  return value.length <= 140;
}

validator.addValidator(uploadForm.querySelector('.text__hashtags'), (value) => {
  const hashTagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashTags = value.split(' ').filter((tag) => tag.trim() !== '');
  return hashTags.every((tag) => hashTagPattern.test(tag));
}, 'Хэштег должен начинаться с # и содержать только буквы и цифры');


validator.addValidator(uploadForm.querySelector('.text__hashtags'), (value) => {
  const hashTags = value.split(' ').filter((tag) => tag.trim() !== '');
  return hashTags.every((tag) => tag.length <= 20);
}, 'Максимальная длина одного хэштега - 20 символов');


validator.addValidator(uploadForm.querySelector('.text__hashtags'), (value) => {
  const hashTags = value.split(' ').filter((tag) => tag.trim() !== '');
  return hashTags.length <= 5;
}, 'Нельзя указать больше 5 хэштегов');


validator.addValidator(uploadForm.querySelector('.text__hashtags'), (value) => {
  const hashTags = value.split(' ').filter((tag) => tag.trim() !== '');
  const lowerCasedTags = hashTags.map((tag) => tag.toLowerCase());
  return new Set(lowerCasedTags).size === lowerCasedTags.length;
}, 'Хэштеги не должны повторяться');


validator.addValidator(uploadForm.querySelector('.text__description'), validateComments, 'Максимальная длина комментария - 140 символов');

export { validator };
