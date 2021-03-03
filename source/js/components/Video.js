// const videos = document.querySelectorAll('.video');


// videos.forEach(video => {
//     if( video.querySelector('[data-modal-trigger]') != null ){
//         //prevent default behavior
//         video.closest('.card').addEventListener('click', (e) => e.preventDefault());
//      }
// })

const inlineVideoTriggers = document.querySelectorAll('.video__button--inline');
inlineVideoTriggers.forEach(videoTrigger =>{
    videoTrigger.addEventListener("click", (e) => {
        e.target.classList.remove("active");
        e.target.closest(".video").querySelector(".video__img--inline").classList.remove("active");
        e.target.closest(".video").querySelector(".video__iframe-wrapper--inline").classList.add("active");
        let iframeSrc = e.target.closest(".video").querySelector("iframe").getAttribute("src");
        iframeSrc += "?autoplay=1";
        e.target.closest(".video").querySelector("iframe").setAttribute("src", iframeSrc);
    })
})