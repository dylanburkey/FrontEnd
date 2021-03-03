function handleInputChange(e){
    e.preventDefault();
    let inputNumber = this.value.replace(new RegExp(/[^\d]/,'ig'), "");
    
    this.closest('.input-quantity').nextElementSibling.removeAttribute('disabled');
    this.value = inputNumber;
    this.setAttribute('data-value', inputNumber);
    if (inputNumber <= Number(this.getAttribute("data-min-value")) || inputNumber.length === 0){
        //setting data-value attribute
        this.setAttribute('data-value', this.getAttribute("data-min-value"));
        //handling increment/decrement and add-to-cart 
        this.closest('.input-quantity').querySelector('[data-direction="decrement"]').setAttribute('disabled', 'disabled');
        this.closest('.input-quantity').nextElementSibling.setAttribute('disabled', 'disabled');
    } else {
        this.closest('.input-quantity').querySelector('[data-direction="decrement"]').removeAttribute('disabled');
    }
    // pass input value from "data-value" to "AddToCart" CTA 
    if( document.querySelectorAll('.hero-product__quantity').length ){
        this.closest(".hero-product__quantity").querySelector('[data-action="add-to-cart"]').setAttribute("data-quantity", this.getAttribute("data-value"));
    } else if( document.querySelectorAll('.card__quantity').length ) {
        this.closest(".card__quantity").querySelector('[data-action="add-to-cart"]').setAttribute("data-quantity", this.getAttribute("data-value"));
    }
}

// clear input each time it focuses
function handleClearInput(e) {
    e.preventDefault();
    this.value = "";
    this.setAttribute('value', "");
    this.setAttribute('data-value', "");
}

// format input on focus out
function handleFormatInput(e){
    e.preventDefault();
    let inputNumber = this.value.replace(new RegExp(/[^\d]/,'ig'), "");
    if (inputNumber <= Number(this.getAttribute("data-min-value")) || inputNumber.length === 0){
        //setting value and data-value attribute
        this.value = this.getAttribute("data-min-value") + " " + this.getAttribute('data-suffix');
        this.setAttribute('data-value', this.getAttribute("data-min-value"));
        //handling increment/decrement and add-to-cart 
        this.closest('.input-quantity').querySelector('[data-direction="decrement"]').setAttribute('disabled', 'disabled');
        this.closest('.input-quantity').nextElementSibling.removeAttribute('disabled');
    } else {
        //setting value and data-value attribute
        this.value = inputNumber + " " + this.getAttribute('data-suffix');
        this.setAttribute('data-value', inputNumber);
        //handling increment/decrement and add-to-cart 
        this.closest('.input-quantity').nextElementSibling.removeAttribute('disabled', 'disabled');
        this.closest('.input-quantity').querySelector('[data-direction="decrement"]').removeAttribute('disabled', 'disabled');
    }

    if ( Number(this.getAttribute('data-value')) === 0 ){
        this.closest('.input-quantity').nextElementSibling.setAttribute('disabled', 'disabled');
    }

    if ( document.querySelectorAll('.hero-product__update-price').length ){
        if ( this.getAttribute('data-value') > 0 ){
            this.closest('.hero-product__add-to-cart').querySelector('.hero-product__update-price').classList.remove('disabled');
        } else {
            this.closest('.hero-product__add-to-cart').querySelector('.hero-product__update-price').classList.add('disabled');
        }
    }
    // pass input value from "data-value" to "AddToCart" CTA 
    if( document.querySelectorAll('.hero-product__quantity').length ){
        this.closest(".hero-product__quantity").querySelector('[data-action="add-to-cart"]').setAttribute("data-quantity", this.getAttribute("data-value"));
    } else if( document.querySelectorAll('.card__quantity').length ) {
        this.closest(".card__quantity").querySelector('[data-action="add-to-cart"]').setAttribute("data-quantity", this.getAttribute("data-value"));
    }
}

function handleChange(e) {
    e.preventDefault();
    let input = this.closest('.input-quantity').querySelector('input[type="text"]');
    this.closest('.input-quantity').querySelectorAll('input[type="button"]').forEach( i => i.disabled = false);
    this.closest('.input-quantity').nextElementSibling.removeAttribute('disabled');

    if( this.getAttribute('data-direction') == "increment" ){
        if (Number(input.getAttribute("data-value")) < Number(input.getAttribute('data-min-value'))){
            input.setAttribute("data-value", input.getAttribute("data-min-value"));
            input.value = `${input.getAttribute('data-value')} ${input.getAttribute('data-suffix')}`;    
        } else {
            input.setAttribute('data-value', Number(input.getAttribute('data-value')) + Number(input.step));
            input.value = `${input.getAttribute('data-value')} ${input.getAttribute('data-suffix')}`;    
        }
        if (Number(input.getAttribute('data-value')) == input.getAttribute('data-min-value')) {
            this.closest('.input-quantity').querySelector('input[data-direction="decrement"]').disabled = true;
        }
    } else if( this.getAttribute('data-direction') == "decrement" ) {
        if ( Number(input.getAttribute('data-value')) - Number(input.step) >= input.getAttribute('data-min-value') ){
            input.setAttribute('data-value', Number(input.getAttribute('data-value')) - Number(input.step));
            input.value = `${input.getAttribute('data-value')} ${input.getAttribute('data-suffix')}`;    
        } else {
            input.setAttribute('data-value', Number(input.getAttribute('data-min-value')));
            input.value = `${input.getAttribute('data-min-value')} ${input.getAttribute('data-suffix')}`;    
            this.disabled = true;
            this.closest('.input-quantity').nextElementSibling.setAttribute('disabled', 'disabled');
        }
        if (Number(input.getAttribute('data-value')) == input.getAttribute('data-min-value') ) {
            this.disabled = true;
            this.closest('.input-quantity').nextElementSibling.removeAttribute('disabled', 'disabled');
        } 
        if (Number(input.getAttribute('data-value')) < input.getAttribute('data-min-value') || Number(input.getAttribute('data-value')) == 0){
            this.closest('.input-quantity').nextElementSibling.setAttribute('disabled', 'disabled');
        }
    }

    if( document.querySelectorAll('.hero-product__update-price').length ){
        if( input.getAttribute('data-value') > 0 ){
            this.closest('.hero-product__add-to-cart').querySelector('.hero-product__update-price').classList.remove('disabled');
        } else {
            this.closest('.hero-product__add-to-cart').querySelector('.hero-product__update-price').classList.add('disabled');
        }
    }

    if( document.querySelectorAll('.hero-product__quantity').length ){
        this.closest(".hero-product__quantity").querySelector('[data-action="add-to-cart"]').setAttribute("data-quantity", input.getAttribute("data-value"));
    } else if( document.querySelectorAll('.card__quantity').length ) {
        this.closest(".card__quantity").querySelector('[data-action="add-to-cart"]').setAttribute("data-quantity", input.getAttribute("data-value"));
    }
}

// update quantity of the input (and of the AddToCart CTA) if the "qty" query param is present
if( document.querySelector('.hero-product__quantity' )){
    if( document.querySelectorAll('.input-quantity') && document.querySelector('.quantity-field') ){
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        let qtyParam = searchParams.get('qty');
        if( qtyParam ) {
            document.querySelector('.quantity-field').setAttribute("data-value", qtyParam);
            let value = qtyParam;
            if( document.querySelector('.quantity-field').getAttribute("data-suffix") ) {
                value += " " + document.querySelector('.quantity-field').getAttribute("data-suffix");
            }
            document.querySelector('.quantity-field').setAttribute("value", value);
            if( qtyParam !== "0" && document.querySelector('[data-direction="decrement"]')){
                document.querySelector('[data-direction="decrement"]').removeAttribute("disabled");
            }
            if( document.querySelector('[data-action="add-to-cart"]') ){
                document.querySelector('[data-action="add-to-cart"]').setAttribute("data-quantity", document.querySelector('.quantity-field').getAttribute("data-value"));
            }
        }  
    }
}

if( document.querySelectorAll('.input-quantity').length ){
    document.querySelectorAll('.input-quantity').forEach( i => {
        if( i.querySelector('.quantity-field').getAttribute('data-value') == "0" ) {
            i.nextElementSibling.setAttribute('disabled', 'disabled')
        }

        i.querySelector('.quantity-field').addEventListener("focus", handleClearInput);
        i.querySelector('.quantity-field').addEventListener("input", handleInputChange);
        i.querySelector('.quantity-field').addEventListener("focusout", handleFormatInput);

        i.querySelectorAll('input[type="button"]').forEach( j => {
            j.addEventListener('click', handleChange)
        });
    })
}

if( document.querySelectorAll('.hero-product__update-price').length ){
    document.querySelectorAll('.hero-product__update-price').forEach( i => {
        i.addEventListener('click', function(e){
            let value = this.closest('.hero-product__add-to-cart').querySelector('.input-quantity').querySelector('.quantity-field').getAttribute('data-value');
            if( value == 0 ) {
                e.preventDefault();
            } else {
                this.classList.remove('disabled');
                let paramJoin = "?";
                if( this.getAttribute('data-url').indexOf('?') > -1 ) paramJoin = '&';
                this.setAttribute('href', `${this.getAttribute('data-url')}${paramJoin}qty=${value}`)
            }
        })
    })
}
