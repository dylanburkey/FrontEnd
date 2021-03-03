const search = document.querySelector('.nav-search');

if( search && search.querySelector('.nav-search__trigger') ){
    search.querySelector('.nav-search__trigger').addEventListener('click', function(e){
        this.closest('.nav-search').classList.add('active');
    })
    
    if( document.querySelector('.nav-menu-mobile .nav-menu-mobile-item .icon-search') ){
        document.querySelector('.nav-menu-mobile .nav-menu-mobile-item .icon-search').closest('a').addEventListener('click', function(e){
            e.preventDefault();
            this.closest('.header').querySelector('.nav-search').classList.add('active');
        });    
    }
    
    search.querySelector('.nav-search__close').addEventListener('click', function(e){
        this.closest('.nav-search').classList.remove('active');
    })
}

const activateSearch = (e) => {
    if( search && search.querySelector('.nav-search__trigger') ){
        if (e.matches){
            search.querySelector('.nav-search__trigger').closest('.nav-search').classList.add('active');
        } else {
            search.querySelector('.nav-search__trigger').closest('.nav-search').classList.remove('active');
        }
    }
}

window.addEventListener('load', function () {
    const mq = window.matchMedia('(min-width: 1023px)');
    mq.addListener(activateSearch);
    activateSearch(mq);

    // prepopulate search with the previously searched term 
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let query = searchParams.get('search');
    if (document.querySelector('.nav-search__input') && query){
        document.querySelector('.nav-search__input').setAttribute('value', query);
    }
})