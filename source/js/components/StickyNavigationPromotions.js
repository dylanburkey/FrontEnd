//consts
const STICKY_NAV_CONTAINER = document.querySelector('.sticky-navigation-promotions-container');
const BANNER_TITLE = document.querySelector('.banner__title');
const BANNER_BUTTONS = document.querySelectorAll('.banner__buttons a');
const SIMPLE_CTA_BUTTON = document.querySelector('.simple-cta__button a');

let stickyNavContainerTop;
let stickyNavHeight;
let scrollPosition;
let navigationCtaLabels;

//functions
const CREATE_STICKY_NAVIGATION_PROMOTIONS = () => {
  let navigationTitle, navigationCtaBtn;
  let navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('sticky-navigation-promotions');

  let navigationContainer = document.createElement('div');
  navigationContainer.classList.add('container--large');

  if (BANNER_TITLE) {
    navigationTitle = BANNER_TITLE.cloneNode(true);
    navigationTitle.className = '';
    navigationTitle.classList.add('sticky-navigation-promotions__page-title');
    navigationContainer.appendChild(navigationTitle);
  }

  if (BANNER_BUTTONS) {
    navigationCtaLabels = document.createElement('ul');
    navigationCtaLabels.classList.add('sticky-navigation-promotions__cta-labels');
    BANNER_BUTTONS.forEach(btn => {
      let navigationCtaLabel = document.createElement('li');
      navigationCtaLabel.classList.add('sticky-navigation-promotions__cta-label');
      let navigationCtaLink = btn.cloneNode(true);
      navigationCtaLink.className = '';
      navigationCtaLink.classList.add('sticky-navigation-promotions__cta-link');
      navigationCtaLabel.appendChild(navigationCtaLink);
      navigationCtaLabels.appendChild(navigationCtaLabel);
    });
    navigationContainer.appendChild(navigationCtaLabels);
  }

  if (SIMPLE_CTA_BUTTON) {
    navigationCtaBtn = document.createElement('div');
    navigationCtaBtn.classList.add('sticky-navigation-promotions__cta-btn');
    let navigationContactBtn = SIMPLE_CTA_BUTTON.cloneNode(true);
    navigationCtaBtn.appendChild(navigationContactBtn);
    navigationContainer.appendChild(navigationCtaBtn);
  }

  navigationWrapper.appendChild(navigationContainer);
  STICKY_NAV_CONTAINER.appendChild(navigationWrapper);
};

const ADD_FIXED = () => {
  scrollPosition = window.pageYOffset;
  if (scrollPosition >= stickyNavContainerTop) {
    stickyNavHeight = document.querySelector('.sticky-navigation-promotions').offsetHeight;
    document.body.style.paddingTop = stickyNavHeight + 'px';
    document.querySelector('.sticky-navigation-promotions').classList.add('fixed');
  } else {
    document.body.style.paddingTop = 0;
    document.querySelector('.sticky-navigation-promotions').classList.remove('fixed');
  }
};

const ON_CLICK = (e) => {
  if (e.target.href.indexOf(window.location.href) > -1) {
    e.preventDefault();
    let target = document.querySelector(e.target.hash);
    //check if the section with that id is not null
    if (target !== null) {
      let scrollTo = target.offsetTop - stickyNavHeight;
      window.scrollTo(0, scrollTo);
    }
  }
};

const ATTACH_STICKY_NAVIGATION = () => {
  if (STICKY_NAV_CONTAINER) {
    CREATE_STICKY_NAVIGATION_PROMOTIONS();
    navigationCtaLabels = STICKY_NAV_CONTAINER.querySelectorAll('.sticky-navigation-promotions__cta-link');
    stickyNavContainerTop = STICKY_NAV_CONTAINER.offsetTop;

    ADD_FIXED();

    window.addEventListener('scroll', ADD_FIXED, true);

    window.addEventListener('resize', function () {
      stickyNavContainerTop = STICKY_NAV_CONTAINER.offsetTop;
      ADD_FIXED();
    });

    navigationCtaLabels.forEach(link => {
      link.addEventListener("click", (e) => ON_CLICK(e), true);
    });
  }
};

window.addEventListener('load', function () {
  ATTACH_STICKY_NAVIGATION();
});