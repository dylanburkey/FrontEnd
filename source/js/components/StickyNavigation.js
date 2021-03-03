//consts
const STICKY_NAV_CONTAINER = document.querySelector('.sticky-navigation-container');
const PDP_SECTIONS = [...document.querySelectorAll('.pdp-section')];
let navContainerTop;
let stickyNavHeight;
let navLinks;
let navigationWrapper;
let isInitialized = false;

//functions
const CREATE_STICKY_NAVIGATION = () => {
  navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('sticky-navigation');

  let navigationList = document.createElement('ul');
  navigationList.classList.add('sticky-navigation__list');

  PDP_SECTIONS.map( section => {
    let sectionId = section.id,
        sectionTitle = section.querySelector('h2[data-sticky-navigation-item]').innerText;

    let navigationItem = document.createElement('li');
    navigationItem.classList.add('sticky-navigation__item');

    let navigationLink = document.createElement('a');
    navigationLink.classList.add('sticky-navigation__link');
    navigationLink.href = '#' + sectionId;
    navigationLink.innerText = sectionTitle;

    navigationItem.appendChild(navigationLink);
    navigationList.appendChild(navigationItem);
  });

  navigationWrapper.appendChild(navigationList);
  STICKY_NAV_CONTAINER.appendChild(navigationWrapper);
};

const ON_SCROLL = () => {
  let scrollPosition = window.pageYOffset;
  if (scrollPosition >= navContainerTop) {
    document.body.style.paddingTop = stickyNavHeight + 'px';
    document.querySelector('.sticky-navigation').classList.add('fixed');
  } else {
    document.body.style.paddingTop = 0;
    document.querySelector('.sticky-navigation').classList.remove('fixed');
  }
  navLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (section.offsetTop <= scrollPosition + stickyNavHeight && section.offsetTop + section.offsetHeight > scrollPosition + stickyNavHeight) {
      link.closest('li').classList.add('active');
    } else {
      link.closest('li').classList.remove('active');
    }
  });
};

const ON_CLICK = (e) => {
  e.preventDefault();
  let target = document.querySelector(e.target.hash);
  target.scrollIntoView(true);
};

const ATTACH_STICKY_NAVIGATION = () => {
  if (STICKY_NAV_CONTAINER) {
    if (PDP_SECTIONS) {
      CREATE_STICKY_NAVIGATION();
      navLinks = STICKY_NAV_CONTAINER.querySelectorAll('.sticky-navigation__link');
      stickyNavHeight = document.querySelector('.sticky-navigation').offsetHeight;
      navContainerTop = STICKY_NAV_CONTAINER.offsetTop;

      window.addEventListener('scroll', ON_SCROLL, true);

      navLinks.forEach(link => {
        link.addEventListener("click", (e) => ON_CLICK(e), true);
      });
    }
  }
  isInitialized = true;
};

const REMOVE_STICKY_NAVIGATION = () => {
  if (STICKY_NAV_CONTAINER) {
    if (PDP_SECTIONS) {
      window.removeEventListener('scroll', ON_SCROLL, true);
      navLinks.forEach(link => {
        link.removeEventListener('click', ON_CLICK, true);
      });
      STICKY_NAV_CONTAINER.removeChild(navigationWrapper);
      isInitialized = false;
    }
  }
};

const INIT = (e) => {
  if( e.matches ) {
    if (!isInitialized) {
      ATTACH_STICKY_NAVIGATION();
    }
  } else if (isInitialized) {
    REMOVE_STICKY_NAVIGATION()
  }
};

//execute the code bellow once the web page has completely loaded the slider images
window.addEventListener('load', function () {
  if( matchMedia ) {
    const mq = window.matchMedia('(min-width: 1024px)');
    mq.addListener(INIT);
    INIT(mq);
  }
});