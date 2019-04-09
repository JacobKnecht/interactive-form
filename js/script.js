//alert("index.html is linked to script.js");
//global variable declarations
let total_cost = 0;

//event handler for when the page loads
$(document).ready(() => {
  //set focus on the first text field when the page loads
  $('#name').focus();
  //hide the "Other" job role input initially
  $('#other-title').hide();
  //hide the information for "PayPal" and "Bitcoin" payment methods
  $('#credit-card ~ div').each(function() {
    $(this).hide();
  });
  //disable the "Select Payment Method" in the payment method select element
  $('option[value="select_method"]').attr('disabled', true);
});

//"Job Role" section:
//show the "Other" text input when user selects "other" job role
$('#title').on('change', function(e) {
  if($(e.target).val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//"T-Shirts info" Section
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

//"Register for Activites" section
/*
  Shared Times:
  Tuesday 9am-12pm: JavaScript Frameworks Workshop, Express Workshop
  Tuesday 1pm-4pm: JavaScript Libraries Workshop, Node.js Workshop
  Wednesday 9am-12pm: Build Tools Workshop
  Wednesday 1pm-4pm: npm Workshop
*/
//select the 'activities' fieldset inputs
$('.activities input').on('change', function() {
  //variable declarations
  const regex = /\d{3}/;
  const label_text = $(this).closest('label').text();
  const cost = label_text.match(regex);
  //if change causes check
  if($(this).is(':checked')) {
    //check for conflicting times, if necessary disable checkboxes
    //and mark out the text, add the price to the running total
    if($(this).attr('name') === 'js-frameworks') {
      $('input[name="express"]').attr('disabled', true)
        .closest('label').css('textDecoration', 'line-through');
    } else if($(this).attr('name') === 'express') {
      $('input[name="js-frameworks"]').attr('disabled', true)
        .closest('label').css('textDecoration', 'line-through');
    } else if($(this).attr('name') === 'js-libs') {
      $('input[name="node"]').attr('disabled', true)
        .closest('label').css('textDecoration', 'line-through');
    } else if($(this).attr('name') === 'node') {
      $('input[name="js-libs"]').attr('disabled', true)
        .closest('label').css('textDecoration', 'line-through');
    }
    total_cost += parseInt(cost[0]);
  } else { //if change causes uncheck
    //check for conflicting times, if necessary enable checkboxes and turn
    //text color back to black
    if($(this).attr('name') === 'js-frameworks') {
      $('input[name="express"]').removeAttr('disabled')
        .closest('label').css('textDecoration', 'none');
    } else if($(this).attr('name') === 'express') {
      $('input[name="js-frameworks"]').removeAttr('disabled')
        .closest('label').css('textDecoration', 'none');
    } else if($(this).attr('name') === 'js-libs') {
      $('input[name="node"]').removeAttr('disabled')
        .closest('label').css('textDecoration', 'none');
    } else if($(this).attr('name') === 'node') {
      $('input[name="js-libs"]').removeAttr('disabled')
        .closest('label').css('textDecoration', 'none');
    }
    total_cost -= parseInt(cost[0]);
  }
  //generate total cost
  if(total_cost > 0) {
    $('.activities').append('<label id="total_cost"></label>');
    $('#total_cost').text(`Total: \$${total_cost}`)
  } else {
    $('#total_cost').remove();
  }
});

//"Payment Info" section:
//select the payment select element
$('#payment').on('change', function() {
  //payment_info = [credit card, PayPal, Bitcoin]
  const payment_info = $('#payment ~ div');
  //show the information that is appropriate for the selected payment method
  if($(this).val() === 'credit card') { //credit card
    $(payment_info[0]).show();
    $(payment_info[1]).hide();
    $(payment_info[2]).hide();
  } else if($(this).val() === 'paypal') { //PayPal
    $(payment_info[0]).hide();
    $(payment_info[1]).show();
    $(payment_info[2]).hide();
  } else if($(this).val() === 'bitcoin') { //Bitcoin
    $(payment_info[0]).hide();
    $(payment_info[1]).hide();
    $(payment_info[2]).show();
  }
});

//Form Validation:
//name field - can't be blank
$('#name').on('keyup', 'submit', function() {

});
//email field - must be a validly formatted email address (abc@example.com)
$('#mail').on('keyup', 'submit', function() {

});
//user must select at least one checkbox under the "Register Activities"
//section
$('#activities input').on('submit', function() {

});
//if the user selects the credit card payment method, make sure that they have
//a credit card number, zip code and CVV Number
//credit card number must only be between 13-16 digits long
//zip code must only be 5 digits long
//cvv number must only be 3 digits long
$('#payment').on('change', function() {

});
