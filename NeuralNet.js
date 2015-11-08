Synaptic = require("synaptic");
function Perceptron(input, hidden, output)
{
    // create the layers
    var inputLayer = new Synaptic.Layer(input);
    var hiddenLayer = new Synaptic.Layer(hidden);
    var outputLayer = new Synaptic.Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}
Perceptron.prototype = new Synaptic.Network();
Perceptron.prototype.constructor = Perceptron;



var myPerceptron = new Synaptic.Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);

myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

console.log(myPerceptron.activate([0,0])); // 0.0268581547421616
myPerceptron.activate([1,0]); // 0.9829673642853368
myPerceptron.activate([0,1]); // 0.9831714267395621
myPerceptron.activate([1,1]); // 0.02128894618097928

function network()
{
	while()
	{
	
	
	}


}