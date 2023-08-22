'use strict';

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
const rollback = 25;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?", "1000");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?", "1000");
const allServicePrices = servicePrice1 + servicePrice2;
const fullPrice = screenPrice + allServicePrices;
const servicePresentPrice = Math.ceil(fullPrice - ((rollback / 100) * fullPrice));

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
}

function getTitle() {
    let newTitle = title.trim(); 
    return newTitle[0].toUpperCase() + newTitle.slice(1).toLowerCase();   
} 

const getAllServicePrices = function() {    
    return allServicePrices;
}

function getFullPrice() {
    return fullPrice;
}

function getServicePercentPrices() {
    return servicePresentPrice;
}

const getRollbackMessage = function(price) {
    switch (true) {
        case price >= 30000:
            return 'Делаем скидку 10%';
        case 15000 <= price && price < 30000:
            return 'Делаем скидку 5%';
        case 0 < price && price < 15000:
            return 'Скидка не предусмотрена';
        default:
            return 'Что-то пошло не так';
    }
}

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(getTitle());
console.log(getServicePercentPrices());
console.log(screens.toLowerCase().split(", "));