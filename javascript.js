MicroModal.init();

function toggle(input, answerId) {
  
  countNumberOfProducts();
  
  var answer = document.getElementById(answerId);
  input.checked != input.checked;
  answer.style.display = input.checked ? 'block' : 'none';
  
  turnProductOn();
}

function countNumberOfProducts() {
  var answers = document.querySelectorAll('input[type="checkbox"]:checked').length;
  var numberElements = document.getElementsByClassName('number-of-products');
  
  
  [].slice.call( numberElements ).forEach(function ( number ) {
    number.innerHTML = answers;
  });
  
}

function turnProductOn() {
  var isGoCheckBox = false;
  var goWrapper = document.getElementById("GO");
  
  for (var i = 30; i < 38; i++) {
    var input = document.getElementById(i.toString());
    if (input.checked) {
      isGoCheckBox = true;
    }
  }
  goWrapper.style.display = isGoCheckBox ? 'block' : 'none';
}

window.onscroll = function() {checkStickyHeader()};

// Get the header
var productCounter = document.getElementById("sticky-produckt-counter");

// Get the offset position of the navbar
var sticky = 50;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function checkStickyHeader() {
  if (window.pageYOffset <= sticky) {
    productCounter.classList.add("sticky");
  } else {
    productCounter.classList.remove("sticky");
  }
}

