import { OPTIONS, OPTIONS_PAGINATION, INIT_SWIPER } from './OptionsPagination'

//elements
const CARDS = document.querySelectorAll('.cards--carousel');
const HEROS = document.querySelectorAll('.hero');
const PRODUCT_HEROS = document.querySelectorAll('.hero-product__slider');
const RELATED_PRODUCTS_CARDS = document.querySelectorAll('.related-products__cards');

// CARDS
if (CARDS.length) {
  //loop over the components nodelist
  for (let i = 0; CARDS.length > i; i++) {
    let el = CARDS[i];

    let primaryEl = el.querySelector('.swiper-container');
    let visibleCardCount = el.getAttribute('data-visible-card-count');

    visibleCardCount ? OPTIONS['cards']['slidesPerView'] = visibleCardCount : OPTIONS['cards']['slidesPerView'] = 2;

    let swiperWrapperChildrenCount = primaryEl.querySelector('.swiper-wrapper').childElementCount;

    if (swiperWrapperChildrenCount > visibleCardCount) {
      INIT_SWIPER(primaryEl, OPTIONS.cards);
    }
  }
}

// RELATED_PRODUCTS_CARDS
if (RELATED_PRODUCTS_CARDS.length) {
  //loop over the components nodelist
  for (let i = 0; RELATED_PRODUCTS_CARDS.length > i; i++) {
    let el = RELATED_PRODUCTS_CARDS[i];

    let primaryEl = el.querySelector('.swiper-container');


    let swiperWrapperChildrenCount = primaryEl.querySelector('.swiper-wrapper').childElementCount;
    if (swiperWrapperChildrenCount > 4) {
      //init the swiper
      INIT_SWIPER(primaryEl, OPTIONS.relatedProductsCards);
    }
  }
}

//
// HEROS
if (HEROS.length) {
  //loop over the components nodelist
  for (let i = 0; HEROS.length > i; i++) {
    let el = HEROS[i];

    //if the hero component has more than one item, add the carousel class
    if (el.childElementCount > 1) {

      //convert to iterable
      let children = [...el.children];
      //setup template literal strings
      let primary = ``, secondary = ``;

      //loop over the pre-render DOM items and manipulate/inject in template literal children
      children.map(child => {
        //add child node from pre-render DOM to swiper-wrapper (main)
        //add the swiper-slide class
        child.classList.add('swiper-slide');
        //add the outerHTML to the string
        primary += child.outerHTML;

        //add title, only to swiper-wrapper (pagination)
        secondary += `<div class="swiper-slide">${child.querySelector('.teaser__title').innerHTML}</div>`;

      });

      let wrapper;

      //build out the default "template"
      wrapper = `
      <div class="swiper-container gallery-top">
        <div class="swiper-wrapper">
          ${primary}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-container gallery-thumbs">
          <div class="swiper-wrapper">
            ${secondary}
          </div>
        </div>
      </div>`;

      //bind to the wrapper
      el.innerHTML = wrapper;

      //post-injection DOM elemeents (to pass to INIT functions)
      let primaryEl = el.querySelector('.swiper-container.gallery-top'),
        secondaryEl = el.querySelector('.swiper-container.gallery-thumbs'),
        options = OPTIONS_PAGINATION(secondaryEl);
        INIT_SWIPER(primaryEl, options);

    }
  }
}


if(PRODUCT_HEROS.length) {
  //loop over the components nodelist
  for (let i = 0; PRODUCT_HEROS.length > i; i++) {
    let el = PRODUCT_HEROS[i];
    console.log(el);

    //if the hero component has more than one item, add the carousel class
    if (el.childElementCount > 1) {

      //convert to iterable
      let children = [...el.children];
      //setup template literal strings
      let primary = ``, secondary = ``, thumb = ``;

      //loop over the pre-render DOM items and manipulate/inject in template literal children
      children.map(child => {
        //add child node from pre-render DOM to swiper-wrapper (main)
        //add the swiper-slide class
        child.classList.add('swiper-slide');
        //add the outerHTML to the string
        primary += child.outerHTML;

        //get the thumb (if we have it)
        if( child.querySelector('img').getAttribute('data-thumbnail') ){
          thumb = `<img src="${child.querySelector('img').getAttribute('data-thumbnail')}" alt="${child.querySelector('img').getAttribute('alt')}" />`
        }

        //add title, only to swiper-wrapper (pagination)
        secondary += `<div class="swiper-slide">${thumb}</div>`
      });

      let wrapper;

      // build out the "pdp-template"
      wrapper = `
        <div class="swiper-container gallery-thumbs">
              <div class="swiper-button-prev"></div>
              <div class="swiper-wrapper">
                ${secondary}
              </div>
              <div class="swiper-button-next"></div>
          </div>
        <div class="swiper-container gallery-top">
          <div class="swiper-wrapper">
            ${primary}
          </div>
        </div>
      `;

      //bind to the wrapper
      el.innerHTML = wrapper;

      //post-injection DOM elemeents (to pass to INIT functions)
      let primaryEl = el.querySelector('.swiper-container.gallery-top'),
        secondaryEl = el.querySelector('.swiper-container.gallery-thumbs'),
        options = OPTIONS_PAGINATION(secondaryEl, 'vertical');
        INIT_SWIPER(primaryEl, options);
    }
  }
}