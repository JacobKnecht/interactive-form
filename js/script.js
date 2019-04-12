//global variable declarations
let total_cost = 0;

//event handler for when the page loads
$(document).ready(() => {
  //disable automatic form validation
  $('form').attr('novalidate', true);
  //set focus on the first text field when the page loads
  $('#name').focus();
  //hide the "Other" job role input initially
  $('#other-title').hide();
  //set the default payment method to be credit card
  $('#payment').val('credit card');
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
    //delete error message if user tried to previously submit the form without
    //selecting an activity
    if($('#error-message').length) {
      $('#error-message').remove();
    }
  } else { //remove the total cost message if the user deselects all activities
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
//function to validate name field
function validateName() {
  //name field - can't be blank
  //regex pattern for non-blank text string:
  const regex = /^[A-Za-z ']+$/;
  const input = $('#name').val();
  //if the string contains the pattern, then the name field isn't blank
  if(regex.test(input)) {
    //return input to default style if the user enters the proper input
    $('#name').removeAttr('style');
    //name is valid
    return true;
  } else { //otherwise, the name field is in error
    $('#name')
      .css({'border': 'solid 2px #e8a29d', 'backgroundColor': '#e8a29d'});
    //real time error message should go here

    //name is not valid
    return false;
  }
}

//function to validate the email field
function validateEmail() {
  //email field - must be a validly formatted email address (abc@example.com)
  //regex pattern for properly formatted email address:
  const regex = /^[\w\.-_]+@\w+\.(com|net|org|edu)$/;
  const input = $('#mail').val();
  //if the string contains the pattern, then the email field contains a
  //properly formatted email address
  if(regex.test(input)) {
    //return input to default style if the user enters the proper input
    $('#mail').removeAttr('style');
    //email field is valid
    return true;
  } else { //otherwise the email field is in error
    $('#mail')
      .css({'border': 'solid 2px #e8a29d', 'backgroundColor': '#e8a29d'});
    //real time error message should go here

    //email field is not valid
    return false;
  }
}

function validateCreditCardNumber() {
  //regex pattern for a number that is between 13-16 digits long
  let regex = /^(\d{13}|\d{14}|\d{15}|\d{16})$/;
  const input = $('#cc-num').val();
  //if the input contains the pattern then the credit card number is between
  //13-16 digits long
  if(regex.test(input)) {
    //return input to default style if the user enters the proper input
    $('#cc-num').removeAttr('style');
    //credit card number is valid
    return true;
  } else { //otherwise the email field is in error
    $('#cc-num')
      .css({'border': 'solid 2px #e8a29d', 'backgroundColor': '#e8a29d'});
    //real time error message should go here

    //credit card number is not valid
    return false;
  }
};

function validateZipCode() {
  //regex pattern for a number that is 5 digits long
  let regex = /^\d{5}$/;
  const input = $('#zip').val();
  //if the input contains the pattern then the zip code is 5 digits long
  if(regex.test(input)) {
    //return input to default style if the user enters the proper input
    $('#zip').removeAttr('style');
    //zip code is valid
    return true;
  } else { //otherwise the zip code field is in error
    $('#zip')
      .css({'border': 'solid 2px #e8a29d', 'backgroundColor': '#e8a29d'});
    //real time error message should go here

    //zip code is not valid
    return false;
  }
};

function validateCVV() {
  //regex pattern for a number that is 3 digits long
  let regex = /^\d{3}$/;
  const input = $('#cvv').val();
  //if the input contains the pattern then the cvv number is 3 digits long
  if(regex.test(input)) {
    //return input to default style if the user enters the proper input
    $('#cvv').removeAttr('style');
    //cvv number is valid
    return true;
  } else { //otherwise the cvv number field is in error
    $('#cvv')
      .css({'border': 'solid 2px #e8a29d', 'backgroundColor': '#e8a29d'});
    //real time error message should go here

    //cvv number is not valid
    return false;
  }
}

//function to validate "Register for Activities" section
function validateActivities() {
  let isValid;
  //user must select at least one checkbox under the "Register for Activities"
  //section
  //select the activities checkboxes
  $('.activities input').each(function() {
    //if any of the checkboxes are checked, then there is no error
    if($(this).prop('checked') === true) {
      isValid = true;
    }
  })
  //the "Register for Activities" section has been validated
  if(isValid) {
    return true;
  } else {
    //otherwise the use has not selected an activity, create error message
    //ensure no duplicate error messages are generated
    if($('#error-message').length === 0) {
      $('.activities')
        .append('<div id="error-message" style="background:#e8a29d">Please ' +
        'select at least one activity to attend</div>');
    }
    //the "Register for Activities" section is not validated,
    //do not submit form
    return false;
  }
}

//general form submission event handler
$('form').on('submit', function(e) {
  //flag to determine if the entire form is valid
  let isValid;
  //stop the form from submitting
  e.preventDefault();
  //store the form components' validation states
  const checkName = validateName();
  const checkEmail = validateEmail();
  const checkActivities = validateActivities();
  //check to see if the form components are valid
  if(checkName && checkEmail && checkActivities) {
    //name, email and activities components are valid
    isValid = true;
  } else { //one or more of the components are not valid
    isValid = false;
  }
  //if the user selects the "Credit Card" payment method, then validate
  //the user's credit card information
  if($('#payment option:selected').val() === 'credit card') {
    //store the credit card fields' validation states
    const checkCreditCardNumber = validateCreditCardNumber();
    const checkZipCode = validateZipCode();
    const checkCVV = validateCVV();
    //check to see if the credit card fields are valid
    if(checkCreditCardNumber && checkZipCode && checkCVV) {
      //all credit card fields are valid
      isValid = true;
    } else { //one or more of the credit card fields are not valid
      isValid = false;
    }
  }
  //all of the components are valid, the form can be submitted
  if(isValid) {
    $('form').unbind('submit').submit();
  }
});

//name field keyup event handler
$('#name').on('keyup', function() {
  validateName();
});

//email field keyup event handler
$('#mail').on('keyup', function() {
  validateEmail();
});

//credit card fields keyup event handler
$('#credit-card input').on('keyup', function() {
  //determine which credit card field has focus
  if($(this).attr('id') === 'cc-num') { validateCreditCardNumber(); }
  else if($(this).attr('id') === 'zip') { validateZipCode(); }
  else if($(this).attr('id') === 'cvv') { validateCVV(); }
});
