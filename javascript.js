// TODO: call on stop
window.onscroll = function() {checkStickyHeader()};
MicroModal.init();

function toggle(input, answerId) {
  setTimeout(function() {
    var answer = document.getElementById(answerId);
    answer.style.display = input.checked ? 'block' : 'none';
    
    countNumberOfProducts();
    toggleVippsGoWrapper();
  }, 0)
}

function toggleVippsGoWrapper() {
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

function countNumberOfProducts() {
  var answers = document.querySelectorAll('input[type="checkbox"]:checked').length;
  var numberElements = document.getElementsByClassName('number-of-products');
  
  var x = document.getElementById("product-section");
  var y = document.getElementById("sticky-product-counter");
  if(answers > 0) {
    x.style.display = "block";
    y.style.display = "block";
    if(!elementInViewport(document.getElementById("product-section"))) {
      y.classList.add("sticky");
    }
  } else {
    x.style.display = "none";
    y.style.display = "none";
  }
  
  [].slice.call( numberElements ).forEach(function ( number ) {
    number.innerHTML = answers;
  });
  
}

function checkStickyHeader() {
  var productCounter = document.getElementById("sticky-product-counter");
  if (elementInViewport(document.getElementById("product-section"))) {
    productCounter.classList.remove("sticky");
  } else {
    productCounter.classList.add("sticky");
  }
}

function elementInViewport(el) {
  var top = el.offsetTop + 150;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  
  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  
  return (
    (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      (top + height) <= (window.pageYOffset + window.innerHeight) &&
      (left + width) <= (window.pageXOffset + window.innerWidth)
    ) || top <= window.pageYOffset 
  );
}

window.smoothScroll = function(target) {
  // TODO: Do better
  var scrollContainer = target;
  do { 
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);
  
  var targetY = 0;
  do { 
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while (target = target.offsetParent);
  
  scroll = function(c, a, b, i) {
    i++; if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function(){ scroll(c, a, b, i); }, 10);
  }
  
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}