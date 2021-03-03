if( document.querySelector('.global-search') ){
    if( document.querySelectorAll('.global-search__content').length ){

        let total = 0;

        document.querySelectorAll('.global-search__content').forEach( i => {
            let count = i.querySelector('.faceted-browse').getAttribute('data-result-count');
            let type = i.getAttribute('data-type');
            if( count && type ){
                let navItem = i.closest('.global-search').querySelector(`.global-search__nav-item[data-type="${type}"]`);
                if( navItem ){
                    if( navItem.querySelector('.global-search__results-count') ){
                        navItem.querySelector('.global-search__results-count').innerText = `(${count})`;
                    } 
                }
            }
            total = total + parseInt(count);
        });

        if( document.querySelector('.global-search__total-results-count') ){
            document.querySelector('.global-search__total-results-count').innerText = total;
        }  
    }

    let navItemLink = document.querySelector(".global-search").querySelector(".global-search__nav-item.active");
    let navItemContent = document.querySelector(".global-search").querySelector(".global-search__content.active");
    let windowWidth = window.innerWidth;
    window.addEventListener("resize", ()=> {
        windowWidth = window.innerWidth;
        toggleActiveMobileContent();
    })
    toggleActiveMobileContent();

    function toggleActiveMobileContent() {
        if (navItemLink && navItemContent) {
            if (windowWidth < 1024){
                navItemLink.addEventListener('click', onClickToggle)
            } else {
                navItemLink.removeEventListener("click", onClickToggle);
                if (!navItemContent.classList.contains("active")){
                    navItemContent.classList.add("active");
                }
                if (!navItemLink.classList.contains("active")){
                    navItemLink.classList.add("active");
                }
            }
        }
    }
    function onClickToggle(e){
        e.preventDefault();
        if (navItemContent.classList.contains("active")) {
            navItemContent.classList.remove("active");
        } else {
            navItemContent.classList.add("active");
        }
        if (navItemLink.classList.contains("active")) {
            navItemLink.classList.remove("active");
        } else {
            navItemLink.classList.add("active");
        }
    }
}