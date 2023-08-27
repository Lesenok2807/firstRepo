'use strict';


const appData = {
     title: '',
     screens: '',
     screenPrice: 0,
     adaptive: true,
     service1: '',
     service2: '',
     rollback: 25,
     allServicePrices: 0,
     fullPrice: 0,
     servicePresentPrice: 0,
     isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
     asking: function() {
        appData.title = prompt("Как называется ваш проект?", "калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
    
        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");            
        } while (!appData.isNumber(appData.screenPrice));
    
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    getTitle: function() {       
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();   
    },
    getAllServicePrices: function() {
            let sum = 0;
            
            for (let i = 0; i < 2; i++) {
                let money = 0;
        
                if (i === 0) {
                    appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
                } else if (i === 1) {
                    appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
                }
        
                do {
                    money = prompt("Сколько это будет стоить?");
                } while (!appData.isNumber(money));
        
                sum += +money;         
            }
        
            return sum;
    },
    getFullPrice: function() {
            return +appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrices: function() {
            return Math.ceil(appData.fullPrice - ((appData.rollback / 100) * appData.fullPrice));
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
        
        for (let key in appData) {
            console.log('key: ', key);
        }

        console.log(appData.fullPrice);
        console.log(appData.servicePresentPrice);
    },
    start: function() {
        appData.asking();
        appData.title = appData.getTitle();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePresentPrice = appData.getServicePercentPrices();
        appData.logger();
    }
}

appData.start();