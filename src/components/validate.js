export { validation }

// включение валидации вызовом enableValidation все настройки передаются при вызове
const enableValidation = ({
  formSelector: '.popup__input-container', // + поиск форм
  inputSelector: '.popup__text-input', // + text input
  submitButtonSelector: '.popup__submit', // + btn
  inactiveButtonClass: 'popup__submit_inactive', //+
  inputErrorClass: 'popup__text-input_type_error', //+
  errorClass: 'popup__input-error_active' //+
});

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
  inputElement.classList.add(`${enableValidation.inputErrorClass}`); // подсвечивает сам инпут
  errorElement.classList.add(`${enableValidation.errorClass}`); // сообщение ошибки
  errorElement.textContent = errorMessage; // текст ошибки
}

// Снятие стилей невалидного поля
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(`${enableValidation.inputErrorClass}`); // убираем подсветку с инпута
  errorElement.classList.remove(`${enableValidation.errorClass}`);
  errorElement.textContent = '';
}

// Блокировка кнопки //
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${enableValidation.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${enableValidation.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
}

// Вешаем обработчик события на все инпуты внутри формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`${enableValidation.inputSelector}`))
  const buttonElement = formElement.querySelector(`${enableValidation.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    })
  })
}

// Выбираем все формы
function validation() {
  const formList = Array.from(document.querySelectorAll(`${enableValidation.formSelector}`))
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

