function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomId(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getRandomArrayElem(elems) {
  return elems[getRandomInteger(0, elems.length - 1)];
}

function getRandomAvatarPath(min, max) {
  const randomNumber = getRandomInteger(min, max);
  return `img/avatar-${randomNumber}.svg`;
}

function getRandomUrlPath(min, max) {
  const randomNumber = getRandomInteger(min, max);
  return `photos/${randomNumber}.jpg`;
}

function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

function isDocumentEvent (evt) {
  return evt.target === document;
}

function isEnterKey(evt) {
  return evt.key === 'Enter';
}

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export { getRandomInteger, createRandomId, getRandomArrayElem, getRandomAvatarPath, getRandomUrlPath, isEscapeKey, isEnterKey, isDocumentEvent, debounce };
