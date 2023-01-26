// импорт стилей для вебпака
import '../pages/index.css'

// Импорт модулей
import { createCard, renderCard } from './card.js';
import { closePopup, openPopup } from './modal.js';
import { enableValidation } from './validate.js';
export { clickLargeImage }

// Закрытие попапов по оверлею
const popupList = document.querySelectorAll('.popup') // выбираем все попапы

// Все крестики - кнопки закрытия
const btnClosePopupList = document.querySelectorAll('.popup__close-button')

//Кнопка открытия попапа редактирования профиля
const btnOpenEditProfile = document.querySelector('.profile__edit-button')

// Кнопка открытия попапа добавления карточек
const btnOpenNewCardPopup = document.querySelector('.profile__add-button')

// Форма добавления карточки
const formAddCard = document.querySelector('.popup__input-container_type_add'); // выбираем форму добавления карточки

// Инпуты новой карточки
const cardName = document.querySelector('.popup__text-input_type_card-name'); // выбираем инпут для названия карточки
const cardSrc = document.querySelector('.popup__text-input_type_link') // выбираем инпут для линка картинки
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')

// Кнопка добавить место
const popupNewCard = document.querySelector('.popup_type_add_card') // для класса popup__opened

// Редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const formEditProfile = document.querySelector('form', '.popup__input-container_type_profile')
const nameInput = formEditProfile.querySelector('.popup__text-input_type_name')
const jobInput = formEditProfile.querySelector('.popup__text-input_type_description')

// Попап с картинкой
const imagePopupForm = document.querySelector('.popup_type_image');
const popupLabel = imagePopupForm.querySelector('.popup__label');
const largeImage = document.querySelector('.popup__image');

enableValidation({
  formSelector: '.popup__input-container',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__input-error_active'
})

// Открыть попап с картинкой
function clickLargeImage(cardSrcValue, cardNameValue) {
  openPopup(imagePopupForm);
  largeImage.src = cardSrcValue;
  largeImage.alt = cardNameValue;
  popupLabel.textContent = cardNameValue
}

// Кнопка "Создать" - добавить место
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(createCard(cardName.value, cardSrc.value));
  closePopup(popupNewCard);
  formAddCard.reset();
  evt.submitter.classList.add('popup__submit_inactive');
  evt.submitter.disabled = true;
}

// Кнопка сохранить
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`
  profileJob.textContent = `${jobInput.value}`
  closePopup(popupEditProfile);

}

//  Слушатель на попап редактирования профиля
btnOpenEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
});

// Слушатель на сабмит формы редактирования профиля
formEditProfile.addEventListener('submit', handleFormSubmit);

// Слушатель на открытие попапа добавления карточек
btnOpenNewCardPopup.addEventListener('click', function () {
  openPopup(popupNewCard)
})

// Слушатель на сабмит формы добавления карточек
formAddCard.addEventListener('submit', handleCardFormSubmit) // сабмит слушатель на саму форму

// Закрытие всех попапов
//   Слушатель закрытия попапа по клику на крестик
btnClosePopupList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup)
  })
})

//   Закрытие по клику на оверлей
popupList.forEach((item) => {
  item.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target)
    }
  })
})



