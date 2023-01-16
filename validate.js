const profile = document.querySelector('form')
const formError = document.querySelector(`.${nameInput.id}-error`); // выбираем элемент самой высвечиваемой ошибки

// Функция получает форму и инпут-элемент, проверяет его на валидность
function isValid(formElement, inputElement) {
  //console.log(evt.target.validity)
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity("")
  }


  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

// Стилизация невалидного поля
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // выбираем span ошибки для своего инпута
  inputElement.classList.add('popup__text-input_type_error'); // подсвечивает сам инпут
  errorElement.classList.add('popup__input-error_active'); // сообщение ошибки
  errorElement.textContent = errorMessage; // текст ошибки

}

// Снятие стилей невалидного поля
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__text-input_type_error'); // убираем подсветку с инпута
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

// Блокировка кнопки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
    buttonElement.disabled = false;
  }
}

// Вешаем обработчик события на все инпуты внутри формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-input'))
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    })
  })
}

// Выбираем все формы
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__input-container'))

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

enableValidation()
