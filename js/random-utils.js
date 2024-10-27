/**получение случайного числа */
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/**функция- получение идентификатора*/

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

/**функция по получению рандомного индекса из массива */

function getRandomArrayElem(elems) {
  return elems[getRandomInteger(0, elems.length - 1)];
}


/**функция-номер аватара */

function getRandomAvatarPath(min, max) {
  const randomNumber = getRandomInteger(min, max);
  return `img/avatar-${randomNumber}.svg`;
}

/**функция-создание URL */

function getRandomUrlPath(min, max) {
  const randomNumber = getRandomInteger(min, max);
  return `photos/${randomNumber}.jpg`;
}

export { getRandomInteger, createRandomId, getRandomArrayElem, getRandomAvatarPath, getRandomUrlPath };

/**функция для аватара и фото */

/*function getRandomValue(template, min, max) {
  const randomNumber = getRandomInteger(min, max);
  return template.replace(/{{number}}/g, randomNumber);
}

const randomAvatarPath = getRandomValue('img/avatar-{{number}}.svg', 1, 6);
const randomPhotoPath = getRandomValue('photos/{{number}}.jpg', 1, 25);*/


