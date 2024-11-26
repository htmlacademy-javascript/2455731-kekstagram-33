import { getRandomInteger, createRandomId, getRandomArrayElem, getRandomAvatarPath, getRandomUrlPath } from './random-utils.js';

const DESCRIPTIONS = ['Мой день', 'Просто фото','Хорошее настроение', 'Вам нравится?', 'Как дела?', 'Фото для вас', 'Все ок', 'В отпуске', 'Лалала'];
const NAMES = ['Коля', 'Маша', 'Лена', 'Аня', 'Женя', 'Слава', 'Толя', 'Лена', 'Сергей', 'Эдик', 'Витя', 'Андрей', 'Таня', 'Оля', 'Вика', 'Ира', 'Крис', 'Паша', 'Люба', 'Света', 'Наташа', 'Елена', 'Марина', 'Галя', 'Анди', 'Кенан','Глеб', 'Ярослав','Кевин','Алексей'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
const generatePhotoId = createRandomId(1, 25);
const generateCommentId = createRandomId(1, 500);


function createCommentsObject() {
  const commentId = generateCommentId();
  return {
    id: commentId,
    avatar: getRandomAvatarPath(1, 6),
    message: getRandomArrayElem(MESSAGES),
    name: getRandomArrayElem(NAMES),
  };
}

function createPhotoObject() {
  const numberOfComments = getRandomInteger(0, 30);
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: getRandomUrlPath(1, 25),
    description: getRandomArrayElem(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments:Array.from({length: numberOfComments}, createCommentsObject),
  };
}

const photoObjectsSet = (count) => Array.from({ length: count }, createPhotoObject);

export { photoObjectsSet };
