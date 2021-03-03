const COMPARE_RESULTS = document.querySelector('.compare-results');
const COMPARE_PRODUCTS = document.querySelector(".compare-results__results");
const COMPARE_DETAILS = document.querySelector(".compare-results__detail");
const COMPARE_DETAIL_ITEMS = document.querySelectorAll('.compare-results-detail-item');

const getOffsetTop = element => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}

if (COMPARE_RESULTS) {
  let startStickyProducts = -1;
  let compareProductOffsetHeight = COMPARE_PRODUCTS.offsetHeight;
  // endStickyProducts is the scroll height at which the sticky products should become unsticky 
  let endStickyProducts = getOffsetTop(COMPARE_RESULTS) + COMPARE_RESULTS.offsetHeight - compareProductOffsetHeight -70;
  // watch for every possible change in the height of endStickyProducts
  const TOGGLE_SWITCH = document.querySelector(".toggle-switch input");
  if (TOGGLE_SWITCH) {
    TOGGLE_SWITCH.addEventListener('click', function(){ 
      endStickyProducts = getOffsetTop(COMPARE_RESULTS) + COMPARE_RESULTS.offsetHeight - compareProductOffsetHeight -70;
    });
  }
  if (COMPARE_DETAIL_ITEMS) {
    document.querySelectorAll('.compare-results-detail-item').forEach(element => {
      element.addEventListener("click", () => {
        endStickyProducts = getOffsetTop(COMPARE_RESULTS) + COMPARE_RESULTS.offsetHeight - compareProductOffsetHeight -70;
      })
    });
  }

  const ON_SCROLL = () => {

    let scrollPosition = window.pageYOffset;
    // startStickyProducts is the Y offset at which the products should become sticky 
    if (startStickyProducts < 0) startStickyProducts = getOffsetTop(COMPARE_PRODUCTS);
    // is the user scrolls in the right interval (between startStickyProducts and endStickyProducts)
    // then make products sticky
    if (scrollPosition > startStickyProducts && scrollPosition < endStickyProducts) {
      COMPARE_PRODUCTS.classList.add("compare-results__results--sticky");
      COMPARE_DETAILS.classList.add("compare-results__detail--sticky");
      const COMPARE_PRODUCTS_STICKY = document.querySelector(".compare-results__results--sticky");
      const COMPARE_DETAILS_STICKY = document.querySelector(".compare-results__detail--sticky");
      if (COMPARE_DETAILS_STICKY && COMPARE_PRODUCTS_STICKY) {
        COMPARE_DETAILS_STICKY.style.paddingTop = COMPARE_PRODUCTS_STICKY.offsetHeight + "px";
      }
    } else {
      COMPARE_PRODUCTS.classList.remove("compare-results__results--sticky");
      COMPARE_DETAILS.classList.remove("compare-results__detail--sticky");
      COMPARE_DETAILS.style.paddingTop = 0;
    }
  }

  window.addEventListener('load', function () {
    window.addEventListener('scroll', ON_SCROLL, true);
  })
}