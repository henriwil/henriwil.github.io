MicroModal.init();
window.onscroll = debounce(function () {
  checkStickyProductCount()
}, 100);


function toggle(input, answerQuerySelector) {
  setTimeout(function () {
    var answer = find(answerQuerySelector);
    input.checked ? show(answer) : hide(answer);
    
    countNumberOfProducts();
    toggleVippsGoWrapper();
    
  }, 0)
}

function toggleVippsGoWrapper() {
  var showVippsGo;
  var vippsGoWrapper = find("#vipps-go-wrapper");
  var vippsGoChildren = vippsGoWrapper.childNodes;
  
  for (child in vippsGoChildren) {
    if (vippsGoChildren[child].style && vippsGoChildren[child].style.display === 'block') {
      showVippsGo = true;
    }
  }
  showVippsGo ? show(vippsGoWrapper) : hide(vippsGoWrapper);
}

function countNumberOfProducts() {
  var answers = document.querySelectorAll('input[type="checkbox"]:checked').length;
  
  var productSectionElement = find("#product-section");
  var stickyCounterElement = find("#sticky-product-counter");
  var numberOfProductElements = find('.number-of-products');
  
  if (answers > 0) {
    show(stickyCounterElement);
    show(productSectionElement);
    
    if (!elementInViewport(productSectionElement)) {
      stickyCounterElement.classList.add("sticky");
    }
  } else {
    hide(stickyCounterElement);
    hide(productSectionElement);
  }
  
  [].slice.call(numberOfProductElements).forEach(function (number) {
    number.innerHTML = answers;
  });
  
}

function show(element) {
  element.style.display = "block"
}
function hide(element) {
  element.style.display = "none"
}

function find(identifier) {
  return document.querySelectorAll(identifier).length === 1 ? 
    document.querySelectorAll(identifier)[0] :
    document.querySelectorAll(identifier) ;
}

function checkStickyProductCount() {
  var productCounter = find("#sticky-product-counter");
  if (elementInViewport(find("#product-section"))) {
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
  
  while (el.offsetParent) {
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

window.smoothScroll = function (target) {
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
  
  scroll = function (c, a, b, i) {
    i++;
    if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function () {
      scroll(c, a, b, i);
    }, 10);
  }
  
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};