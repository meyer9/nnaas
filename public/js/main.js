$(document).ready(function() {
  if(document.location.pathname == "/networks") {
    $.get("/networks/json", function(networks) {
      networks.forEach(function(network) {
        $("#networks").append('<tr><td>' + network.name + '</td><td>' + network.apiKey + '</td><td><button type="button" class="btn btn-danger" id="delete-network" data-delete-id="' + network._id + '">Delete</button></td></tr>')
      })
      $("#delete-network").click(function() {
        $.post("/networks/delete", {networkID: $(this).data("delete-id")});
        $(this).parent().parent().remove();
      });
    });
  } else if(document.location.pathname == "/demo") {
    var key = "B1cXVdv2iOuiGNx1";

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
          contentType : 'application/json',
        	data: JSON.stringify({"apiKey": key, "trainingSet": trainingSet})
        }).done(function(data) {
          $("#time").html(data.time);
          $("#error-rate").html(data.error);
        });
      });
      $("#activate").click(function() {
        $.ajax('http://localhost:3000/networks/activate', {
          method: "POST",
          data: JSON.stringify({"inputs": [$("#input1").val(), $("#input2").val()], "apiKey": key}),
          contentType : 'application/json'
        }).done(function(data) {
          $("#output").text(data[0])
        });
      });
    });
  }
});
