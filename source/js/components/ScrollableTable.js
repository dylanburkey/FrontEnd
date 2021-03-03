/**
@param 
@desc - set the heights based on tallest td of the two table twins after CSS display none applied
**/
const RESIZE_HEIGHTS = (els) => {

    let tableGroups = document.querySelectorAll('.tables-scrollable');
    for( let i = 0; tableGroups.length > i; i++ ){
        let group = tableGroups[i];
        let tables = Array.from(group.querySelectorAll('table.scrollable'));

        let heights = {};

        if (tableGroups[i].querySelector(".scroll")) {
            let scroll = tableGroups[i].querySelector(".scroll");
            let maxScrollLeft = scroll.scrollWidth - scroll.clientWidth;
            let scrollLeft = scroll.scrollLeft;
            if (scrollLeft < maxScrollLeft) {
                tableGroups[i].classList.add("tables-scrollable__has-box-shadow");
            }
        }
        //get the tallest
        tables.map( i => {

            let rows = i.querySelectorAll('tr');
            
            [...rows].forEach((value, i) => {
                if( typeof heights[i] == "undefined" ){
                    heights[i] = value.offsetHeight;
                } else {
                    if( heights[i] < value.offsetHeight ){
                        heights[i] = value.offsetHeight;
                    }
                }

            });
        });

        //set the table height based on tallest
        tables.map( i => {
            let rows = i.querySelectorAll('tr');
            [...rows].forEach((value, i) => {
                value.style.height = `${heights[i]}px`
            });
        });
    }
}


/**
@param 
@desc - remove style attribute on all tr elements
**/
const CLEAR_HEIGHTS = () => {
    let tables = Array.from(document.querySelectorAll('table.scrollable'));

    //remove default heights across the board - this fires on snap to desktop
    tables.map( i => {
        let rows = i.querySelectorAll('tr');
        let setheights = [...rows].forEach(j => {
            //reset the table height
            j.removeAttribute('style');
        });
    });
}


/**
@param 
@desc - clone/wrap everything on load
**/
const INIT_TABLES = (els, windowSize) => {

    let tables =  Array.from(els);

    tables.map(i => i.classList.add('scrollable'));

    //format the table
    tables.map( i => {
        // create wrapper container
        let wrapper = document.createElement('div');
        wrapper.classList.add('tables-scrollable');
        i.parentNode.insertBefore(wrapper, i);
        wrapper.appendChild(i);

        //clone and append
        let clone = i.cloneNode(true);
        clone.classList.add('clone');
        //inject into closest table scrollable
        let parent = i.closest('.tables-scrollable');
        parent.appendChild(clone);

        //add in wrapper classes of cloned items
        let scroll = document.createElement('div'), fixed = document.createElement('div');
        scroll.classList.add('scroll');
        fixed.classList.add('fixed');

        if (windowSize === "desktop"){
            fixed.classList.add('fixed--activate-desktop');
            scroll.classList.add('scroll--activate-desktop');
        }

        clone.parentNode.insertBefore(scroll, clone);
        i.parentNode.insertBefore(fixed, i);

        scroll.addEventListener("scroll", () => {
            let maxScrollLeft = scroll.scrollWidth - scroll.clientWidth;
            let scrollLeft = scroll.scrollLeft;
            if (scrollLeft < maxScrollLeft) {
                parent.classList.add("tables-scrollable__has-box-shadow");
            } else {
                parent.classList.remove("tables-scrollable__has-box-shadow");
            }
        })
        scroll.appendChild(clone);
        parent.appendChild(scroll);
        fixed.appendChild(i);

        let maxScrollLeft = scroll.scrollWidth - scroll.clientWidth;
        let scrollLeft = scroll.scrollLeft;
        if (scrollLeft < maxScrollLeft) {
            parent.classList.add("tables-scrollable__has-box-shadow");
        }
    });
}


/**
@param - event
@desc - execute when matchMedia fires
**/
const INIT = (e, els) => {
    //whatever we need to do when the breakpoint changes
    //init type functions, etc
    window.removeEventListener('resize', RESIZE_HEIGHTS, true);

    // resize heights each time accordion is clicked
    const accordions = document.querySelectorAll('[data-accordion');
    for (const accordion of accordions) {
        let scrollableTables = accordion.querySelectorAll('.scrollable');
        if (scrollableTables.length){
            accordion.addEventListener('click', ()=>{
                RESIZE_HEIGHTS();
            })
        } 
    }

    window.addEventListener('resize', RESIZE_HEIGHTS, true);
    RESIZE_HEIGHTS();
};


//only parent tables
//ONLY fire if we have more than two cells in the table row
const cellsInRow = (table) => {
    if( typeof table != 'undefined' ){
        let rows = table.querySelectorAll('tr');
        let cells = "";
        if (typeof rows != 'undefined' && rows.length && rows.length > 1 ) {
            // we check for the tds in the second row (rows[1]) of each table
            // because the first row might be populated with th in some cases
            // second row (rows[1]) will always be populated with td
            cells = rows[1].querySelectorAll('td');
        }
        return cells.length
    } else {
        return 0
    }
}

// smallEls refers to tables with 3 to 5 columns for which it is not necessary to implement the scroll on desktop
// scroll is implemented only for mobile view
const smallEls = [...document.querySelectorAll('table')].filter( i => {
    if( i.parentElement.closest('table') == null && 
        i.parentElement.closest('.compare-results') == null && 
        cellsInRow(i) > 2 && 
        cellsInRow(i) < 6 &&
        i.getAttribute("id") !== "js-sds-table" ) {
        return i;
    }  
})

// bigEls refers to tables with more than 5 columns which require scroll logic on desktop
// scroll is implemented for both mobile and desktop view on these tables
const bigEls = [...document.querySelectorAll('table')].filter( i => {
    if( i.parentElement.closest('table') == null && 
        i.parentElement.closest('.compare-results') == null && 
        cellsInRow(i) > 5 &&
        i.getAttribute("id") !== "js-sds-table" ) {
        return i;
    }  
})

if( smallEls.length ){
    INIT_TABLES(smallEls, "mobile");

    //on screen resize
    if( matchMedia ){
        const mq = window.matchMedia('(max-width: 1023px)');
        mq.addListener(INIT);
        INIT(mq, smallEls);
    }
}

if (bigEls.length) {
    INIT_TABLES(bigEls, "desktop");

    //on screen resize
    if( matchMedia ){
        const mq = window.matchMedia('(min-width: 1024px)');
        mq.addListener(INIT);
        INIT(mq, bigEls);
    }
}