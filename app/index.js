// app/index.js
const _ = require("lodash");
const calc = require("./calc");

const numbersToAdd = [
    3,
    4,
    10,
    2
];

const result = calc.sum(numbersToAdd)
console.log(`The result is: ${result}`);
_.each(numbersToAdd, function(number){console.log(number);});
