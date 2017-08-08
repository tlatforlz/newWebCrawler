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

  $("#confirm-remove").dialog({
    autoOpen: false,
    modal: true,
    height: 200,
    width: 500,
    position: {
      my: "center",
      at: "center",
      of: window
    }

  });

  $("#add-new-category").on('click', function () {
    $('#dialog-add-new').dialog('open');
  });

  $("#remove-category").on('click', function () {
    console.log('blabla');
    $("#confirm-remove").dialog('open');
  })
});
