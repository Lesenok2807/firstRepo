const title = "Название проекта";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 1000;
let rollback = 88;
const fullPrice = 125000;
const adaptive = true;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов = " + screenPrice + " рублей");
console.log("Стоимость разработки сайта = " + fullPrice + " рублей");
console.log(screens.toLocaleLowerCase().split(", "));
console.log(fullPrice * (rollback/100));