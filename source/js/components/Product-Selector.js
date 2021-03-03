//variables
const PRODUCT_SELECTOR = document.querySelector('.product-selector');

//functions
const HANDLE_CHANGE = (e) => {
  const select = e.currentTarget;
  const selectValue = select.value;
  const selectDefaultValue = select.querySelector('[data-default-option]').value;
  //if the selected value is different from the default one trigger form submit in order to get the next select populated
  if ( selectValue !== selectDefaultValue) {
    select.closest('form').submit();
  }
};

const HANDLE_PRODUCT_MODEL = (e) => {
  const select = e.currentTarget;
  const selectValue = select.value;
  const selectDefaultValue = select.querySelector('[data-default-option]').value;
  //if the selected value is different from the default one enable the submit button
  if ( selectValue !== selectDefaultValue) {
    PRODUCT_SELECTOR.querySelector('.btn').removeAttribute('disabled');
  }
};

if (PRODUCT_SELECTOR) {
  const selectItems = PRODUCT_SELECTOR.querySelectorAll('select:not([data-product-model])');
  const selectProductModel = PRODUCT_SELECTOR.querySelector('select[data-product-model]');
  
  if( selectProductModel ){
    //on change for product model select
    selectProductModel.addEventListener('change', HANDLE_PRODUCT_MODEL);
  }
  
  if( selectItems ){
    //on change for select items from product selector component, except the product model one
    for (let i=0; i < selectItems.length ; i++) {
      selectItems[i].addEventListener('change', (e) => HANDLE_CHANGE(e));
    }
  }
}

