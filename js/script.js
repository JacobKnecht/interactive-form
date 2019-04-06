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
//use attribute selectors
$('#color').on('change', (e) => {
  //change the colors displayed in the color menu to match the selected design
  //here is a comment
});
