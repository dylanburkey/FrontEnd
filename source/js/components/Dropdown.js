const DROPDOWNS = document.querySelectorAll('.dropdown');

export const HANDLE_DROPDOWN = () => {
  for (const dropdown of document.querySelectorAll('.dropdown__wrapper')) {
    dropdown.addEventListener('click', function () {
      this.classList.toggle('open');
    })
  }

  for (const option of document.querySelectorAll('.dropdown__option')) {

    // if in hero dropdown, add on click event to handle page scrolling on page submit
    if (option.closest('.hero-product')){
      option.addEventListener("click", setScrollPosition );
    }

    option.addEventListener('click', function () {
      if (!this.classList.contains('selected')) {
        if(  this.parentNode.querySelector('.dropdown__option.selected') ){
          this.parentNode.querySelector('.dropdown__option.selected').classList.remove('selected');
        }
        this.classList.add('selected');
        this.closest('.dropdown__wrapper').querySelector('.dropdown__trigger').textContent = this.textContent;
      }

      //if in hero dropdown
      if( this.closest('.hero-product') ){
        this.closest('.hero-product__dropdowns').querySelector(`input[type="hidden"][name="${this.getAttribute('data-name')}"]`).value = this.getAttribute('data-value');
        this.closest('.hero-product__dropdowns').querySelector('form').submit();
      }
    })
  }

  function setScrollPosition(){
    let scrollPosition = window.scrollY;
    localStorage.setItem("heroPageScrollY", scrollPosition);
  }

  window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.dropdown__wrapper')) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    }
  });

  if( document.querySelector('.hero-product') && document.querySelectorAll('.hero-product__dropdown').length ){
    document.querySelectorAll('.hero-product__dropdowns').forEach( i => {
      i.querySelectorAll('.selected').forEach(i => i.classList.remove('selected'));

      i.querySelectorAll('input[type="hidden"]').forEach( input => {
        if( i.querySelector(`.dropdown__option[data-value="${input.value}"][data-name="${input.name}"]`) ){
          i.querySelector(`.dropdown__option[data-value="${input.value}"][data-name="${input.name}"]`).classList.add('selected');
          i.querySelector(`.dropdown__option[data-value="${input.value}"][data-name="${input.name}"]`).closest('.dropdown').querySelector('.dropdown__trigger').innerHTML = i.querySelector(`.dropdown__option[data-value="${input.value}"][data-name="${input.name}"]`).innerHTML;
        }
      });
    });
  }
};

if (DROPDOWNS) {
  HANDLE_DROPDOWN();
  window.addEventListener('load', function () {
    if (localStorage.getItem("heroPageScrollY") !== null){
      let scrollY = parseInt(localStorage.getItem("heroPageScrollY"));
      if (!isNaN(scrollY)) {
        window.scroll(0, scrollY);
        localStorage.removeItem("heroPageScrollY");
      }
    }
  })
}