/*Функция для проверки длины строки */

function checkStringLength (str, length) {
  return str.length === length;
}
checkStringLength('деструктуризация', 10);

/**Функция для проверки, является ли строка палиндромом */

const palindrome = function isPalindrome(str) {
  str = str.toLowerCase().replaceAll(' ', '');
  let reversed = '';

  for(let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed === str;
};
palindrome('рототор');
palindrome('Леша на полке клопа нашел');
palindrome('ДовОд');
palindrome('дед');
palindrome('топот');
