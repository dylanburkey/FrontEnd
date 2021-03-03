const container = '.filtered-browse';
const filters = '.link-filters';
const component = document.querySelector(container);

if( component ){

    let state = {
        category: null,
        show: "100",
        sort: 'nameAsc',
        page: "1"
    };
    
    function render(){
        //handle sorting all of the results
        let sorted = Array.from(document.querySelectorAll('.card')).sort(function (x, y) {
            let dataAttr = null;
            if( state.sort == 'nameAsc' || state.sort == 'nameDesc' ) { 
                dataAttr = 'name'
            } else if( state.sort == 'priceDesc' || state.sort == 'priceAsc' ) {
                dataAttr = 'price'
            } else if( state.sort == 'valueDesc') {
                dataAttr = 'savings'
            }

            let a = state.sort == 'priceAsc' || state.sort == 'priceDesc' || state.sort == 'valueDesc' ? Number(x.dataset[dataAttr]) : x.dataset[dataAttr].toUpperCase(),
                b = state.sort == 'priceAsc' || state.sort == 'priceDesc' || state.sort == 'valueDesc' ? Number(y.dataset[dataAttr]) : y.dataset[dataAttr].toUpperCase();
            
            let func = "";

            if( state.sort == 'nameAsc' || state.sort == 'priceAsc' ) {
                func = a == b ? 0 : a > b ? 1 : -1;
            } else if ( state.sort == 'nameDesc' || state.sort == 'priceDesc' || state.sort == 'valueDesc' ){
                func = a == b ? 0 : a < b ? 1 : -1;
            }

            return func;
        });

        //clear the container
        document.querySelector('.filtered-browse__results').innerHTML = '';

        //reinsert the updated based on sort rules
        sorted.forEach(el => {
            document.querySelector('.filtered-browse__results').appendChild(el)
        });

        //handle the show rules
        let selector = state.category ? `.card[data-category="${state.category}"]` : '.card';
        //re-query dom to get corretly sorted dom, store in new selector
        let dom = document.querySelectorAll(selector);
        
        //render based on show state rules
        let counter = state.page == "1" ? 0 : Number(state.page - 1) * Number(state.show);
        for( let i = counter; Number(state.page) * Number(state.show) > i; i++ ){
            if( dom[i] ){
                dom[i].classList.add('active');
            }
        }

        if( state.category ) {
            //add the active class to the clicked item
            document.querySelector('.link-filters').querySelector(`li[data-category="${state.category}"]`).classList.add('active');
        } else {
            document.querySelector('.link-filters').querySelectorAll('li').forEach(i => {
                if( ! i.hasAttribute('data-category') ){
                    i.classList.add('active');
                }
            });
        }

        // handle pagination prev and next arrows
        document.querySelector(".filtered-browse__next-link").addEventListener("click", nextPage);
        document.querySelector(".filtered-browse__prev-link").addEventListener("click", prevPage);

        // hide prev/arrows depending on state.page
        if (state.page == "1") {
            document.querySelector(".filtered-browse__prev-link").classList.add("arrow-hidden");
        } else {
            document.querySelector(".filtered-browse__prev-link").classList.remove("arrow-hidden");
        }
        if (state.page == Math.ceil(dom.length/state.show)) {
            document.querySelector(".filtered-browse__next-link").classList.add("arrow-hidden");
        } else {
            document.querySelector(".filtered-browse__next-link").classList.remove("arrow-hidden");
        }
        
        //update the show count value
        document.querySelector('.show-count').innerHTML = state.show > dom.length ? dom.length : Number(state.page) * Number(state.show) > dom.length ? dom.length : Number(state.page) * Number(state.show);
        //update the pagination count
        document.querySelector('.pagination-count').innerHTML = Number(state.page - 1) * Number(state.show) + 1;
        
        //clear pagination
        document.querySelector('.filtered-browse__pagination-items').innerHTML = '';
        
        if( dom.length > state.show ){
            //build pagination DOM
            let numberOfPages = Math.ceil(dom.length/state.show);
            let dots = document.createElement('button');
            dots.textContent = "...";
            dots.setAttribute("disabled", "disabled");
            console.log("numberOfPages", numberOfPages)
            for( let i = 0; numberOfPages > i; i++ ){
                let button = document.createElement('button');
                button.setAttribute('data-page', i + 1);
                button.textContent = i + 1;
                button.classList.add("hidden");
                if( state.page == i + 1){
                    button.classList.add('active')
                }
                //bind click event
                button.addEventListener('click', paginate);
                document.querySelector('.filtered-browse__pagination-items').appendChild(button);
            }
            if (numberOfPages <= 4) {
                for (let i = 1; i <= numberOfPages; i++){
                    document.querySelector(`[data-page="${i}"]`).classList.remove('hidden');
                }
            }
            if (numberOfPages > 4) {
                for (let i = 1; i < 4; i++){
                    document.querySelector(`[data-page="${i}"]`).classList.remove('hidden');
                }
                document.querySelector(`[data-page="3"]`).parentNode.insertBefore(dots.cloneNode(true), document.querySelector(`[data-page="3"]`).nextSibling);
                document.querySelector(`[data-page="${numberOfPages}"]`).classList.remove('hidden');
                if (state.page >= 4 && state.page < numberOfPages - 2){
                    document.querySelector(`[data-page="3"]`).nextSibling.remove();
                    let activeButton = document.querySelector(`[data-page="${state.page}"]`);
                    let leftButton = document.querySelector(`[data-page="${state.page-1}"]`);
                    let rightButton = document.querySelector(`[data-page="${state.page+1}"]`);
                    activeButton.classList.remove("hidden");
                    leftButton.classList.remove("hidden");
                    rightButton.classList.remove("hidden");
                    leftButton.parentNode.insertBefore(dots.cloneNode(true), leftButton);
                    rightButton.parentNode.insertBefore(dots.cloneNode(true), rightButton.nextSibling);
                    if (state.page >= 4) {
                        document.querySelector(`[data-page="2"]`).classList.add('hidden');
                        document.querySelector(`[data-page="3"]`).classList.add('hidden');
                        if (state.page == 4){
                            document.querySelector(`[data-page="3"]`).classList.remove('hidden');
                        }
                        document.querySelector(`[data-page="${numberOfPages-1}"]`).classList.add('hidden');
                    }
                    
                }
                if (state.page >=  numberOfPages-2) {
                    for (let i = 2; i <  numberOfPages-2; i++ ){
                        document.querySelector(`[data-page="${i}"]`).classList.add("hidden");
                    }
                    document.querySelector(`[data-page="${numberOfPages}"]`).classList.remove('hidden');
                    document.querySelector(`[data-page="${numberOfPages-1}"]`).classList.remove('hidden');
                    document.querySelector(`[data-page="${numberOfPages-2}"]`).classList.remove('hidden');
                }
            }
        }
        
        //update the total count value based on sort rules
        document.querySelector('.total-count').innerHTML = dom.length;
        
        //ensure that all "show" select are defaulted to 100 on load
        if (document.querySelectorAll('.filtered-browse__select--show .select')) {
            document.querySelectorAll('.filtered-browse__select--show .select').forEach(select => {
                select.querySelector('select').querySelectorAll('option').forEach(option => {
                    // remove selected from all other option
                    option.removeAttribute("selected");
                    // add selected for the option that matches the state.show value
                    if (option.getAttribute("value") === state.show) {
                        option.setAttribute("selected", "selected");
                    }
                })
                //also update the selects value to state.show
                select.querySelector('select').setAttribute("value", state.show);
            });
        }
    }

    function paginate(){
        //update state
        state.page = this.getAttribute('data-page');
        
        //cleanup the classes
        cleanup();

        //trigger the re-render
        render();
    }

    function nextPage(){
        //update state
        state.page = Number(state.page) + 1;

        //cleanup the classes
        cleanup();

        //trigger the re-render
        render();
    }

    function prevPage(){
        //update state
        state.page = Number(state.page) - 1;

        //cleanup the classes
        cleanup();

        //trigger the re-render
        render();
    }

    //cleanup active classes on things
    function cleanup(){
        document.querySelectorAll('.card').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.link-filters__items li').forEach(i => i.classList.remove('active'));
    }

    //on load
    document.addEventListener('DOMContentLoaded', render);

    //on click
    document.querySelectorAll('.link-filters__items li button').forEach(i => i.addEventListener('click', function(e){
        //update state
        state.category = this.closest('li').getAttribute('data-category') ? this.closest('li').getAttribute('data-category') : null;
        //reset the page back to 1
        state.page = "1";

        //cleanup the classes
        cleanup();

        //trigger the re-render
        render();
    }));

    //on change (select) - show, only
    document.querySelectorAll('.filtered-browse__select--show .select').forEach(i => i.querySelector('select').addEventListener('change', function(e){
        //update state
        state.show = this.options[this.selectedIndex].getAttribute('value');
        
        //ensure that all other similar selects have the same values
        document.querySelectorAll('.filtered-browse__select--show .select').forEach(select => {
            select.querySelector('select').querySelectorAll('option').forEach(option => {
                // remove selected from all other option
                option.removeAttribute("selected");
                // add selected for the option that matches the state.show value
                if (option.getAttribute("value") === state.show) {
                    option.setAttribute("selected", "selected");
                }
            })
            //also update the other selects value to state.show
            select.querySelector('select').setAttribute("value", state.show);
        });

        // reset to page 1
        state.page =  1;

        //cleanup the classes
        cleanup(); 

        //trigger the re-render
        render();
    }));

    //on change (select) - sort, only
    document.querySelectorAll('.filtered-browse__select--sort .select').forEach(i => i.querySelector('select').addEventListener('change', function(e){
        //update state
        state.sort = this.options[this.selectedIndex].getAttribute('value');

        //cleanup the classes
        cleanup();

        //trigger the re-render
        render(true);
    }));
}
    
