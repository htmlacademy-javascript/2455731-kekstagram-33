const buttonPictureSmall = document.querySelector('.scale__control--smaller');
const buttonPictureBig = document.querySelector('.scale__control--bigger');
const pictureSizeInput = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview img');


function getPictureSmall() {
  const minValue = 25;

  let inputValue = Number(parseInt(pictureSizeInput.value, 10));

  if (buttonPictureSmall) {
    if (inputValue > minValue) {
      inputValue -= 25;
      pictureSizeInput.value = `${inputValue}%`;
      picturePreview.style.transform = `scale(${inputValue / 100})`;
    }
  }
}

function getPictureBig() {
  const maxValue = 100;

  let inputValue = Number(parseInt(pictureSizeInput.value, 10));
  if (buttonPictureBig) {
    if (inputValue < maxValue) {
      inputValue += 25;
      pictureSizeInput.value = `${inputValue}%`;
      picturePreview.style.transform = `scale(${inputValue / 100})`;
    }
  }
}

buttonPictureBig.addEventListener('click', getPictureBig);

buttonPictureSmall.addEventListener('click', getPictureSmall);
