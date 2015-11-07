Synaptic = require("synaptic");

var perceptron = new Synaptic.Architect.Perceptron(2,3,1);
console.log(perceptron.trainer.XOR()); 

console.log(Math.floor(parseFloat(perceptron.activate([1,0]))+0.5));