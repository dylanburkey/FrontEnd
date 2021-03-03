import { getCookie, setCookie, deleteCookie } from '../util/Cookies';

const body = document.querySelector('body');
const cookie = getCookie('cookiepolicy');

if(( ! cookie && typeof cookiePolicy != 'undefined' ) || body.classList.contains('cookie-policy-page') ){
    //nag container
    let nag = document.createElement('div');
    nag.classList.add('cookie-policy');
    
    //nag wrap
    let wrap = document.createElement('div');
    wrap.classList.add('container', 'container--large');

    //description
    let content = document.createElement('p');
    content.classList.add('cookie-policy__content');
    content.innerHTML = cookiePolicy.descriptionLabel;

    //cookiePolicy link
    let link = document.createElement('a');
    link.href = cookiePolicy.cookiePolicyUrl;
    link.innerHTML = cookiePolicy.viewCookiePolicyLabel;

    //append link to description
    content.appendChild(link);

    //button wrapper
    let buttonwrap = document.createElement('div');
    buttonwrap.classList.add('cookie-policy__options');

    //accept and decline
    let accept = document.createElement('button');
    let decline = document.createElement('button');
    
    //add classes
    accept.classList.add('btn', 'cookie-policy__accept');
    decline.classList.add('btn', 'secondary', 'cookie-policy__decline');
    accept.innerHTML = cookiePolicy.acceptLabel;
    decline.innerHTML = cookiePolicy.declineLabel;
    
    //bind click events
    accept.addEventListener('click', function(){
        setCookie('cookiepolicy', 'accept', 365);
        nag.remove();
        window.location.reload();
    });

    decline.addEventListener('click', function(){
        setCookie('cookiepolicy', 'decline', 365);
        nag.remove();
    });

    //append everything to the dom
    buttonwrap.appendChild(accept);
    buttonwrap.appendChild(decline);
    wrap.appendChild(content);
    wrap.appendChild(buttonwrap);
    nag.appendChild(wrap);
    document.documentElement.insertBefore(nag, body);
}