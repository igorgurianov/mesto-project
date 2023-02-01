// импорт стилей для вебпака
import '../pages/index.css'

// Импорт модулей
import { createCard, renderCard } from './card.js';
import { closePopup, openPopup } from './modal.js';
import { enableValidation } from './validate.js';
import { check, getCards, getUser, editProfileInfo, addNewCard, editAvatar } from './api.js'
export { clickLargeImage, renderUserInfo, renderLoading }

// Закрытие попапов по оверлею
const popupList = document.querySelectorAll('.popup') // выбираем все попапы

// Все крестики - кнопки закрытия
const btnClosePopupList = document.querySelectorAll('.popup__close-button')

//Кнопки открытия попапа
// - редактирования профиля
const btnOpenEditProfile = document.querySelector('.profile__edit-button')

// - добавления карточек
const btnOpenNewCardPopup = document.querySelector('.profile__add-button')

// - добавления карточек
const btnOpenAvatarPopup = document.querySelector('.profile__avatar-button')

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
const formEditProfile = document.querySelector('.popup__input-container_type_profile')
const nameInput = formEditProfile.querySelector('.popup__text-input_type_name')
const jobInput = formEditProfile.querySelector('.popup__text-input_type_description')
const profileAvatar = document.querySelector('.profile__avatar');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = document.querySelector('.popup__input-container_type_avatar') // форма изменения аватара
const avatarInput = formEditAvatar.querySelector('.popup__text-input_type_avatar') // инпут аватара

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

// ФУНКЦИИ
// Отрисовка состояния загрузки
function renderLoading(evt, isLoading) {
  const btn = evt.target.querySelector('.popup__submit')
  if (isLoading) {
    btn.textContent = 'Сохранение...'
  } else {
    btn.textContent = 'Создать'
  }
}

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
  renderLoading(evt, true)
  addNewCard(cardName.value, cardSrc.value, evt)
  closePopup(popupNewCard);
  formAddCard.reset();
  evt.submitter.classList.add('popup__submit_inactive');
  evt.submitter.disabled = true;
}

// Кнопка сохранить - информация о пользователе
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, true)
  editProfileInfo(`${nameInput.value}`, `${jobInput.value}`, evt)
  closePopup(popupEditProfile);
  evt.submitter.classList.add('popup__submit_inactive');
  evt.submitter.disabled = true;
}

// Отрисовка информации о пользователе
function renderUserInfo(userInfo) {
  profileAvatar.src = userInfo.avatar;
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
}

getUser()

// СЛУШАТЕЛИ НА САБМИТ ФОРМ

//__Слушатель - аватар
formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(evt, true)
  editAvatar(avatarInput.value, evt)
  closePopup(popupEditAvatar)
  formEditAvatar.reset();
  evt.submitter.classList.add('popup__submit_inactive');
  evt.submitter.disabled = true;
})

//__Слушатель -  добавление карточек
formAddCard.addEventListener('submit', handleCardFormSubmit)

//__Слушатель - редактирование профиля
formEditProfile.addEventListener('submit', handleFormSubmit);


// СЛУШАТЕЛИ НА ПОПАПЫ
//__ Слушатель - аватар
btnOpenAvatarPopup.addEventListener('click', () => {
  openPopup(popupEditAvatar)
})

//__ Слушатель - попап редактирования профиля
btnOpenEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
});

//__Слушатель - открыть попап добавления карточек
btnOpenNewCardPopup.addEventListener('click', function () {
  openPopup(popupNewCard)
})

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


