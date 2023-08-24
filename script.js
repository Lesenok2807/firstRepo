'use strict';

let title;
let screens;
let screenPrice;
let adaptive;

let service1;
let service2;
let rollback = 25;
let allServicePrices;
let fullPrice;
let servicePresentPrice;

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
    title = prompt("Как называется ваш проект?", "калькулятор Верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");            
    } while (!isNumber(screenPrice));

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

function getTitle() {
    let newTitle = title.trim(); 
    return newTitle[0].toUpperCase() + newTitle.slice(1).toLowerCase();   
};

const getAllServicePrices = function() {
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {
        let money = 0;

        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        }

        do {
            money = prompt("Сколько это будет стоить?");
        } while (!isNumber(money));

        sum += +money;         
    }

    return sum;
};

function getFullPrice() {
    return +screenPrice + allServicePrices;
}

function getServicePercentPrices() {
    return Math.ceil(fullPrice - ((rollback / 100) * fullPrice));
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

asking();
title = getTitle();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePresentPrice = getServicePercentPrices();



showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(getTitle());
console.log(getServicePercentPrices());
console.log(screens.toLowerCase().split(", "));