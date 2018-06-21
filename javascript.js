window.onscroll = debounce(function() { checkStickyHeader() }, 100);
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
  var showVippsGo;
  var goWrapper = document.getElementById("go-wrapper");
  var vippsGoChildren = goWrapper.childNodes;
  
  for(child in vippsGoChildren){
    if (vippsGoChildren[child].style && vippsGoChildren[child].style.display === 'block') {
      showVippsGo = true;
    }
  }
  goWrapper.style.display = showVippsGo ? 'block' : 'none';
}

function countNumberOfProducts() {
  var answers = document.querySelectorAll('input[type="checkbox"]:checked').length;
  
  var productSectionElement = document.getElementById("product-section");
  var stickyCounterElement = document.getElementById("sticky-product-counter");
  var numberOfProductElements = document.getElementsByClassName('number-of-products');
  
  if(answers > 0) {
    productSectionElement.style.display = "block";
    stickyCounterElement.style.display = "block";
    if(!elementInViewport(productSectionElement)) {
      stickyCounterElement.classList.add("sticky");
    }
  } else {
    productSectionElement.style.display = "none";
    stickyCounterElement.style.display = "none";
  }
  
  [].slice.call( numberOfProductElements ).forEach(function ( number ) {
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

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};