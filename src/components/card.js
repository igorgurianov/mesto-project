import { clickLargeImage } from "./index.js";
export { createCard, clickLikeCard, renderCard }

// Добавление новых карточек
const cardsContainer = document.querySelector('.cards-grid');
const userTemplate = document.querySelector('#card-template').content; // выбираем темплейт

// Шесть карточек «из коробки»

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Рендер первых карточек
initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link))
})

// создание новых карточек
function createCard(cardNameValue, cardSrcValue) {
  const cardElement = userTemplate.querySelector('.place').cloneNode(true); //клонируем див внутри него со всем содержимым
  const cardElementPhoto = cardElement.querySelector('.place__photo'); // картинка как элемент карточки
  cardElement.querySelector('.place__name').textContent = cardNameValue; //подставляем название места из инпута
  cardElementPhoto.src = cardSrcValue; // подставляем ссылку из инпута
  cardElementPhoto.alt = cardNameValue // альтернативный текст если на загрузится
  cardElementPhoto.addEventListener('click', function () { clickLargeImage(cardSrcValue, cardNameValue) }) // слушатель на картинку для открытия попапа - передаем ему 2 аргумента
  cardElement.querySelector('.place__like-button').addEventListener('click', clickLikeCard) // Слушатель на кнопку лайк
  cardElement.querySelector('.place__delete-button').addEventListener('click', clickDeleteCard) // слушатель на кнопку удаления карточки
  return cardElement
}

// отображение новых карточек в DOM
function renderCard(card) {
  cardsContainer.prepend(card); // вставляем наш контейнер с названием и ссылкой в начало блока карточек
}

// Функция коллбэк для слушателя на кнопке удалить.
function clickDeleteCard(event) {
  event.target.closest('.place').remove() // Отлеживаем на какой элемент кликнули, выбираем ближайший с классом Place и удаляем его
}

// Кнопка лайк.
function clickLikeCard(event) {
  event.target.classList.toggle('place__like-button_active') // Переключаем наличие/отсутствие класса активной кнопки
}
