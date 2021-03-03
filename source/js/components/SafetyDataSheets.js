let checkboxes = document.getElementsByName("alert-checkbox");
let table = document.getElementById('js-sds-table');

// initially disable all checkboxes 
// do this until the Formstack iframe loads
if (checkboxes.length) {
  for (const checkbox of checkboxes) {
    checkbox.setAttribute("disabled", "true");
  }
}

//check if results are displayed and scroll to results
let results = document.querySelectorAll('[data-result="true"]');
if (results && results[0]) {
  results[0].scrollIntoView();
}

// hide the footer when the "X" icon is clicked
let hideFooterCTA = document.getElementById("js-hide-footer");
if (hideFooterCTA) {
  hideFooterCTA.addEventListener("click", ()=> {
    if (document.getElementsByClassName('safety-data-sheets__footer--active')[0]) {
      document.getElementsByClassName('safety-data-sheets__footer--active')[0].className = "safety-data-sheets__footer";
    }
  })
} 

// capture the iframe document
let iframe  = document.getElementById("ffEmbedFrame");
if (iframe){
  // only do logic once the iframe has been loaded
  iframe.addEventListener("load", () => {
    let iframeDocument = document.getElementById("ffEmbedFrame").contentDocument;
    if (iframeDocument){
      // if the iframe has loaded, enable the checkboxes
      if (checkboxes.length) {
        for (const checkbox of checkboxes) {
          checkbox.removeAttribute("disabled");
        }
      }
      footerLogic();
    }
  })
}

function footerLogic() {
  if (checkboxes.length) {
    //construct an array of selected items 
    let selectedItems = [];
    let checkBoxInitialClicked = false;
    let textarea;
    for (const checkbox of checkboxes) {
      checkbox.addEventListener('change', function () {
        // initiate textarea on first checkbox checked
        if (!checkBoxInitialClicked){
          textarea = document.getElementById("ffEmbedFrame").contentDocument.getElementById("ML_Form_Submission__c.Additional_Details__c");
          checkBoxInitialClicked = true;
        }
        let currentCheckbox = this;
        //add items to array or delete items from array based on checkboxes
        if (this.checked) {
          selectedItems.push(currentCheckbox.value);
        } else {
          selectedItems.splice(selectedItems.indexOf(currentCheckbox.value), 1);
        }
        //transform selectedItems array into a comma delimited string to be passed to FormstackForm
        let concatenatedString = selectedItems.join(",");

        //dynamically show the footer based on the state of checkboxes
        //populate Formstack Form textarea
        if (selectedItems.length !== 0 || this.checked) {
          // show the footer
          if (document.getElementsByClassName('safety-data-sheets__footer')[0]) {
            document.getElementsByClassName('safety-data-sheets__footer')[0].className += "--active";
          }
          if (textarea) {
            textarea.value = concatenatedString;
          }
        } else {
          // hide the footer
          if (document.getElementsByClassName('safety-data-sheets__footer--active')[0]) {
            document.getElementsByClassName('safety-data-sheets__footer--active')[0].className = "safety-data-sheets__footer";
          }
          if (textarea) {
            textarea.value = concatenatedString;
          }
        }
      })
    }
  }
}

function sortTable(table, col, reverse, l) {
  let tb = table.tBodies[0];
  let tr = Array.prototype.slice.call(tb.rows, 0);
  reverse = -((+reverse) || -1);

  // first elimiate active classs from each th sort arrows
  for (let i = 1; i < l; i++) {
    let idUp = `js-sds-table-sort-up-${i}`;
    let idDown = `js-sds-table-sort-down-${i}`;
    document.getElementById(`${idUp}`).className = "safety-data-sheets__sort-up";
    document.getElementById(`${idDown}`).className = "safety-data-sheets__sort-down";
  }

  // construct the IDs of the sorting arrows of the th that has been clicked on
  let idUp = `js-sds-table-sort-up-${col+1}`;
  let idDown = `js-sds-table-sort-down-${col+1}`;

  // decide which arrow should have an active class
  // eliminate active on the other arrow
  if (reverse === 1) {
    document.getElementById(`${idUp}`).className += " active";
    document.getElementById(`${idDown}`).className = "safety-data-sheets__sort-down";
  } else {
    document.getElementById(`${idDown}`).className += " active";
    document.getElementById(`${idUp}`).className = "safety-data-sheets__sort-up";
  }

  // sort the table 
  tr = tr.sort(function (a, b) {
    return reverse *
      (a.cells[col].textContent.trim()
        .localeCompare(b.cells[col].textContent.trim())
      );
  });
  for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]);
}

function makeTableSortable() {
  let th = table.tHead.rows[0].cells;

  // make each th sortable 
  // except the last th - Alerts column 
  let i = th.length - 1;

  while (--i >= 0)(function (i) {
    let dir = 1;
    th[i].addEventListener('click', function () {
      sortTable(table, i, (dir = 1 - dir), th.length)
    });
  }(i));
}

if (table) {
  let th = table.tHead.rows[0].cells;
  sortTable(table, 0, 1,th.length);
  makeTableSortable();
}