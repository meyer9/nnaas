var Synaptic = require("synaptic");
function createNetwork(input, hidden, output, numHidden)
{
	// create the layers
	var hiddenLayers = [];
	var inputLayer = new Synaptic.Layer(input);
	for(var index = 0; index < numHidden; index++){
		hiddenLayers.push(new Synaptic.Layer(hidden));
	}
    var outputLayer = new Synaptic.Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayers[0]);
    if(numHidden == 1){
    	hiddenLayers[0].project(outputLayer);
    }else if(numHidden == 2){
    	hiddenLayers[0].project(hiddenLayers[1]);
    	hiddenLayers[1].project(outputLayer);
    }else{
    	for(var index = 1; index < numHidden - 1; index++) {
    		console.log(hiddenLayers[index],hiddenLayers[index+1]);
			hiddenLayers[index].project(hiddenLayers[index+1]);
		}
   		hiddenLayers[numHidden - 1].project(outputLayer);
    }
    
	// function train(){
// 		var trainers = [];
// 		for(var index = 0; index < numHidden; index++){
// 		// check this method
// 			trainers.push(new Synaptic.Trainer(hiddenLayers[index]));
// 			//console.log(trainers[index].XOR());
// 		}
// 	}
// 	new train();
    // set the layers
    return new Synaptic.Network({
    	input: inputLayer,
    	hidden: hiddenLayers,
    	output: outputLayer
    });
}

var numHidden = 2;
var myNetwork = createNetwork(2,10,1,numHidden);

var myTrainer = new Synaptic.Trainer(myNetwork);
 
 console.log(myTrainer.XOR({
 	iterations: 300000,
 	log: true,
 	shuffle: true,
 	cost: Synaptic.Trainer.cost.MSE
 })); // { error: 0.004998819355993572, iterations: 21871, time: 356 }
 
console.log(myNetwork.activate([0,0])); // 0.0268581547421616
myNetwork.activate([1,0]); // 0.9829673642853368
myNetwork.activate([0,1]); // 0.9831714267395621
myNetwork.activate([1,1]); // 0.02128894618097928
//usrname GeKoh