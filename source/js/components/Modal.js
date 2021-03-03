const ACTIVATE_ON_LOAD_MODALS = document.querySelectorAll(".modal[data-modal-activate-on-load='true']");
const BODY_EL = document.body;

const ADD_MODAL_CLOSE_LISTENER = (modalEl) => {
  if (modalEl.querySelector('.modal__close')){
    modalEl.querySelector('.modal__close').addEventListener('click', function () {
      modalEl.classList.remove('active');
      BODY_EL.classList.remove('active-modal');
    });
  }
};

const SHOW_MODAL = (modalEl) => {
  BODY_EL.classList.add('active-modal');
  if( modalEl ){
    //open the correct modal
    modalEl.classList.add('active');
    document.querySelector('body').classList.add('active-modal');

    let overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    document.querySelector('body').appendChild(overlay);
  }
};

// Automatically open modals on page load if data-modal-activate-on-load is true
if (ACTIVATE_ON_LOAD_MODALS) {
  ACTIVATE_ON_LOAD_MODALS.forEach((ACTIVATE_ON_LOAD_MODAL) => {
    SHOW_MODAL(ACTIVATE_ON_LOAD_MODAL);
  });
}

// Add Close Event Listener to all Modals
let modals = document.querySelectorAll('.modal');
modals.forEach((modalEl) => {
  ADD_MODAL_CLOSE_LISTENER(modalEl);
});

// Add Close Event Listner to modal CTA (if no href is present on the <a> tag)
let closeCTA = document.getElementsByClassName("modal__cta")
if (closeCTA && closeCTA[0] && closeCTA[0].querySelector('a')){
  let cta = closeCTA[0].querySelector('a');
  if (!cta.hasAttribute('href')){
    cta.addEventListener("click", () => {
      cta.closest(".modal").classList.remove("active");
      BODY_EL.classList.remove('active-modal');
    })
  }
}

// // Find all modal triggers add event listener to open modal on click
// let modalTriggers = document.querySelectorAll('.modal__trigger');
// modalTriggers.forEach((modalTrigger) => {
//   modalTrigger.addEventListener('click', (e) => {
//     let modalEl = e.currentTarget.closest('.modal');
//     if( modalEl ){
//       SHOW_MODAL(modalEl);
//     } else {
//       if( e.currentTarget.hasAttribute('data-modal-trigger') ){
//         let modalId = e.currentTarget.getAttribute('data-modal-trigger');
//         let matchingEl = document.querySelector(`.modal[data-modal="${modalId}"]`);
//         SHOW_MODAL(matchingEl);
//       }
//     }
//   });
// });



function openModal(e, id){
  e.preventDefault();

  let modal = document.querySelector(`.modal[data-modal="${id}"]`);

  if( modal ){
    //open the correct modal
    modal.classList.add('active');
    document.querySelector('body').classList.add('active-modal');

    let overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    document.querySelector('body').appendChild(overlay);

    console.log(modal);
  }
}

function closeModal(e){
  e.stopPropagation();
  this.closest('.modal').classList.remove('active');
  document.querySelector('body').classList.remove('active-modal');
  document.querySelector('.modal-overlay').remove();

  // Add video stop functionality on close modal
  let iframe = this.closest('.modal').querySelector('iframe');
  if ( iframe !== null ) {
    let iframeSrc = iframe.src;
    iframe.src = iframeSrc;
  }
  
  e.preventDefault();
}

const triggers = document.querySelectorAll('[data-modal-trigger]');

triggers.forEach( i => {
  let id = i.getAttribute('data-modal-trigger')
  if( i.closest('.card') != null ){
    //if card exists make the whole card clickable vs. the play button
    i.closest('.card').addEventListener('click', function(e){
      openModal(e, id)
    })
  } else {
    i.addEventListener('click', function(e){
      openModal(e, id)
    })
  }
});


let close = document.querySelectorAll('[data-modal-close]');
close.forEach( i => i.addEventListener('click', closeModal));
