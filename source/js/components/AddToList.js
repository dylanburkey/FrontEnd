const ADD_TO_LIST_SELECTS = document.querySelectorAll('.js-add-to-list-select');
const ADD_TO_LIST_CTA = document.querySelector('.js-add-to-list-submit');

const populateSelects = () => {
  for (const select of ADD_TO_LIST_SELECTS) {
    let lists = {};
    let endpoint = select.getAttribute("data-endpoint");
    fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(res => {
        lists = res.lists;
        let placeholder = select.getAttribute("data-placeholder");
        let options = `<option value="default">${placeholder}</option>`
        for (const list of lists){
          options += `<option value=${list.id}>${list.name}</option>`
        }
        let successMessage = document.createElement('div');
        successMessage.classList.add("add-to-list-success-message");
        successMessage.classList.add("js-add-to-list-success-message");
        select.closest(".js-add-to-list-wrapper").appendChild(successMessage);
        let selectElement = document.createElement('select');
        selectElement.classList.add("add-to-list-select");
        selectElement.innerHTML = options;
        select.appendChild(selectElement);
        select.querySelector('.add-to-list-select').addEventListener('change', handleSelectOnChange);
        select.closest('.js-add-to-list').querySelector('.js-add-to-list-submit').addEventListener('click', handleAddToList);
      })
      .catch(error => console.log(error, res.error))
  }
}

const handleAddToList = (e) => {
  let cta = e.target;
  let originalHTML = e.target.innerHTML;
  cta.setAttribute('disabled', 'disabled');
  if (cta.closest('.hero-product__quantity') && cta.closest('.hero-product__quantity').nextElementSibling){
    cta.closest('.hero-product__quantity').nextElementSibling.classList.add('disabled');
  }
  cta.innerHTML = cta.getAttribute('data-loading-label') ? cta.getAttribute('data-loading-label') : '...';
  let obj = {
    id: e.target.getAttribute("data-list-id"),
    sku: e.target.getAttribute("data-sku")
  }
  fetch(e.target.getAttribute('data-endpoint'), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.json())
  .then(data => {
      if(data.success == true){
        let successMessage = e.target.closest(".js-add-to-list-wrapper").querySelector(".js-add-to-list-success-message");
        successMessage.classList.add("add-to-list-success-message--success");
        successMessage.innerText = data.message;
      } else {
        successMessage.classList.add("add-to-list-success-message--error");
        successMessage.innerText = "Generic error";
      }
  })
  .catch(error => {
    console.log(error, obj);
    let successMessage = e.target.closest(".js-add-to-list-wrapper").querySelector(".js-add-to-list-success-message");
    successMessage.classList.add("add-to-list-success-message--error");
    successMessage.innerText = "Generic error";
  })
  .finally(res => {
    cta.removeAttribute('disabled');
    if (cta.closest('.hero-product__quantity') && cta.closest('.hero-product__quantity').nextElementSibling){
        cta.closest('.hero-product__quantity').nextElementSibling.classList.remove('disabled');
    }
    cta.innerHTML = originalHTML;
});
}

const handleSelectOnChange = (e) => {
  if (e.target.value !== "default") {
    e.target.closest(".js-add-to-list").querySelector('.js-add-to-list-submit').setAttribute("data-list-id", e.target.value);
    e.target.closest(".js-add-to-list").querySelector('.js-add-to-list-submit').removeAttribute("disabled");
  } else {
    e.target.closest(".js-add-to-list").querySelector('.js-add-to-list-submit').setAttribute("disabled", "disabled");
  }
}


if (ADD_TO_LIST_SELECTS && ADD_TO_LIST_CTA) {
  window.addEventListener("load", populateSelects);
}