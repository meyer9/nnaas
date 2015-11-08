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
  }
});
