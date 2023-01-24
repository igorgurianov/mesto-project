import { renderCard, createCard } from "./card.js";
export { closeOnEsc, closePopup, handleCardFormSubmit, addCardForm, addCardPopup, handleFormSubmit, formElement, nameInput, jobInput, profileName, profileJob, profileEditButton, popupCloseButton, editProfilePopup }

// Кнопка добавить место
const addCardForm = document.querySelector('.popup__input-container_type_add'); // выбираем форму контейнера
const cardName = document.querySelector('.popup__text-input_type_card-name'); // выбираем инпут для названия карточки
const cardSrc = document.querySelector('.popup__text-input_type_link') // выбираем инпут для линка картинки
const addCardPopup = document.querySelector('.popup_type_add_card') // выбираем куда будем добавлять класс opened

// Добавление новых карточек
const formElement = document.querySelector('form', '.popup__input-container_type_profile')

// Редактирования профиля
const nameInput = formElement.querySelector('.popup__text-input_type_name')
const jobInput = formElement.querySelector('.popup__text-input_type_description')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')

// Попап редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupCloseButton = document.querySelector('.popup__close-button');

// Кнопка "Создать" - добавить место
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(createCard(cardName.value, cardSrc.value));
  closePopup(addCardPopup);
  addCardForm.reset()
}

// Кнопка сохранить
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`
  profileJob.textContent = `${jobInput.value}`
  closePopup(editProfilePopup)
}

//   Закрытие по кнопке ESC
function closeOnEsc(evt) {
  const currentPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(currentPopup)
  }
}

//   Удаляем слушатель на закрытие попапов по кнопке ESC
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc)
}
