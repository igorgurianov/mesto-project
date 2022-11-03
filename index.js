// Открыть окно редактирования профиля

let profileEditButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')

profileEditButton.addEventListener('click',popupOpened);

function popupOpened () {
  popup.classList.add('popup_opened')
}

// Закрыть окно редактирования профиля
let popupCloseButton = document.querySelector('.popup__close-button');

popupCloseButton.addEventListener('click',popupClosed)

function popupClosed () {
  popup.classList.remove('popup_opened')
}

// Кнопка сохранить

let formElement = document.querySelector('form')
let nameInput = formElement.querySelector('.popup__text-input_type_name')
let jobInput = formElement.querySelector('.popup__text-input_type_description')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__description')

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`
  profileJob.textContent = `${jobInput.value}`
  popupClosed ()
}

formElement.addEventListener('submit', handleFormSubmit);

console.log
