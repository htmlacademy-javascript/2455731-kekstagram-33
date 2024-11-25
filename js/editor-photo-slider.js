const effectValue = document.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effects = document.querySelector('.effects__list');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});


function getEffect(evt) {
  if (evt.target.matches('input[type="radio"]')) {
    const selectedEffectValue = evt.target.value;

    picturePreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');

    if (selectedEffectValue === 'none') {
      slider.classList.add('hidden');
      sliderContainer.classList.add('hidden');
      picturePreview.style.filter = '';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      slider.noUiSlider.set(100);
      return;
    }

    slider.classList.remove('hidden');
    sliderContainer.classList.remove('hidden');

    updateSliderOptions(selectedEffectValue);
  }
}

function updateSliderOptions(selectedEffectValue) {
  switch (selectedEffectValue) {
    case 'chrome':
      picturePreview.classList.add('effects__preview--chrome');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      slider.noUiSlider.set(1);
      break;
    case 'sepia':
      picturePreview.classList.add('effects__preview--sepia');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      slider.noUiSlider.set(1);
      break;
    case 'marvin':
      picturePreview.classList.add('effects__preview--marvin');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      slider.noUiSlider.set(100);
      break;
    case 'phobos':
      picturePreview.classList.add('effects__preview--phobos');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      slider.noUiSlider.set(3);
      break;
    case 'heat':
      picturePreview.classList.add('effects__preview--heat');
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
      });
      slider.noUiSlider.set(3);
      break;
  }
}

function getSliderUpdate(values, handle, selectedEffectValue) {
  effectValue.value = slider.noUiSlider.get();

  const value = parseFloat(values[handle]);

  if (Number.isInteger(value)) {
    effectValue.value = value.toString();
  } else {
    effectValue.value = value.toFixed(1);
  }

  switch (selectedEffectValue) {
    case 'chrome':
      picturePreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      picturePreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      picturePreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      picturePreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      picturePreview.style.filter = `brightness(${value})`;
      break;
  }
}

slider.noUiSlider.off('update');
slider.noUiSlider.on('update', (values, handle) => {
  const selectedEffectValue = document.querySelector('input[type="radio"]:checked').value;
  getSliderUpdate(values, handle, selectedEffectValue);
});

export { effects, getEffect, updateSliderOptions, picturePreview, slider, getSliderUpdate};
