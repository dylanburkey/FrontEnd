import { getCookie, setCookie } from '../util/Cookies';

const HEADER = document.querySelector('.header');
if (HEADER){

  //consts
	const LINKS = document.querySelectorAll('.nav-links > .has-dropdown > a, .has-children > a');
	const NOTIFICATION_BANNER = document.querySelector('.notification');
  const CLOSE_BUTTON = document.querySelector('.notification__close-button');

  //function hide banner
  const HIDE_BANNER = () => {
    NOTIFICATION_BANNER.classList.add('active');
    HEADER.classList.add('notification-closed');
  }

	//checked the existence of close button in case notification banner is not displayed
	if(CLOSE_BUTTON){
    CLOSE_BUTTON.addEventListener('click', function (event) {
			setCookie('notificationClosed', true, 356);
			HIDE_BANNER();
    });
	}

	//add margin on the header 
	if(NOTIFICATION_BANNER){
		HEADER.classList.add('notification-exists');
	}

  const notificationCookie = getCookie('notificationClosed');
  console.log(notificationCookie);
  if (notificationCookie == "true" && NOTIFICATION_BANNER) {
    HIDE_BANNER();
  }

	//functions
	const ACTIVATE = (e) => {
		e.preventDefault();

	  let el = e.currentTarget;

	  //toggle the active class on the parent
	  el.closest('.header').classList.toggle('nav-active');
	  document.querySelector('body').classList.toggle('no-scroll');
	};

	const ACTIVATE_DESKTOP = (e) => {
		e.preventDefault();

	  let el = e.currentTarget;
		// let lis = el.closest('.nav-links, .nav-utility-menu').querySelectorAll('.l1, .nav-utility-item');
		//remove all active class
		// lis.forEach( i => {
			if( el.closest('li').classList.contains('active') ){
				// i.classList.remove('active');
				el.closest('li').classList.remove('active')
			} else {
				// i.classList.remove('active');
				el.closest('li').classList.add('active');
			}
		// });
	};

	const DEACTIVATE_DESKTOP = (e) => {
		let el = e.currentTarget;
		if(  e.target.closest('.l1') == null || e.target.closest('.nav-utility-item') == null){
            let lis = el.querySelectorAll('.nav-links .l1, .nav-utility-menu .nav-utility-item');
            lis.forEach(i => {
				i.classList.remove('active');
			});
		}
	}

	const DEACTIVATE_MOBILE = (e) => {
		let el = e.currentTarget;
		if (e.target.closest(".li") == null || e.target.closest('.nav-menu-mobile-item') == null){
			let lis = el.querySelectorAll('.nav-menu-mobile-item');
			lis.forEach(i => {
				i.classList.remove('active');
			});
		}
	}

	const ACTIVATE_LEVELS = (e) => {
		e.preventDefault();

  //creating dynamic heading and injecting it to the parent div
	  let el = e.currentTarget;
   //  let title = el.getAttributeNode('data-item-title-mobile');
   //  if (title) {

   //  	let newTitle = title.value;
			// let childrenTitle = document.createElement('h3');
			// childrenTitle.classList.add('container__title');
			// childrenTitle.setAttribute('id', 'dynamic-heading');
			// childrenTitle.innerText = newTitle;
			// let parent = el.closest('div');
			// parent.insertBefore(childrenTitle, parent.firstChild);

   //  }


	  //toggle the active class on the parent
	  el.closest('li').classList.toggle('active');
	  el.closest('ul').classList.toggle('hide');

	  if( el.closest('.nav').querySelector('.has-dropdown.active') ){
	  	document.querySelector('.nav-menu-back').classList.add('show')
	  	document.querySelector('.nav-menu-back').classList.remove('hide')
	  } else {
	  	document.querySelector('.nav-menu-back').classList.remove('show')
	  	document.querySelector('.nav-menu-back').classList.add('hide')
	  }
	};

    const ACTIVATE_NAV_UTILITY_MOBILE = (e) => {
        e.preventDefault();
        let el = e.currentTarget;

        //toggle the active class on the parent
        el.closest('li').classList.toggle('active');
        el.closest('ul').classList.toggle('hide');
        document.querySelector('.nav-links').classList.toggle('hidden');
        document.querySelector('.region-selector').classList.toggle('hidden');

        if( el.closest('.nav').querySelector('.has-dropdown.active') ){
            document.querySelector('.nav-menu-back').classList.add('show')
            document.querySelector('.nav-menu-back').classList.remove('hide')
        } else {
            document.querySelector('.nav-menu-back').classList.remove('show')
            document.querySelector('.nav-menu-back').classList.add('hide')
        }
		};
		
		const ACTIVATE_MOBILE_NAV_ITEMS = (e) => {
			e.preventDefault();
			let el = e.currentTarget;
			el.closest('li').classList.toggle('active');
		}

	// //removing dynamic-heading on go back
	// const REMOVE_DYNAMIC_HEADING = () => {
	// 	var dynamicHeading = document.getElementById('dynamic-heading');
	// 	if (dynamicHeading) {
	// 		dynamicHeading.remove();
	// 	}
	// };


	const GO_BACK = (e) => {
		e.preventDefault();
		let els = document.querySelectorAll('.hide, .has-children.active, .has-dropdown.active');
        // REMOVE_DYNAMIC_HEADING();
		//if we're in a level
		if( els.length ){		
			let active = els[els.length - 1];
			active.classList.remove('active');
            document.querySelector('.nav-links').classList.remove('hidden');
            document.querySelector('.region-selector').classList.remove('hidden');

			if( els.length > 1 ){
				let hide = els[els.length - 2];
				hide.classList.remove('hide');
			}
		}

		if( e.currentTarget.closest('.nav').querySelector('.has-dropdown.active') ){
			document.querySelector('.nav-menu-back').classList.add('show')
			document.querySelector('.nav-menu-back').classList.remove('hide')
		} else {
			document.querySelector('.nav-menu-back').classList.remove('show')
			document.querySelector('.nav-menu-back').classList.add('hide')
		}
	};

	const MATCH_HEIGHT = (e) => {
		let el = e.currentTarget;
		let parentUl = el.closest('ul');
		let childUl = el.closest('li').querySelector('.children-wrap');

		if( childUl ) {
			let height = window.getComputedStyle(childUl).height;
			el.closest('.primary-ul').style.setProperty('min-height', height);
			parentUl.style.setProperty('min-height', height);
		}
	};

	const RESET_HEIGHT = (e) => {
		let el = e.currentTarget;	
		let uls = el.querySelector('.nav').querySelectorAll('ul');
		// console.log(e.target);
		// console.log(e.target.classList.contains('.l2-link'));

		if( e.target.closest('.l2') == null || e.target.classList.contains('l2-link') ){
			uls.forEach(i => {
				i.style.removeProperty('min-height');
			});
		}
	};


	const INIT_PREVENTDEFAULT = (e) => {
		//first remove click events from all dropdowns
		document.querySelectorAll('.nav-links > .has-dropdown > a, .has-children > a, .nav-utility-menu .has-dropdown > a').forEach( i => {
			i.closest('li').classList.remove('active');
			i.closest('ul').classList.remove('hide');
			i.removeEventListener('click', ACTIVATE_LEVELS, true);
			i.removeEventListener('click', ACTIVATE_DESKTOP, true);
      i.removeEventListener('click', ACTIVATE_NAV_UTILITY_MOBILE, true);
		});

		// document.querySelector('body').removeEventListener('mouseover', RESET_HEIGHT, true)
		document.querySelector('body').removeEventListener('click', DEACTIVATE_DESKTOP, true)

		if( e.matches ){
			//in mobile view
			//add click events to all dropdowns from nav-links
			document.querySelectorAll('.nav-links > .has-dropdown > a, .has-children > a').forEach( i => {
				i.addEventListener('click', ACTIVATE_LEVELS, true);
			});

			//add click events to all dropdowns from mobile nav 
			document.querySelectorAll('.nav-menu-mobile-item.has-dropdown.mobile-has-dropdown > a').forEach( i => {
				i.addEventListener('click', ACTIVATE_MOBILE_NAV_ITEMS, true)
			})

      //add click events to all dropdowns from utility navigation
      document.querySelectorAll('.nav-utility-menu > .has-dropdown > a').forEach( i => {
          i.addEventListener('click', ACTIVATE_NAV_UTILITY_MOBILE, true);
			});
			document.querySelector('body').addEventListener('click', DEACTIVATE_MOBILE, true);

		} else {
			//in desktop view
			//add click events only to top dropdown
			document.querySelectorAll('.nav-links > .has-dropdown > a, .nav-utility-menu > .has-dropdown > a').forEach( i => {
				i.addEventListener('click', ACTIVATE_DESKTOP, true);
			});
			// //add hover events if we need them
			// document.querySelectorAll('.has-children > a').forEach( i => {
			// 	i.addEventListener('mouseover', MATCH_HEIGHT, true);
			// })

			// document.querySelector('body').addEventListener('mouseover', RESET_HEIGHT, true)
			document.querySelector('body').addEventListener('click', DEACTIVATE_DESKTOP, true)
		}
	};

	if( matchMedia ){
		const mq = window.matchMedia('(max-width: 1023px)');
		mq.addListener(INIT_PREVENTDEFAULT);
		INIT_PREVENTDEFAULT(mq);
	}

	document.querySelector('.nav-menu-toggle').addEventListener('click', (e) => ACTIVATE(e));
	document.querySelector('.nav-menu-close').addEventListener('click', (e) => ACTIVATE(e));
	document.querySelector('.nav-menu-back').addEventListener('click', (e) => GO_BACK(e));
}