'use strict';

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
const rollback = 36;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?", "1000");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?", "1000");
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePresentPrice = Math.ceil(fullPrice - ((rollback / 100) * fullPrice));

console.log(fullPrice);
console.log(servicePresentPrice);

switch (true) {
    case fullPrice >= 30000:
        console.log('Делаем скидку 10%');
        break;
    case 15000 <= fullPrice && fullPrice < 30000:
        console.log('Делаем скидку 5%');
        break;
    case 0 < fullPrice && fullPrice < 15000:
        console.log('Скидка не предусмотрена');
        break;
    default:
        console.log('Что-то пошло не так');
}