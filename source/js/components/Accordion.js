//consts
const ITEMS = document.querySelectorAll('[data-accordion-trigger] , .has-collapsable-attribute');

//functions
export const TOGGLE_ACCORDION = (e) => {
  let el = e.currentTarget;
  //toggle the active class on the parent
  el.closest('[data-accordion]').classList.toggle('active');
};

//bind functions
for( let i = 0; ITEMS.length > i; i++ ){
  //bind the click handler
  ITEMS[i].addEventListener('click', TOGGLE_ACCORDION);
}

