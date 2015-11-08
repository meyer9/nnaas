var key = "WmWitxarWgdqtKTs";

var pixelValues     = [];
var trainingSet 	= [
  {
    "input": [0,0],
    "output": [0]
  },
  {
    "input": [1,0],
    "output": [1]
  },
  {
    "input": [0,1],
    "output": [1]
  },
  {
    "input": [1,1],
    "output": [0]
  },
];
$(function() {
  $("#train").click(function() {
    $.ajax('http://localhost:3000/networks/train', {
    	method: "POST",
    	data: {"apiKey": key, "trainingSet": trainingSet}
    }).done(function(data) {
      $("#time").html(data.time);
      $("#error-rate").html(data.error);
    });
  });
  $("#activate").click(function() {
    $.ajax('http://localhost:3000/networks/activate', {
      method: "POST",
      data: JSON.stringify({"inputs": [$("#input1").val(), $("#input2").val()], "apiKey": "WmWitxarWgdqtKTs"}),
      contentType : 'application/json'
    }).done(function(data) {
      $("#output").text(data[0])
    });
  });
});
