if (document.querySelector('.filters, .sort')) {
  //store the existing url selections in "state" if we have them
  let state = window.location.search.includes('filters=') || window.location.search.includes('sort=') ? decodeURIComponent(window.location.search).split('?')[1].split('&') : [];
  console.log(state);

  const TOGGLE_FILTER = document.querySelector(".js-filter-toggle");
  if (TOGGLE_FILTER) {
    TOGGLE_FILTER.addEventListener("click", toggleFilters);
  }

  function toggleFilters (e){
    e.preventDefault();
    let groups = document.querySelectorAll(".filter-group");
    if (groups) {
      if (this.getAttribute("data-closed")==="true") {
        this.innerText = this.getAttribute("data-collapse");
        groups.forEach(group => {
          group.classList.add("active");
          this.setAttribute("data-closed", false);
        })
      } else {
        this.innerText = this.getAttribute("data-expand");
        groups.forEach(group => {
          group.classList.remove("active");
          this.setAttribute("data-closed", true);
        })
      }
    }
  }

  function updateFilters(e){
    e.preventDefault();

    //get facet/filter name info to build string
    let facet = this.closest('.filter-group, .sort-group').getAttribute('data-facet-name');
    let value = `filters=${facet}|${this.getAttribute('data-filter-name')}`;

    if( facet == 'sort' ){
      //remove from all others - "single select"
      this.closest('.sort-group').querySelectorAll('.js-radio-link').forEach( i => i.classList.remove('checked') );
      this.classList.toggle('checked');
    } else {
      //toggle the 'checked' class
      this.classList.toggle('checked');
    }

    //handle the toggling of filters + sort
    if( facet == 'sort' ){
      //filter out any sort parameters
      state = state.filter(i => ! i.includes('sort'));
      //push the new one "replace" it
      state.push(`sort=${this.getAttribute('data-filter-name')}`);
    } else {
      //toggle filters based on existing state
      if( ! state.includes(value) ){
        state.push(value);
      } else {
        state = state.filter(i => i != value )
      }
    }
    //handle the button status
    if( state.length ) {
      document.querySelectorAll('.js-submit-btn').forEach(button => button.classList.add('enabled'))
    } else {
      document.querySelectorAll('.js-submit-btn').forEach(button => button.classList.remove('enabled'))
    }
    console.log(state);
  }

  function updateSubmitButton(e){    
    //build the string from the state array
    let string = state.join('&');
    string = `?${string}`;
    //update the url
    this.setAttribute('href', string);
  }

  function closeNav(e){
    e.preventDefault();
    this.closest('.expended').classList.remove('expended');
    document.querySelector('body').classList.remove('black-overlay', 'no-scroll');
  }

  function openNav(e){
    e.preventDefault();
    console.log(this);
    this.closest('.faceted-browse').querySelector(`.${this.getAttribute('data-toggle')}`).classList.add('expended');
    document.querySelector('body').classList.add('no-scroll', 'black-overlay'); 
  }

  function handleFilters(e){
    // console.log(e.matches);
    if( e.matches ) {
      document.querySelectorAll('.js-checkbox-link, .js-radio-link').forEach(checkbox => checkbox.addEventListener('click', updateFilters));
      document.querySelectorAll('.js-submit-btn').forEach(button => button.addEventListener('click', updateSubmitButton));
      document.querySelectorAll('.js-hide-filters, .js-hide-sort').forEach(link => link.addEventListener('click', closeNav));
      document.querySelectorAll('.js-show-filters, .js-show-sort').forEach(link => link.addEventListener('click', openNav));
    } else {
      document.querySelectorAll('.js-checkbox-link, .js-radio-link').forEach(checkbox => checkbox.removeEventListener('click', updateFilters));
      document.querySelectorAll('.js-checkbox-link, .js-radio-link').forEach(checkbox => checkbox.addEventListener('click', setScrollPosition));
      document.querySelectorAll('.js-checkbox-link, .js-radio-link').forEach(checkbox => checkbox.addEventListener('click', saveDeSelectedCheckbox));
      if (document.querySelectorAll('.active-filters-content__close-btn') && document.querySelectorAll('.active-filters-content__close-btn').length !== 0){
        document.querySelectorAll('.active-filters-content__close-btn').forEach(link => link.addEventListener('click', setScrollPosition));
        document.querySelectorAll('.active-filters-content__close-btn').forEach(link => link.addEventListener('click', saveDeSelectedFilter));
      }
      document.querySelectorAll('.js-submit-btn').forEach(button => button.removeEventListener('click', updateSubmitButton));   
      document.querySelectorAll('.js-hide-filters, .js-hide-sort').forEach(link => link.removeEventListener('click', closeNav));
      document.querySelectorAll('.js-show-filters, .js-show-sort').forEach(link => link.removeEventListener('click', openNav));
      if (document.querySelectorAll('.filter-item__link').length !== 0){
        document.querySelectorAll('.filter-item__link').forEach(link => link.addEventListener('click', setScrollPosition));
      }
      if (document.querySelectorAll(".faceted-browse__nav").length !== 0){
        document.querySelectorAll(".faceted-browse__nav").forEach(nav => {
          if (nav.querySelectorAll('select')){
            nav.querySelectorAll('select').forEach(select => select.addEventListener('change', setScrollPositionFacetedBrowse));
          }
        })
      }
    }
  };

  function setScrollPositionFacetedBrowse(){
    const FACETED_BROWSE = document.querySelector(".faceted-browse");
    if (FACETED_BROWSE){
      let scrollPosition = getOffsetTop(FACETED_BROWSE);
      localStorage.setItem("pageScrollY", scrollPosition);
    }
  }

  function setScrollPosition(){
    let scrollPosition = window.scrollY;
    localStorage.setItem("pageScrollY", scrollPosition);
  }

  function saveDeSelectedCheckbox (e) {
    let filterGroupAttribute = e.target.closest(".filter-group").getAttribute("data-facet-name");
    localStorage.setItem("closedFacetName", filterGroupAttribute);
  }

  function saveDeSelectedFilter (e) {
    let facetName = e.target.getAttribute("data-facet-name");
    localStorage.setItem("closedFacetName", facetName);
  }

  const getOffsetTop = element => {
    let offsetTop = 0;
    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  }

  window.addEventListener('load', function () {
    if (localStorage.getItem("pageScrollY") !== null){
      let scrollY = parseInt(localStorage.getItem("pageScrollY"));
      if (!isNaN(scrollY)) {
        window.scroll(0, scrollY);
        localStorage.removeItem("pageScrollY");
      }
    }
    if (localStorage.getItem("closedFacetName") !== null){
      let closedFacetName = localStorage.getItem("closedFacetName");
      if (closedFacetName !== "") {
        let filterCategories = document.querySelectorAll(".filter-group");
        if (filterCategories && filterCategories.length !== 0) {
          filterCategories.forEach( category => {
            if (category.getAttribute("data-facet-name") === closedFacetName) {
              category.classList.add("active");
            }
          })
          localStorage.removeItem("closedFacetName");
        }
      }
    }
    if( matchMedia ) {
      const mq = window.matchMedia('(max-width: 1023px)');
      mq.addListener(handleFilters);
      handleFilters(mq)
    }
  });
}

