let fillerMetalCertificationForm = document.querySelector(".filler-metal-certification__customized-cert-form");

if (fillerMetalCertificationForm) {
  fillerMetalCertificationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (fillerMetalCertificationForm.querySelector('.js-customized-cert-form-product-input') && fillerMetalCertificationForm.querySelector(".js-customized-cert-form-product-select") && fillerMetalCertificationForm.querySelector('.js-customized-cert-form-code-input-1') && fillerMetalCertificationForm.querySelector(".js-customized-cert-form-code-input-2") && document.querySelector(".filler-metal-certification__error-message")) {
      let productInputValue = fillerMetalCertificationForm.querySelector('.js-customized-cert-form-product-input').value;
      let productSelectValue = fillerMetalCertificationForm.querySelector(".js-customized-cert-form-product-select").value;
      let codeInputValue = fillerMetalCertificationForm.querySelector(".js-customized-cert-form-code-input-1").value;
      let codeSelectValue = fillerMetalCertificationForm.querySelector(".js-customized-cert-form-code-input-2").value;
      if ((productInputValue !== "default" && productSelectValue !== "default") || (codeInputValue !== "" && codeSelectValue !== "")) {
        if (productInputValue !== "default" && productSelectValue !== "default") {
          fillerMetalCertificationForm.querySelector('.js-customized-cert-form-product-input').classList.add("filler-metal-certification__dropdown-select--error");
          fillerMetalCertificationForm.querySelector(".js-customized-cert-form-product-select").classList.add("filler-metal-certification__dropdown-select--error");
          document.querySelector(".filler-metal-certification__error-message").classList.add("active");
          document.querySelector(".filler-metal-certification__error-message").scrollIntoView();
        } else if (codeInputValue !== "" && codeSelectValue !== "") {
          fillerMetalCertificationForm.querySelector('.js-customized-cert-form-code-input-1').classList.add("input-error");
          fillerMetalCertificationForm.querySelector('.js-customized-cert-form-code-input-2').classList.add("input-error");
          document.querySelector('.filler-metal-certification__error-message').classList.add("active");
          document.querySelector('.filler-metal-certification__error-message').scrollIntoView();
        }
      } else event.target.submit();
    }
  })
}