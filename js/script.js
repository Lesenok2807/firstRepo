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

const checkCms = document.querySelector('div.main-controls__views.cms input[type=checkbox]');

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 10,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePresentPrice: 0,
    countScreens: 0,
    init: function() {
        this.addTitle();
        startBtn.addEventListener('click', this.start);
        buttonPlus.addEventListener('click', this.addScreenBlock);
        inputRange.addEventListener('input', this.addRollback);
        resetBtn.addEventListener('click', this.reset);
    },
    addTitle: function() {
        document.title = title.textContent;
    },
    start: function() {
        appData.addScreens();
        appData.addServices();
        appData.addPrice();
        appData.addRollback();
        appData.block();

        if (appData.block() === 0) {
            startBtn.disablet = true;
            appData.blockBtn();
        } else {
            startBtn.disablet = false;
            appData.screens.splice(0, appData.screens.length);
        }
        appData.showResult();
   },
   showResult: function() {
    total.value = this.screenPrice;
    totalCount.value = this.countScreens;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePresentPrice;
   },
   addScreens: function() {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({ 
                id: index, 
                name: selectName, 
                money: +select.value * +input.value,
                count: +input.value
            });
        });
   },
   addServices: function() {
    otherItemsPercent.forEach(item => {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        if (check.checked) {
            this.servicesPercent[label.textContent] = +input.value;
        }
    });

    otherItemsNumber.forEach(item => {
        const check = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        const input = item.querySelector('input[type=text]');

        check.disabled = false;

        if (check.checked) {
            this.servicesNumber[label.textContent] = +input.value;
        }
    });
   },
   addScreenBlock: function() {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen); 
   },
   addPrice: function() {
    if (this.block() === 0) {
        for (let screen of this.screens) {
            this.screenPrice += +screen.money;
            this.countScreens += +screen.count;
        }
    
 
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
    
        for (let key in this.servicesPercent) {
        this.servicePricesPercent += (this.servicesPercent[key] / 100) * this.screenPrice;
        }     

        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

        this.servicePresentPrice = Math.ceil(this.fullPrice - ((this.rollback / 100) * this.fullPrice));
    }
       
   },
    addRollback: function() {
        inputRange.disabled = false;
        inputRangeValue.textContent = inputRange.value + '%';
        appData.rollback = +inputRange.value;
        totalCountRollback.value = appData.servicePresentPrice;
    },
    block: function() {
        let count = 0;
        for (let i = 0; i < this.screens.length; i++) {
            if (this.screens[i].name === 'Тип экранов' ||this.screens[i].money === 0) {
                count++;
            }
        }
        if (count !== 0) {
            startBtn.disablet = true;
        }
        return count;
    },
    blockBtn: function() {
        buttonPlus.disabled = true;
        screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = true;
            input.disabled = true;
        });
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = true;
        });
        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = true;
        });
        checkCms.disabled = true;
        inputRange.disabled = true;
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    },    
    deleteScreens: function() {
        this.screens.splice(0, this.screens.length);
        for (let i = 0; i < screens.length - 1; i++) {
            screens[i].remove();
        }

        const select = document.querySelector('select');
        const input = document.querySelector('input');
        select.value = '';
        input.value = '';
    },
    deleteShowResult: function() {
        for (let key in this.servicesNumber) {
            delete this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            delete this.servicesPercent[key];
        }

        this.screenPrice = 0;
        this.rollback = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePresentPrices = 0; 
        this.countScreens = 0;
        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        fullTotalCount.value = 0;
        totalCountRollback.value = 0;
    },
    deleteServis: function() {
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });

        otherItemsNumber.forEach(item =>{
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });

        checkCms.checked = false;
    },
    deleteRollback: function() {
        inputRange.disabled = true;
        inputRange.value = 0;
        inputRangeValue.textContent = 0 + '%';
        appData.rollback = 0;
        appData.fullPrice = 0;
        totalCountRollback.value = 0;
    },
    deleteBlockBtn: function() {
        buttonPlus.disabled = false;
        screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = false;
            input.disabled = false;
        });
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = false;
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.disabled = false;
        });
        checkCms.disabled = false;
        inputRange.disabled = false;
    }, 
    reset: function() {
        appData.deleteScreens();
        appData.deleteServis();
        appData.deleteRollback();        
        appData.deleteShowResult();
        
        startBtn.style.display = 'block';
        resetBtn.style.display = 'none';
        appData.start();
        appData.deleteBlockBtn();
    }
};

appData.init();