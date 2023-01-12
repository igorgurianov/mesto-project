// Попапы
const popup = document.querySelectorAll('.popup') // выбираем первый попап

// Попап добавления карточек
const addCardPopup = document.querySelector('.popup_type_add_card') // выбираем куда будем добавлять класс opened
const addCardButton = document.querySelector('.profile__add-button') // выбираем в ДОМ кнопку открытия попапа
const addCardPopupContainer = addCardPopup.querySelector('.popup__container') // выбираем контейнер в попапе с новыми карточками
const closeBttnAddCardPopup = addCardPopupContainer.querySelector('.popup__close-button') // выбираем кнопку в контейнере в попапе с новыми карточками

// Попап редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupCloseButton = document.querySelector('.popup__close-button');

// Попап с картинкой
const imagePopupForm = document.querySelector('.popup_type_image');
const closeBtnImagePopup = imagePopupForm.querySelector('.popup__close-button');
const popupLabel = imagePopupForm.querySelector('.popup__label');
const largeImage = document.querySelector('.popup__image');

// Добавление новых карточек
const cardsContainer = document.querySelector('.cards-grid');
const userTemplate = document.querySelector('#card-template').content; // выбираем темплейт
const formElement = document.querySelector('form', '.popup__input-container_type_profile')

// Редактирования профиля
const nameInput = formElement.querySelector('.popup__text-input_type_name')
const jobInput = formElement.querySelector('.popup__text-input_type_description')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')

// Кнопка добавить место
const addCardForm = document.querySelector('.popup__input-container_type_add'); // выбираем форму контейнера
const cardName = document.querySelector('.popup__text-input_type_card-name'); // выбираем инпут для названия карточки
const cardSrc = document.querySelector('.popup__text-input_type_link') // выбираем инпут для линка картинки

// Поиск всех крестиков (кнопок закрытия)
const closeButtons = document.querySelectorAll('.popup__close-button')

// Секция карточек (для лайков через всплытие)
const cardsSection = document.querySelector('.cards-grid')

// создание новых карточек
function createCard(cardNameValue, cardSrcValue) {
  const cardElement = userTemplate.querySelector('.place').cloneNode(true); //клонируем див внутри него со всем содержимым
  cardElement.querySelector('.place__name').textContent = cardNameValue; //подставляем название места из инпута
  cardElement.querySelector('.place__photo').src = cardSrcValue; // подставляем ссылку из инпута
  cardElement.querySelector('.place__photo').alt = cardNameValue
  cardElement.querySelector('.place__photo').addEventListener('click', function (event) { clickLargeImage(event, cardNameValue) }) // слушатель на картинку для открытия попапа - передаем ему 2 аргумента
  //cardElement.querySelector('.place__like-button').addEventListener('click', clickLikeCard) // Слушатель на кнопку лайк
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

cardsSection.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('place__like-button')) {
    clickLikeCard(evt);
  }
})


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

initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link))
})

// Функция открытия попапа:
//Переиспользуется для открытия попапов редактирования и добавления, получая нужный аргумент
//Добавляем слушатель на закрытие попапов по кнопке ESC
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

//  Открыть попап редактирования
profileEditButton.addEventListener('click', function () {
  openPopup(editProfilePopup)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
});

// Кнопка сохранить
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`
  profileJob.textContent = `${jobInput.value}`
  closePopup(editProfilePopup)
}

formElement.addEventListener('submit', handleFormSubmit); // сабмит слушатель на саму форму

// Открыть попап добавления карточек
addCardButton.addEventListener('click', function () {
  openPopup(addCardPopup)
})

// Кнопка "Создать" - добавить место
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(createCard(cardName.value, cardSrc.value));
  closePopup(addCardPopup);
  addCardForm.reset()
}

addCardForm.addEventListener('submit', handleCardFormSubmit) // сабмит слушатель на саму форму

// Открыть попап с картинкой
function clickLargeImage(event, cardNameValue) {
  openPopup(imagePopupForm);
  largeImage.src = event.target.src;
  largeImage.alt = cardNameValue;
  popupLabel.textContent = cardNameValue
}

// Закрытие всех попапов
//   Удаляем слушатель на закрытие попапов по кнопке ESC
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc)
}

//   Закрытие по клику на крестик
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

//   Закрытие по кнопке ESC
function closeOnEsc(evt) {
  const currentPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(currentPopup)
  }
}

