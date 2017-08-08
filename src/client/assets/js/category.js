$(document).ready(function () {
  $("#dialog-add-new").dialog({
    autoOpen: false,
    modal: true,
    height: 420,
    width: 1100,
    position: {
      my: "center",
      at: "center",
      of: window
    }
  });

  $("#dialog-conform").dialog({
    autoOpen: false,
    modal: true,
    height: 150,
    width: 400,
    position: {
      my: "center",
      at: "center",
      of: window
    }
  });

  $("#add-new-category").on('click', function () {
    $('#dialog-add-new').dialog('open');
  });

  $(".remove-category").on('click', function () {
    console.log('blabla');
    $("#dialog-conform").dialog('open');
  });
});
