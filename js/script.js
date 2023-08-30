'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const inputType = document.querySelector('.rollback input[type=range]');
const span = document.querySelector('.rollback span[class=range-value]');
const totalInput1 = document.getElementsByClassName('total-input')[0];
const totalInput2 = document.getElementsByClassName('total-input')[1];
const totalInput3 = document.getElementsByClassName('total-input')[2];
const totalInput4 = document.getElementsByClassName('total-input')[3];
const totalInput5 = document.getElementsByClassName('total-input')[4];

let screenHtml = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    rollback: 25,
    allServicePrices: 0,
    fullPrice: 0,
    servicePresentPrice: 0,
    start: function() {
       appData.asking();
       appData.addPrice();
       appData.getFullPrice();
       appData.getServicePercentPrices();
       appData.getTitle();

       appData.logger();
   },
    isNumber: function(num) {
       return !isNaN(parseFloat(num)) && isFinite(num);
   },
    asking: function() {
       appData.title = prompt("Как называется ваш проект?");

       while (!isNaN(appData.title) || appData.title === "" || appData.title === null) {
           appData.title = prompt("Как называется ваш проект?");
       }

       for (let i = 0; i < 2; i++) {
           let name = prompt("Какие типы экранов нужно разработать?");
           let money = 0;

           while (!isNaN(name) || name.trim() === "" || name === null) {
               name = prompt("Какие типы экранов нужно разработать?");
           }

           do {
               money = prompt("Сколько будет стоить данная работа?");            
           } while (!appData.isNumber(money));

               appData.screens.push({ id: i, name: name, money: money });
             
       }

       for (let i = 0; i < 2; i++) {
           let name = prompt("Какой дополнительный тип услуги нужен?");
           let money = 0;

           while (!isNaN(name) || name.trim() === "" || name === null) {
               name = prompt("Какой дополнительный тип услуг нужен?");
           }            
    
           do {
               money = prompt("Сколько это будет стоить?");
           } while (!appData.isNumber(money));
   
           appData.services[name] = +money;      
       }
   
       appData.adaptive = confirm("Нужен ли адаптив на сайте?");
   },
   addPrice: function() {
       for (let screen of appData.screens) {
           appData.screenPrice += +screen.money;
       }

       //  for (let i = 0; i < 2; i++) {          
           
       //     appData.screens.reduce(function(sum, item) {
       //         appData.screenPrice += +item.money;   
       //         return sum + item.money;
       //         }, 0);            
       //  }

       for (let key in appData.services) {
           appData.allServicePrices += appData.services[key];
       }
   },
   getTitle: function() {       
       appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();   
   },
   getFullPrice: function() {
       appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
   },
   getServicePercentPrices: function() {
       appData.servicePresentPrice = Math.ceil(appData.fullPrice - ((appData.rollback / 100) * appData.fullPrice));
   },
   getRollbackMessage: function(price) {
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
   },
   logger: function() {
  
       console.log(appData.fullPrice);
       console.log(appData.servicePresentPrice);
       console.log(appData.screens);
   //     console.log(appData.screenPrice);
    }
   
}

appData.start();

console.log(title);
console.log(startBtn);
console.log(resetBtn);
console.log(plus);
console.log(percent);
console.log(number);
console.log(inputType);
console.log(span);
console.log(totalInput1);
console.log(totalInput2);
console.log(totalInput3);
console.log(totalInput4);
console.log(totalInput5);
console.log(screenHtml);