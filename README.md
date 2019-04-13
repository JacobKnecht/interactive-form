# Treehouse Techdegree Project 3 - Interactive Form

Objective:
  This project displays an interactive form that allows users to register for
  "Full Stack Conf." The form allows users to enter their name, email, which
  activities they will be attending, and their method of payment. Additionally,
  users can select their job role as well as a t-shirt size, design, and color.
  Users may then submit the form. It is designed to meet the requirements for
  an 'Exceeds Expectations' grade.

Functionality:
  The form provides input fields for users to enter their information. The
  user's name and email are mandatory fields which cannot be omitted and which
  must be properly formatted. Additionally, the user must select at least one
  activity to attend and must also provide their credit card information if
  they choose to pay with their credit card. These fields are validated upon
  submission and the form will not submit if they are in error. Users can
  choose their job role, and optionally create their own if they do not see
  their job role in the list of roles provided to them. An optional t-shirt
  section allows them to choose a design and then select colors based on those
  designs.

Implementation:
  The project is implemented with a variety of functions and event handlers to
  provide the proper functionality and form validation:
    1.) $(document).ready() : Prepares the document on load by setting default
    values, hiding various form elements and disabling automatic form
    validation.
    2.) $('#title').on('change') : Reveals the "Your Job Role" text input when
    the user selects "Other" from the "Job Role" select menu.
    3.) $('#design').on('change') : Changes the colors displayed in the color
    menu to match the selected t-shirt design.
    4.) $('.activities input').on('change') : Prevents the user from selecting
    conflicting activities and displays the total cost of their combined
    activities.
    5.) $('#payment').on('change') : Displays the payment method information
    that is appropriate for the selected payment method and hides the
    information for the other payment methods.
    6.) validateName() : Uses regular expressions to validate the user's name,
    ensuring that it is not left blank and doesn't have non-alphabetic
    characters; additionally, it provides real-time error messages that change
    depending on the error.
    7.) validateEmail() : Uses regular expressions to validate the user's email
    address, ensuring that it is not left blank and that it is formatted
    properly; additionally, it provides real-time error messages that change
    depending on the error.
    8.) validateCreditCardNumber() : Uses regular expressions to validate the
    user's credit card number, ensuring that it is not left blank and that it
    only contains 13-16 numeric digits; additionally, it provides real-time
    error messages that change depending on the error.
    9.) validateZipCode() : Uses regular expressions to validate the user's
    zip code, ensuring that it is not left blank and that it only contains 5
    numeric digits; additionally, it provides real-time error messages
    that change depending on the error.
    10.) validateCVV() : Uses regular expressions to validate the user's
    cvv number, ensuring that it is not left blank and that it only contains 3
    numeric digits; additionally, it provides real-time error messages
    that change depending on the error.
    11.) validateActivities() : Checks to ensure that the user has selected at
    least one activity to attend, and generates an error message if the user
    hasn't selected an activity.
    12.) $('form').on('submit') : Prevents the form's default behavior by not
    allowing it to submit when the 'submit' button is pressed, then checks to
    ensure that the name, email and activities sections are valid, as well as
    the credit card number, zip code and CVV number fields are valid if the
    user has chosen to pay with their credit card. Allows the form to submit if
    each component is valid and generates the appropriate error messages if any
    component is invalid.
    13.) $('#name').on('keyup') : Provides real-time validation for the name
    field.
    14.) $('#mail').on('keyup') : Provides real-time validation for the email
    field.
    15.) $('#credit-card input').on('keyup') : Provides real-time for the
    credit card number, zip code, and CVV number fields.
