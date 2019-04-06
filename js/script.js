//alert("index.html is linked to script.js");

//event handler for when the page loads
$(document).ready(() => {
  //set focus on the first text field when the page loads
  $('#name').focus();
  //hide the "Other" job role input initially
  $('#other-title').hide();
});

//value="js puns" colors: cornflowerblue, darkslategrey, gold
//value="heart js" colors: tomato, steelblue, dimgrey
//'change' event handler on the design menu to change the colors displayed in
//the color menu to match the selected design
$('#design').on('change', (e) => {
  //if selected design is js puns
  if($('#design').val() === 'js puns') {
    //hide the colors tomato, steelblue and dimgrey
    $('#color option').each(function() {
      if($(this).val() === 'tomato' || $(this).val() === 'steelblue' ||
        $(this).val() === 'dimgrey') {
          $(this).hide();
      } else {
        //show the colors cornflowerblue, darkslategrey and gold
        $(this).show();
        //set placeholder for color menu to cornflowerblue
        $('option[value="cornflowerblue"]').attr('selected', true);
        //remove 'selected' attribute from tomato option if it has it
        //code was inspired by ideas from Chris Coyier at:
        //https://css-tricks.com/snippets/jquery/make-an-jquery-hasattr/
        if(typeof $('option[value="tomato"]').attr('selected') !==
          typeof undefined &&
          $('option[value="tomato"]').attr('selected') !== false) {
            $('option[value="tomato"]').removeAttr('selected');
        }
      }
    });
  } else if($('#design').val() === 'heart js') {
    //hide the colors cornflowerblue, darkslategrey and gold
    $('#color option').each(function() {
      if($(this).val() === 'cornflowerblue' ||
        $(this).val() === 'darkslategrey' || $(this).val() === 'gold') {
          $(this).hide();
      } else {
        //show the colors tomato, steelblue and dimgrey
        $(this).show();
        //set placeholder for color menu to tomato
        $('option[value="tomato"]').attr('selected', true);
        //remove 'selected' attribute from cornflowerblue option if it has it
        //code was inspired by ideas from Chris Coyier at:
        //https://css-tricks.com/snippets/jquery/make-an-jquery-hasattr/
        if(typeof $('option[value="cornflowerblue"]').attr('selected') !==
          typeof undefined &&
          $('option[value="cornflowerblue"]').attr('selected') !== false) {
            $('option[value="cornflowerblue"]').removeAttr('selected');
        }
      }
    });
  } else {
    //if the user selects 'Select Theme' then reset the color menu
    $('#color option').each(function() {
      $(this).show();
    });
  }
});
