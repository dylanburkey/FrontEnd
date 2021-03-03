import Swiper from 'swiper';

export const OPTIONS = {
  cards: {
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    fadeEffect: {
      crossFade: true
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    on: {
      init: function () {
        // do remove "swiper-initialized" class if in Experience Editor
        if (!this.el.closest(".cards--carousel").classList.contains("experience-editor-mode")){
          this.el.closest('.cards--carousel').classList.add('swiper-initialized');
        }
      },
    }
  },
  addToCartModal: {
    slidesPerView: 3,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    fadeEffect: {
      crossFade: true
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    on: {
      init: function () {
        this.el.closest('.atc-modal__upsell').classList.add('swiper-initialized')
      },
    }
  },
  relatedProductsCards: {
    slidesPerView: 4,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    fadeEffect: {
      crossFade: true
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    on: {
      init: function () {
        this.el.closest('.related-products__cards').classList.add('swiper-initialized')
      },
    }
  },
  heroPagination: {
    slidesPerView: 4,
  }
};

//global init slider
export const INIT_SWIPER = (el, options) => {
  // do not initiate swiper if in Experience Editore
  if (el.closest(".experience-editor-mode")){
    el.classList.remove("swiper-container");
    el.setAttribute("style", "overflow: scroll");
    if (el.querySelector(".carousel-wrapper")){
      el.querySelector(".carousel-wrapper").classList.remove('swiper-wrapper');
      el.querySelector(".carousel-wrapper").setAttribute("style","display: flex");
    }
    let elements = el.querySelectorAll('.swiper-slide');
    if (elements.length){
      elements.forEach(element => {
        element.classList.remove("swiper-slide");
        element.classList.add("experience-editor-content-style");
      })
    }
    return
  } else {
    return new Swiper(el, options);
  }
};

export const OPTIONS_PAGINATION = (secondaryEl, direction) => {
  let secondaryElChildren = secondaryEl.querySelector(".swiper-wrapper").children.length,
      heroPagination = {
        slidesPerView: 4
      }

  if (direction) {
    heroPagination = {
      direction: direction,
      slidesPerView: secondaryElChildren,
      spaceBetween: 12,
      breakpoints: {
        1024: {
          slidesPerView: 6,
          spaceBetween: 12,
        }
      }
    }
  }

  let paginationOptions = {
    loop: true,
    slidesPerView: 1,
    autoHeight: true,
    fadeEffect: {
      crossFade: true
    },
    on: {
      init: function () {
        this.el.classList.add('swiper-initialized')
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    thumbs: {
      swiper: INIT_SWIPER(secondaryEl, heroPagination),
    }
  }


  return paginationOptions;
}

