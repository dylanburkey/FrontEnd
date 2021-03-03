import { getCookie } from '../util/Cookies';

//only execute if cookie policy has been accepted
if( getCookie('cookiepolicy') == 'accept' ){
  const CARDS = document.querySelectorAll('.card--product-list, .card--product-grid');
  const COMPAREITEMS = document.querySelectorAll('.compare-results-item');
  const COMPARE_RESULTS = document.querySelector('.compare-results');
  const FACETED_BROWSE = document.querySelector('.faceted-browse');
  // const COMPARE_TRAY = document.querySelector('.compare-tray');

  //toggle switch on click event
  const TOGGLE_SWITCH = document.querySelector(".toggle-switch input");
  if (TOGGLE_SWITCH) {
    TOGGLE_SWITCH.addEventListener('click', function(event){
      HIGHLIGHT_ROW(event);
    });
  }
  //iterates through tables and checks if td have the same values
  const HIGHLIGHT_ROW = (e) => {
    const tables = document.querySelectorAll('.compare-results-detail-item');
    [...tables].map(table => table.getElementsByTagName('tr'))
      .forEach((tableRows) => {
        [...tableRows].forEach(row => {
          if (e.srcElement.checked) {
            const contents = row.querySelectorAll('td:not(:first-of-type)');
            //some checks if at least one item meets the condition
            const isDiff = [...contents].some((element, index, array) => {
              if (index > 0) {
                return element.innerText !== array[index - 1].innerText;
              }
              return false;
            });
            if (isDiff) {
              row.classList.add('active');
            }
          } else {
            row.classList.remove('active');
          }
        });
      });
      
      // when toggling "Highlight Differences", the tables having differences are displayed
      tables.forEach((table) => {
        const contents = table.querySelectorAll('.active');
        if (contents.length) {
          table.classList.add("active");
        } else {
          table.classList.remove("active");
        }
      })
  }

  //update local storage
  const INIT_COMPARE = (e) => {
    let 
    el = e.currentTarget, 
    card = el.closest('.card'), 
    storage = localStorage.getItem('compare'),
    arr = [],
    obj = {
      'date': new Date(),
      'id': card.getAttribute('data-product-id'),
      'title': card.getAttribute('data-product-title'),
      'subtitle': card.getAttribute('data-product-subtitle'),
      'sku': card.getAttribute('data-product-sku'),
      'url': card.querySelector('.card__image') ? card.querySelector('.card__image').getAttribute('href') : null,
      'image': card.getAttribute('data-product-image'),
      'imageAlt': card.getAttribute('data-product-image-alt'),
      'msrp': card.getAttribute('data-product-msrp'),
      'msrpLabel': card.getAttribute('data-product-msrp-label')
    }

    //parse the storage if we have it and store as `arr`
    if( storage ){
      arr = JSON.parse(storage);
      if(arr.length > 3){
        arr.shift(); 
      }
    }

    //only if it's not already in the storage, or if it's the first time adding
    if( arr.filter( i => i.url != obj.url ).length == arr.length || arr.length == 0 ) {
      arr.push(obj);
      card.querySelector('.compare-product').setAttribute('disabled', 'disabled');
      localStorage.setItem('compare', JSON.stringify(arr));
    }

    //repopulate the tray
    POPULATE_TRAY();
  }

  const COMPARE_TRAY_ITEM_DOMSTRING = (obj) => {
    return `<div class="compare-tray-item">
          <div class="compare-tray-item__image">
            <a href="${obj.url}"><img src="${obj.image}" alt="${obj.imageAlt}" /></a>
          </div>
          <div class="compare-tray-item__content">
            <p class="compare-tray-item__title"><a href="${obj.url}"><strong>${obj.title}</strong></a></p>
            <p class="compare-tray-item__description">${obj.subtitle} | ${obj.sku}</p>
            <div  class="compare-tray-item__pricing">
              <div class="pricing">
                <p class="pricing__title">${obj.msrpLabel}</p>
                <div class="pricing__body">
                  <span class="current">${obj.msrp}</span>
                </div>
              </div>
            </div>
          </div>
          <button class="compare-tray-item__close">&times;</button>
        </div>
      `
  }

  const CLEAR_COMPARE = (e, node) => {
    localStorage.removeItem('compare');
    node.remove();
    let btns = document.querySelectorAll('.compare-product');
    for( let i = 0; btns.length > i; i++ ){
      btns[i].removeAttribute('disabled');
    }
  }

  const UPDATE_STORAGE = (e, node) => {
    e.preventDefault();

    let 
    storage = JSON.parse(localStorage.getItem('compare')),
    href = e.currentTarget.closest('.compare-tray-item').querySelector('.compare-tray-item__image').querySelector('a').getAttribute('href');
    if( COMPARE_RESULTS ){
        if( COMPARE_RESULTS.querySelector('.compare-results__items').children.length == 3 ){
          //when you click the x here, we need to intercept and redirect
          window.location.reload();
        } else {
          //get the index of the item we are removing
          let nodes = Array.prototype.slice.call( e.currentTarget.closest('.compare-results').querySelector('.compare-results__items').children );
          let index = nodes.indexOf( e.currentTarget.closest('.compare-tray-item') );
          let rows = e.currentTarget.closest('.compare-results').querySelector('.compare-results__detail').querySelectorAll('tr');      

          //delete the corresponding table cell
          for( let i = 0; rows.length > i; i++ ){
            if (typeof rows[i].querySelectorAll("td") != 'undefined' && rows[i].querySelectorAll("td").length && rows[i].querySelectorAll("td").length > 1){
              rows[i].deleteCell(index);
            }
          }

          //and remove the actual item
          e.currentTarget.closest('.compare-tray-item').remove();
        }

    }

    if( storage ) {
        let arr = storage.filter( i => i.url != href );
        if( node ){
          if (document.querySelector(`.card__image[href="${href}"]`)){
            document.querySelector(`.card__image[href="${href}"]`).closest(".card").querySelector('.compare-product').removeAttribute('disabled');
          }
        }
        
        if( arr.length ){
          localStorage.setItem('compare', JSON.stringify(arr));
          
          if( node ){
            POPULATE_TRAY();
          }
        } else {
          if( node ) {
            CLEAR_COMPARE(e, node);
          } else {
            console.log('No compare tray available!')
          }
        }
    } else {
      console.log('Nothing to compare.')
    }
  }

  //populate the tray based on local storage values
  const POPULATE_TRAY = (e) => {
    let storage = JSON.parse(localStorage.getItem('compare')), string = "";

    if( storage ){
      let node;

      if(!document.querySelector('.compare-tray')){
        node = document.createElement('div');
        node.classList.add('compare-tray');
      } else {
        node = document.querySelector('.compare-tray');
      }

      let activeClass = "";
      if (storage.length >= 2) {
        activeClass = " active";
      } else {
        activeClass = "";
      }

      string += `
      <div class="compare-tray__scroll-bullets-wrapper${activeClass}" id="js-scroll-bullets-wrapper">
        <div class="compare-tray__scroll-bullet active" id="js-compare-tray-first-bullet">&nbsp;</div>
        <div class="compare-tray__scroll-bullet" id="js-compare-tray-second-bullet">&nbsp;</div>
      </div>
      <div class="compare-tray__items" id="js-compare-tray-items">
      `;

      for( let i = 0; storage.length > i; i++ ){
        string += COMPARE_TRAY_ITEM_DOMSTRING(storage[i]);
      }

      let btnClass = storage.length > 1 ? `btn` : 'btn disabled';

      let queryString = "?";
      for (const product of storage){
        if(product.id === ""){
          queryString += "sku=" + product.sku + "&";
        } else {
          queryString += "family=" + product.id + "&";
        }
      }
      let params = queryString.slice(0,-1);
      string += `</div>
        <div class="compare-tray__menu">
          <p class="compare-tray__title"><strong>${FACETED_BROWSE.hasAttribute('data-compare-up-to-products') ? FACETED_BROWSE.getAttribute('data-compare-up-to-products') : 'data-compare-up-to-products'}</strong></p>
          <button class="compare-tray__clear-all">${FACETED_BROWSE.hasAttribute('data-compare-clear-all') ? FACETED_BROWSE.getAttribute('data-compare-clear-all') : 'data-compare-clear-all'}</button>
          <div class="compare-tray__cta">
            <a href="${FACETED_BROWSE.hasAttribute('data-compare-url') ? FACETED_BROWSE.getAttribute('data-compare-url') + params : 'data-compare-url' + params}" class="${btnClass}">${FACETED_BROWSE.hasAttribute('data-compare-button') ? FACETED_BROWSE.getAttribute('data-compare-button') : 'data-compare-button'}</a>
          </div>
        </div>
      `;
      node.innerHTML = string;

      if (storage.length >= 2) {
        setOnScroll("compare-tray");
      };

      FACETED_BROWSE.appendChild(node);
      //bind click events
      node.querySelector('.compare-tray__clear-all').addEventListener('click', (e) => CLEAR_COMPARE(e, node));


      let items = node.querySelectorAll('.compare-tray-item');

      for( let i = 0; items.length > i; i++ ){
        items[i].querySelector('.compare-tray-item__close').addEventListener('click', (e) => UPDATE_STORAGE(e, node));
      }
    }
  }

  function setOnScroll(element){
    let compareTrayItems = document.getElementById(`js-${element}-items`);
    if (compareTrayItems){
      compareTrayItems.onscroll = function(){setActiveBulletClass(element)};
      let hasHorizontalScrollbar = compareTrayItems.scrollWidth > compareTrayItems.clientWidth;
      if (hasHorizontalScrollbar) {
        document.getElementById("js-scroll-bullets-wrapper").className = `${element}__scroll-bullets-wrapper active`;
      } else {
        document.getElementById("js-scroll-bullets-wrapper").className = `${element}__scroll-bullets-wrapper`;
      }
    }
  }
  
  function setActiveBulletClass(element) {
    let compareTrayItems = document.getElementById(`js-${element}-items`);
    if (compareTrayItems) {
      let elScroll = compareTrayItems.scrollLeft;
      let width = compareTrayItems.scrollWidth;
      let maxScrollLeft = width - compareTrayItems.clientWidth;
      let scrolled = (elScroll / width) * 100;
      if (scrolled > 25 || elScroll > maxScrollLeft - 2) {
        document.getElementById(`js-${element}-first-bullet`).className = `${element}__scroll-bullet`;
        document.getElementById(`js-${element}-second-bullet`).className = `${element}__scroll-bullet active`;
      } else if (scrolled < 25 || elScroll === 0 ) {
        document.getElementById(`js-${element}-first-bullet`).className = `${element}__scroll-bullet active`;
        document.getElementById(`js-${element}-second-bullet`).className = `${element}__scroll-bullet`;
      }
    }
  }

  if( FACETED_BROWSE ){
    if (CARDS.length > 0) {
      for( let i = 0; CARDS.length > i; i++ ){
        CARDS[i].querySelector('.compare-product').addEventListener('click', INIT_COMPARE);
      }
    }

    // only load this on PLP & PDP pages
    // add it to all tabs, also on load
    window.addEventListener('storage', POPULATE_TRAY);
    window.addEventListener('load', POPULATE_TRAY);
    window.onload = function(){setOnScroll("compare-tray")};
    window.onresize = function(){setOnScroll("compare-tray")};
  }


  //call function to update storage when query param changes OR
  //call function to update storage on click, before the form is submitted (need to intercept)
  if( COMPARE_RESULTS ){
    //when we click close button
    //remove from local storage (P)
    if (COMPAREITEMS.length > 0) {
      for( let i = 0; COMPAREITEMS.length > i; i++ ){
        COMPAREITEMS[i].querySelector('.compare-tray-item__close').addEventListener('click', UPDATE_STORAGE);
      }

      // handle bullets
      window.onresize = function(){setOnScroll("compare-results")};
      window.onload = function(){setOnScroll("compare-results")};

      // handle scrolling on compare items and compare tables at the same time
      const COMPARE_RESULTS_DETAIL_TABLE = document.querySelectorAll("[data-accordion-content]");
      const COMPARE_RESULTS_ITEMS = document.querySelector('.compare-results__items');
      if (COMPARE_RESULTS_ITEMS && COMPARE_RESULTS_DETAIL_TABLE){
        for (const table of COMPARE_RESULTS_DETAIL_TABLE) {
          table.addEventListener('scroll', ()=>{
            let currentScroll = table.scrollLeft;
            COMPARE_RESULTS_ITEMS.scrollLeft = currentScroll;
            table.setAttribute("data-scrolling", "true");
          })
        }
        COMPARE_RESULTS_ITEMS.addEventListener('scroll', ()=>{
          let currentScroll = COMPARE_RESULTS_ITEMS.scrollLeft;
          for (const table of COMPARE_RESULTS_DETAIL_TABLE) {
            if (table.getAttribute("data-scrolling") === "true"){
              table.setAttribute("data-scrolling", "false");
            } else {
              table.scrollLeft = currentScroll;
            }
          }
        })
      }
    }
  }
}