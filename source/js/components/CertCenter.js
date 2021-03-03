const CERT_CENTER = document.querySelector('.filler-metal-certification');

if (CERT_CENTER) {
  let activeElement = CERT_CENTER.querySelector('.filler-metal-certification__nav-active-item');
  activeElement.classList.add('active');
  let elements = CERT_CENTER.querySelectorAll('.filler-metal-certification__nav-item');
  if (elements.length !== 0) {
    //loop through all nev items
    elements.forEach( i => {
      // if an active nav item is found, put it's innerText inside the nav active item title
      if (i.classList.contains("active")){
        activeElement.querySelector('.filler-metal-certification__nav-active-item-title').innerText = i.querySelector("a").innerText;
      }
    })
  }

  //initialize the nav-active-item-icon with a chevron down
  if (!CERT_CENTER.querySelector(".filler-metal-certification__nav-wrapper").classList.contains("active")){
    CERT_CENTER.querySelector('.filler-metal-certification__nav-active-item-icon').classList.add("icon-chevron-down");
  }
  // add on click event on the nav-active-item
  activeElement.addEventListener("click", () => {
    // remove all the existing icons
    CERT_CENTER.querySelector('.filler-metal-certification__nav-active-item-icon').classList.remove("icon-chevron-down");
    CERT_CENTER.querySelector('.filler-metal-certification__nav-active-item-icon').classList.remove("icon-chevron-up");
    
    // toggle active and icon (chevron down or chevron up) on click
    if (CERT_CENTER.querySelector('.filler-metal-certification__nav-wrapper').classList.contains("active")){
      CERT_CENTER.querySelector('.filler-metal-certification__nav-wrapper').classList.remove("active");
      CERT_CENTER.querySelector('.filler-metal-certification__nav-active-item-icon').classList.add("icon-chevron-down");
      activeElement.classList.add('active');
    } else {
      CERT_CENTER.querySelector('.filler-metal-certification__nav-wrapper').classList.add("active");
      CERT_CENTER.querySelector('.filler-metal-certification__nav-active-item-icon').classList.add("icon-chevron-up");
      activeElement.classList.remove('active');
    }
  })

}