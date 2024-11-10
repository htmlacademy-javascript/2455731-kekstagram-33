const effectValue = document.querySelector('.effect-level__value');// скрытое поле для отправки на сервер значений слайдера
//const picturePreviewContainer = document.querySelector('.img-upload__preview');
const picturePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
//const defaultEffect = document.querySelector('#effect-none');
//const effectChrome = document.querySelector('#effect-chrome');
//const effectSepia = document.querySelector('#effect-sepia');
//const effectMarvin = document.querySelector('#effect-marvin');
//const effectPhobos = document.querySelector('#effect-phobos');
//const effectHeat = document.querySelector('#effect-heat');
const effects = document.querySelector('.effects__list');

effectValue.value = 100;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
});

function getEffect(evt) {
  if (evt.target.matches('input[type="radio"]')) {
    const selectedEffectValue = evt.target.value;

    picturePreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');

    if (selectedEffectValue === 'none') {
      slider.classList.add('hidden');
      sliderContainer.classList.add('hidden');
      picturePreview.style.filter = '';
      return;
    }
    slider.classList.remove('hidden');
    sliderContainer.classList.remove('hidden');

    if (selectedEffectValue === 'chrome') {
      picturePreview.classList.add('effects__preview--chrome');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
    } else if (selectedEffectValue === 'sepia') {
      picturePreview.classList.add('effects__preview--sepia');
    } else if (selectedEffectValue === 'marvin') {
      picturePreview.classList.add('effects__preview--marvin');
    } else if (selectedEffectValue === 'phobos') {
      picturePreview.classList.add('effects__preview--phobos');
    } else if (selectedEffectValue === 'heat') {
      picturePreview.classList.add('effects__preview--heat');
    }
  }
}

export { effects, getEffect };
