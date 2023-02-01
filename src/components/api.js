import { renderUserInfo, renderLoading } from './index.js'
import { createCard, renderCard, updateLikeCounter } from './card.js'
export { addNewCard, deleteCard, likeCard, deleteLikeCard, editAvatar }

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42',
    'Content-Type': 'application/json'
  }
}

// GET запрос данных о пользователе
export function getUser() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
    .then((result) => {
      renderUserInfo(result)
    })
    .catch(err => console.log(`Ошибка при получении данных пользователя: ${err.status}`));
}

// PATCH изменение данных пользователя

export function editProfileInfo(userName, userJob, evt) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${userName}`,
      about: `${userJob}`
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
    .then((res) => {
      renderUserInfo(res, evt)
    })
    .catch((res) => {
      console.log(`Ошибка при обновлении информации о пользователе: ${res.status}`)
    })
    .finally(() => {
      renderLoading(evt, false)
    })
}

// GET запрос карточек
export function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
    .then((cards) => {
      //console.log(cards);
      cards.forEach(card => {
        renderCard(createCard(card.name, card.link, card.likes.length, card.owner._id, card._id, card.likes))
      });
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке карточек: ${err.status}`)
    });
}

// POST Добавление новой карточки
function addNewCard(cardName, cardLink, form) {
  fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
    method: 'POST',
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject()
      }
    })
    .then((res) => {
      renderCard(createCard(res.name, res.link, res.likes.length, res.owner._id, res._id, res.likes))
    })
    .catch(res => console.log(`Ошибка при добавлении новой карточки: ${res.status}`))
    .finally(() => {
      renderLoading(form, false)
    })
}

function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42'
    }
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка при удалении карточки: ${res.status}`)
      }
    })
}

// Поставить лайк
function likeCard(event, cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()

      } else Promise.reject(res)
    })
    .then((res) => {
      updateLikeCounter(event, res)
    })
}

// Удалить лайк карточки

function deleteLikeCard(event, cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42'
    }
  })
    .then(res => res.json())
    .then((res) => {
      updateLikeCounter(event, res)
    })
}

// Обновление аватара
function editAvatar(avatarLink, form) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'a2c97fba-80a7-48e7-83f6-eccca0540f42',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${avatarLink}`
    }
    )
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      renderUserInfo(res)
    })
    //.catch(() => console.log('Ошибка при обновлении аватара'))
    .finally(() => {
      renderLoading(form, false)
    })
}
