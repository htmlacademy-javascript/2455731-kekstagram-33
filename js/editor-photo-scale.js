const buttonPictureSmall = document.querySelector('.scale__control--smaller');
const buttonPictureBig = document.querySelector('.scale__control--bigger');
const pictureSizeInput = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview img');

const MIN__VALUE = 25;
const MAX__VALUE = 100;

function getPictureSmall() {

  let inputValue = Number(parseInt(pictureSizeInput.value, 10));

  if (buttonPictureSmall) {
    if (inputValue > MIN__VALUE) {
      inputValue -= 25;
      pictureSizeInput.value = `${inputValue}%`;
      picturePreview.style.transform = `scale(${inputValue / 100})`;
    }
  }
}

function getPictureBig() {

  let inputValue = Number(parseInt(pictureSizeInput.value, 10));
  if (buttonPictureBig) {
    if (inputValue < MAX__VALUE) {
      inputValue += 25;
      pictureSizeInput.value = `${inputValue}%`;
      picturePreview.style.transform = `scale(${inputValue / 100})`;
    }
  }
}

buttonPictureBig.addEventListener('click', getPictureBig);

buttonPictureSmall.addEventListener('click', getPictureSmall);

export { pictureSizeInput };
