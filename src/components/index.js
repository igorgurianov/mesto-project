import '../pages/index.css'

// Попапы
const popup = document.querySelectorAll('.popup') // выбираем первый попап

// Попап добавления карточек
const addCardButton = document.querySelector('.profile__add-button') // выбираем в ДОМ кнопку открытия попапа
const addCardPopupContainer = addCardPopup.querySelector('.popup__container') // выбираем контейнер в попапе с новыми карточками
const closeBttnAddCardPopup = addCardPopupContainer.querySelector('.popup__close-button') // выбираем кнопку в контейнере в попапе с новыми карточками

// Поиск всех крестиков (кнопок закрытия)
const closeButtons = document.querySelectorAll('.popup__close-button')

// Секция карточек (для лайков через всплытие)
const cardsSection = document.querySelector('.cards-grid')

// Импорт модулей
import { initialCards, createCard, openPopup, clickLikeCard, renderCard } from './card.js';
import { closeOnEsc, closePopup, handleCardFormSubmit, addCardForm, addCardPopup, handleFormSubmit, formElement, jobInput, nameInput, profileName, profileJob, profileEditButton, popupCloseButton, editProfilePopup } from './modal.js';
import { validation } from './validate.js';

validation()

cardsSection.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('place__like-button')) {
    clickLikeCard(evt);
  }
})

// Рендер первых карточек
initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link))
})

//  Слушатель на попап редактирования профиля
profileEditButton.addEventListener('click', function () {
  openPopup(editProfilePopup)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
});

// Слушатель на сабмит формы редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);

// Слушатель на открытие попапа добавления карточек
addCardButton.addEventListener('click', function () {
  openPopup(addCardPopup)
})

// Слушатель на сабмит формы добавления карточек
addCardForm.addEventListener('submit', handleCardFormSubmit) // сабмит слушатель на саму форму

// Закрытие всех попапов
//   Слушатель закрытия попапа по клику на крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup)
  })
})

//   Закрытие по клику на оверлей
popup.forEach((item) => {
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target)
    }
  })
})



