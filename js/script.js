'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input[type=range]');
const inputRangeValue = document.querySelector('.rollback span[class=range-value]');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 25,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePresentPrice: 0,
    countScreens: 0,
    init: function() {
        appData.addTitle();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.addRollback);
    },
    addTitle: function() {
        document.title = title.textContent;
    },
    start: function() {
        appData.addScreens();
        appData.addServices();
        appData.addPrice();
        appData.addRollback();
        if (appData.block() === 0) {
            startBtn.disablet = true;
        } else {
            startBtn.disablet = false;
            appData.screens.splice(0, appData.screens.length);
        }
        appData.showResult();
   },
   showResult: function() {
    total.value = appData.screenPrice;
    totalCount.value = appData.countScreens;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePresentPrice;
   },
   addScreens: function() {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({ 
                id: index, 
                name: selectName, 
                money: +select.value * +input.value,
                count: +input.value
            });
        });
   },
   addServices: function() {
    otherItemsPercent.forEach(function(item) {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        if (check.checked) {
            appData.servicesPercent[label.textContent] = +input.value;
        }
    });

    otherItemsNumber.forEach(function(item) {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        if (check.checked) {
            appData.servicesNumber[label.textContent] = +input.value;
        }
    });
   },
   addScreenBlock: function() {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen); 
   },
   addPrice: function() {
    if (appData.block() === 0) {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.money;
            appData.countScreens += +screen.count;
        }
    
 
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
    
        for (let key in appData.servicesPercent) {
        appData.servicePricesPercent += (appData.servicesPercent[key] / 100) * appData.screenPrice;
        }
 
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
 
        appData.servicePresentPrice = Math.ceil(appData.fullPrice - ((appData.rollback / 100) * appData.fullPrice));
    }
       
   },
    addRollback: function() {
    inputRangeValue.textContent = inputRange.value + '%';
    appData.rollback = +inputRange.value;
    totalCountRollback.value = appData.servicePresentPrice;
    },
    block: function() {
        let count = 0;
        for (let i = 0; i < appData.screens.length; i++) {
            if (appData.screens[i].name === 'Тип экранов' ||appData.screens[i].money === 0) {
                count++;
            }
        }
        if (count !== 0) {
            startBtn.disablet = true;
        }
        return count;
    }
}

appData.init();