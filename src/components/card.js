import { clickLargeImage } from "./index.js";
import { getCards, deleteCard, likeCard, deleteLikeCard } from './api.js'
export { createCard, clickLikeCard, renderCard, updateLikeCounter }

// Добавление новых карточек
const cardsContainer = document.querySelector('.cards-grid');
const userTemplate = document.querySelector('#card-template').content; // выбираем темплейт

getCards()

// создание новых карточек
function createCard(cardNameValue, cardSrcValue, cardLikeCounter, cardOwnerId, cardId, likes) {
  const cardElement = userTemplate.querySelector('.place').cloneNode(true); //клонируем див внутри него со всем содержимым
  const cardElementPhoto = cardElement.querySelector('.place__photo'); // картинка как элемент карточки
  const BtnLike = cardElement.querySelector('.place__like-button')

  // Кнопка удаления только под своими карточками
  if (cardOwnerId == 'a9b2e44f4010ebf34559bc45') {
    cardElement.querySelector('.place__delete-button').addEventListener('click', (event) => clickDeleteCard(event, cardId)) // слушатель на кнопку удаления карточки
  } else {
    const BtnDelete = cardElement.querySelector('.place__delete-button')
    BtnDelete.remove()
  }

  cardElement.querySelector('.place__like-counter').textContent = cardLikeCounter;
  cardElement.querySelector('.place__name').textContent = cardNameValue; //подставляем название места из инпута
  cardElementPhoto.src = cardSrcValue; // подставляем ссылку из инпута
  cardElementPhoto.alt = cardNameValue // альтернативный текст если на загрузится
  cardElementPhoto.addEventListener('click', function () { clickLargeImage(cardSrcValue, cardNameValue) }) // слушатель на картинку для открытия попапа - передаем ему 2 аргумента

  BtnLike.addEventListener('click', (event) => clickLikeCard(event, cardId, cardLikeCounter)) // Слушатель на кнопку лайк
  likes.forEach(element => {
    if (element._id == 'a9b2e44f4010ebf34559bc45') {
      BtnLike.classList.add('place__like-button_active')
    }
  });

  return cardElement
}

// отображение новых карточек в DOM
function renderCard(card) {
  cardsContainer.prepend(card); // вставляем наш контейнер с названием и ссылкой в начало блока карточек
}

// Функция коллбэк для слушателя на кнопке удалить.
function clickDeleteCard(event, cardId) {
  deleteCard(cardId)
  event.target.closest('.place').remove() // Отлеживаем на какой элемент кликнули, выбираем ближайший с классом Place и удаляем его
}

// Кнопка лайк.
function clickLikeCard(event, cardId) {

  if (event.target.classList.contains('place__like-button_active')) {
    console.log('было активно, можем снять')
    deleteLikeCard(event, cardId)
  } else {
    likeCard(event, cardId)
  }
  //console.log(event.target)
  //console.log(cardLikeCounter)
  event.target.classList.toggle('place__like-button_active') // Переключаем наличие/отсутствие класса активной кнопки
}

function updateLikeCounter(event, res) {
  event.target.nextElementSibling.textContent = `${res.likes.length}`
}
