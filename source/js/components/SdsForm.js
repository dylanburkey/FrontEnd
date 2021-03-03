let sdsform = document.getElementsByClassName('sds-forms');
let forms = document.getElementsByClassName("sds-forms__form");
let safetyDataSheetForm = document.querySelector(".js-safety-data-sheets-form");

if (sdsform) {
  let formRadios = document.getElementsByClassName("js-sds-forms-radio-inputs");
  for (const radio of formRadios) {
    if (radio.dataset.id === "1") {
      radio.checked = true;
      for (const form of forms){
        if (form.dataset.id ==="1") {
          form.className += " active";
        }
      }
    }
    radio.addEventListener("click", function(){
      console.log(radio.dataset.id)
      let forms = document.getElementsByClassName("sds-forms__form");
      if (forms && radio.checked){
        for (const form of forms){
          form.className = "sds-forms__form";
        }
        for (const form of forms){
          if (radio.dataset.id === form.dataset.id){
            form.className += " active";
          } 
        }
      }
    })
  }
}

if (safetyDataSheetForm) {
  safetyDataSheetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (safetyDataSheetForm.querySelector('.sds-forms__forms-input-type-text') && safetyDataSheetForm.querySelector(".sds-forms__dropdown-select") && safetyDataSheetForm.querySelector(".sds-forms__error-message")) {
      let inputValue = safetyDataSheetForm.querySelector('.sds-forms__forms-input-type-text').value;
      let selectValue = safetyDataSheetForm.querySelector(".sds-forms__dropdown-select").value;
      if (inputValue !== "" && selectValue !== "default") {
        safetyDataSheetForm.querySelector('.sds-forms__forms-input-type-text').classList.add("sds-forms__forms-input-type-text--error");
        safetyDataSheetForm.querySelector(".sds-forms__dropdown-select").classList.add("sds-forms__dropdown-select--error");
        safetyDataSheetForm.querySelector(".sds-forms__error-message").classList.add("active");
        safetyDataSheetForm.querySelector(".sds-forms__error-message").scrollIntoView();
      } else event.target.submit();
    }
  })
}