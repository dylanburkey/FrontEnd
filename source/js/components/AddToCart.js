import { OPTIONS, INIT_SWIPER } from './OptionsPagination';

if( document.querySelectorAll('[data-action="add-to-cart"]').length ){
    for( const button of document.querySelectorAll('[data-action="add-to-cart"]') ){
        button.addEventListener('click', function(e){
            let originalHTML = this.innerHTML;
            this.setAttribute('disabled', 'disabled');
            if (this.closest('.hero-product__quantity') && this.closest('.hero-product__quantity').nextElementSibling){
                this.closest('.hero-product__quantity').nextElementSibling.classList.add('disabled');
            }
            this.innerHTML = this.getAttribute('data-loading-label') ? this.getAttribute('data-loading-label') : '...';

            //setup data
            let obj = {
                "quantity": Number(this.getAttribute('data-quantity')),
                "price": this.getAttribute('data-price'),
                "culture": this.getAttribute('data-culture')
            }

            //add ciExtSKU for substitute products
            //otherwise, key = sku
            if( document.querySelector('.hero-product') ){
                if( this.getAttribute('data-substitute-sku') ){
                    obj["ciExtSKU"] = this.getAttribute('data-substitute-sku').toString();
                } else if( this.getAttribute('data-sku') ){
                    obj["sku"] = this.getAttribute('data-sku').toString();
                }
            }

            //add ciExtSKU for discount center, only
            if( document.querySelector('.filtered-browse--discount-center') ){
                if( this.getAttribute('data-sku') ){
                    obj["ciExtSKU"] = this.getAttribute('data-sku').toString();
                }
            }

            //fetch data
            fetch(this.getAttribute('data-endpoint'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                openModal(data);
            })
            .catch(error => console.log(error, obj))
            .finally(res => {
                this.removeAttribute('disabled');
                if (this.closest('.hero-product__quantity') && this.closest('.hero-product__quantity').nextElementSibling){
                    this.closest('.hero-product__quantity').nextElementSibling.classList.remove('disabled');
                }
                this.innerHTML = originalHTML;
            });
        });
    }


    function buildHtml(data){

        let upsellShippingString = "", upsellItemsString = "", alloySurchageString= "";

        if( data.upsellShipping && data.upsellShipping.palletTotalQuantity) {
            let progressBarWidth = 100;
            let increaseToAFullPalletText = '';
            let freeShippingQualification;
            if (data.item.qtyValue < data.upsellShipping.palletTotalQuantity) {
                progressBarWidth = data.item.qtyValue * 100 / data.upsellShipping.palletTotalQuantity;
                increaseToAFullPalletText = `<p><a href="#">${data.label.increaseToAFullPallet}</a></p>`;
                let remainingQuantity = data.upsellShipping.palletTotalQuantity - data.item.qtyValue;
                freeShippingQualification = `${data.label.freeShippingQualificationFirst} ${remainingQuantity} ${data.item.qtySuffix} ${data.label.freeShippingQualificationSecond}`
            } else {
                freeShippingQualification = data.label.freeShippingQualified;
            }
            upsellShippingString = `<div class="atc-modal__shipping-upsell">
                <p><strong>${freeShippingQualification}</strong></p>
                <div class="progress-bar">
                    <div class="progress-bar-content"  style = "width: ${progressBarWidth}%"></div>
                </div>
                <p>${data.label.ordersFullPalletShipFree}</p>
                ${increaseToAFullPalletText}
            </div>`
        }

        if( data.upsellItems.items.length !== 0 ){
            let upsellCarousel = `<div class="carousel swiper-container">
            <div class="carousel-wrapper swiper-wrapper">`
            for (const item of data.upsellItems.items) {
                let rating = ``;
                if (item.rating){
                    rating = `
                        <div class="card__rating" data-product-rating="${item.rating.stars}">
                            <span>(${item.rating.count})</span>
                        </div>`
                }
                upsellCarousel += `
                <div class="card card--product-grid swiper-slide">
                    <a class="card__image" href="${item.url}">		
                        <img src="${item.image}" alt="Some Alt Here" />
                    </a>
                    <div class="card__content">
                        <a class="card__wrapper" href="${item.url}">
                            <h4 class="card__title">${item.title}</h4>
                            <p class="card__description">${item.shortDesc}</p>
                        </a>
                        ${rating}
                    </div>
                </div>
                `
            }
            upsellCarousel += `
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="swiper-navigation">
                <!-- If we need navigation buttons -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>`
            upsellItemsString = `<div class="atc-modal__upsell">
                <h4>${data.label.otherItemsToConsider}</h4>
                ${upsellCarousel}
            </div>`
        }

        if (data.alloySurcharge.priceUnit !== null) {
            alloySurchageString =`<tr>
                <td></td>
                <td>
                    <p><strong>${data.label.alloySurcharge}</strong></p>
                </td>
                <td></td>
                <td>
                    <p><strong>${data.alloySurcharge.price}/${data.item.qtySuffix}</strong></p>
                </td>
                <td>
                    <p><strong>${data.alloySurcharge.total}</strong></p>
                </td>
            </tr>`
        }


        let string = `<div class="atc-modal">
            <div class="atc-modal__summary">
                <h3 class="atc-modal__title"><span class="icon-selected"></span>1 ${data.label.addToCart}</h3>
                <div class="atc-modal__table-preview">
                    <img height="80" width="80" src="${data.item.image}" />
                    <div>
                        <p><strong>${data.item.title}</strong></p>
                        <p>MIC Wire | ED015790</p>    
                    </div>
                </div>
                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>${data.label.qty}</th>
                        <th>${data.label.price}</th>
                        <th>${data.label.total}</th>
                    </tr>
                    <tr>
                        <td><img height="80" width="80" src="${data.item.image}" /></td>
                        <td>
                            <p><strong>${data.item.title}</strong></p>
                            <p>${data.item.name} | ${data.item.sku}</p>    
                        </td>
                        <td>
                            <p><strong>${data.item.qtyValue} ${data.item.qtySuffix}</strong></p>
                        </td>
                        <td>
                            <p><strong>${data.item.price}/${data.item.qtySuffix}</strong></p>
                        </td>
                        <td>
                            <p><strong>${data.item.total}</strong></p>
                        </td>
                    </tr>
                    ${alloySurchageString}
                </table>
            </div>
            <div class="atc-modal__cart">
                <h4>Subtotal (${data.cartSubtotal.qty} ${data.label.items}): ${data.cartSubtotal.value} ${data.cartSubtotal.currency ? data.cartSubtotal.currency : ""}</h4>
                <p>${data.label.taxesAndShipping}</p>
                <div class="atc-modal__cart-cta">
                    <div>
                        <a href="${data.cartSubtotal.viewCartUrl}" title="${data.label.viewCart}" class="btn tertiary">${data.label.viewCart}</a>
                    </div>
                    <div>
                        <a href="${data.cartSubtotal.checkoutUrl}" title="${data.label.checkoutNow}" class="btn js-continue-shopping-cta">${data.label.checkoutNow}</a>
                    </div>
                </div>
                ${upsellShippingString}
            </div>
            ${upsellItemsString}
        </div>`;
        return string;
    }


    function openModal(data){

        let modal = document.createElement('div');
        modal.classList.add('modal', 'modal--add-to-cart',  'active');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = buildHtml(data);

        let modalClose = document.createElement('button');
        modalClose.classList.add('modal-close');
        modalClose.innerHTML = 'Close<span class="icon-close"></span>';
        modalClose.addEventListener('click', (e) => {
            closeModal();
            window.location.reload();
        });

        let overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        
        modal.appendChild(modalClose);
        modal.appendChild(modalContent);

        document.querySelector('body').classList.add('active-modal');
        document.querySelector('body').appendChild(overlay);
        document.querySelector('body').appendChild(modal);


        if (document.querySelector(".js-continue-shopping-cta")) {
            document.querySelector(".js-continue-shopping-cta").addEventListener("click", (e) => {
                e.preventDefault();
                closeModal();
                window.location.reload();
            })
        }

        const ADD_TO_CART_MODAL = document.querySelectorAll('.atc-modal__upsell');
        // ADD_TO_CART_MODAL
        if (ADD_TO_CART_MODAL.length) {
            //loop over the components nodelist
            for (let i = 0; ADD_TO_CART_MODAL.length > i; i++) {
            let el = ADD_TO_CART_MODAL[i];
            
            let primaryEl = el.querySelector('.swiper-container');
            let swiperWrapperChildrenCount = primaryEl.querySelector('.swiper-wrapper').childElementCount;
            let slidesPerView = 3;
            let spaceBetween = 24;
            if( matchMedia ) {
                const mq = window.matchMedia('(max-width: 1023px)');
                if (mq.matches){
                    slidesPerView = 1.6;
                    spaceBetween = 0;
                }
            }
            OPTIONS.addToCartModal.slidesPerView = slidesPerView;
            OPTIONS.addToCartModal.spaceBetween = spaceBetween;
            if (swiperWrapperChildrenCount > 3) {
                //init the swiper
                setTimeout(() => {
                INIT_SWIPER(primaryEl, OPTIONS.addToCartModal);
                }, 500);
            }
            }
        }
    }

    function closeModal(){
        document.querySelectorAll('.modal, .modal-overlay').forEach( i => i.remove());
        // document.querySelectorAll('.modal-overlay').forEach( i => i.remove());
        // this.closest('.modal').classList.remove('active');
        document.querySelector('body').classList.remove('active-modal');
        // document.querySelector('.modal-overlay').remove();
    }
}