//Атрибуты и их методы
// Управелние атрибутами вызовом специальных методов;

let link = document.querySelector('.link'); // получаем по классу объект и сохраняем в переменной

let resultOfLink = link.hasAttribute('href'); //Проверяем, есть ли у тега атрибут:
console.log(resultOfLink);

link.setAttribute('href', 'https://www.tinkoff.ru/') //Задаём значение атрибута
let checkAttributeHref = link.getAttribute('href'); //Получаем значение атрибута
console.log(checkAttributeHref)

//Метод removeAttribute удаляет атрибут у элемента:


// 2 Манипуляции с классами CSS

// 2.1 Получение имени класса. Свойство className

let rank = document.querySelector('.princess'); // выбираем элемент c классом 'princess'
console.log(rank.className); //

rank.className = 'queen' // принцесса стала королевой, перезаписываем класс на 'queen'
console.log(rank.className)

// 2.2 Получение списка классов. Свойство classList

let garage = document.querySelector('.bentley')
console.log(`Гараж ее величества: ${garage.classList}`)

// 2.2.1 Проверка наличия класса. Метод contains

let jaguarCheck = garage.classList.contains('jaguar');
let rollsRouyceCheck = garage.classList.contains('rolls-royce');
garage.classList.contains('bentley');

console.log(rollsRouyceCheck);
console.log(jaguarCheck);

// 2.2.2 Присвоение класса элементу. Метод add

garage.classList.add('jaguar')  // в королевский гараж поступил Ягуар
console.log(`${garage.classList.contains('jaguar')}`);
console.log(`Гараж ее Величества: ${garage.classList}`)

// 2.2.3 Удаление класса. Метод remove
garage.classList.remove('jaguar')
console.log(`Гараж ее Величества: ${garage.classList}`)

// 2.2.4 Переключение класса. Метод toggle
garage.classList.toggle('jaguar');
console.log(`Гараж ее Величества: ${garage.classList}`)

// 3 Управление содержимым: свойства .innerHTML и .textContent

let innerHTML = document.body.innerHTML;
console.log(innerHTML);

// document.body.innerHTML = '<div>Добавим разметку</div>'; // Теперь на странице есть только один div. Если бы перед этим в документе была какая-либо разметка, она была бы заменена этим одним div.

let paragraph = document.getElementById('paragraph')
console.log(paragraph.textContent);

paragraph.textContent = 'А это новый текст.'
console.log(paragraph.textContent);

// Другой способ заменить текстовое содержимое. Свойство innerText
paragraph.innerText = 'новый текст взамен только видимого'
console.log(paragraph.textContent);

let songsContainer = document.querySelector('.songs-container')

songsContainer.innerHTML = `<div> Lebron </div>`

// Реакция на действия пользователя. События

let button = document.querySelector('.button')

button.addEventListener('click', showClick);

function showClick() {
  console.log('Click')
}


// 4 Гибкая вставка: методы insertAdjacentHTML и insertAdjacentText
//Они добавляют разметку и текст в документ и не затрагивают существующие элементы.


let elephant = document.querySelector('.elephant')
elephant.name = 'Дамбо'
console.log(elephant.name)

//После такой вставки слон Дамбо останется Дамбо:

let zoo = document.querySelector('.zoo');
zoo.insertAdjacentHTML('beforeend', '<div class="Tiger"></div>');
console.log(elephant.name)

// Узнать свойства элемента - какой тип данных хранится в свойстве value
let input = document.querySelector('.input__text_type_artist');
console.log(typeof (input.value))


// let и const против var

// const - запрещает перезаписывать, использовать для массивов
// let - разрешает перезапись, исползовать для счетчиков и тд

const championOfTheWorld = 'Франция';
let olympicChampion;

olympicChampion = 'Великобритания';

// попробуем изменить константу
championOfTheWorld = 'Хорватия';
console.log(championOfTheWorld)



// Поиск по строке. Метод indexOf

'эспрессо'.indexOf('c'); // 1

// Поиск по строке. Метод includes
'Гарри Поттер и узник Азкабана'.includes('Гарри Поттер'); // true

//Поиск в начале и конце строки. Методы startsWith и endsWith
'Вендетта'.startsWith('В'); // true
'Родина'.startsWith('Картинка в букваре'); // false
const theRealEnd = 'Это ещё не конец';
theRealEnd.endsWith('конец'); // true


// Методы преобразования строк
//Методы toLowerCase и toUpperCase
'Включите Caps Lock'.toLowerCase(); // "включите caps lock"
'Выключите Caps Lock'.toUpperCase(); // "ВЫКЛЮЧИТЕ CAPS LOCK"

// Превращение строки в массив. Метод split
'Пришёл. Увидел. Победил.'.split(' '); // ["Пришёл.", "Увидел.", "Победил."]
'Пришёл. Увидел. Победил.'.split('. '); // ["Пришёл", "Увидел", "Победил."]

//Извлечение части строки. Метод slice
'Не прислоняться'.slice(6, 10); // "слон"


//Методы для работы с числами

//Работа с дробной частью. Функция parseInt
let age = '37 лет, 8 месяцев и 10 дней';
console.log(parseInt(age)); // 37

//Функция parseFloat
parseFloat('36.6'); // 36.6
parseFloat('36.6 нормальная температура человека '); // 36.6

//Проверка на принадлежность к целым числам. Метод Number.isInteger
const eightAndAHalf = 8.5;

Number.isInteger(eightAndAHalf); // false
Number.isInteger(Math.floor(eightAndAHalf)); // true
