/* ********************************** */
/* *********** POPUP MODAL ********** */
/* ********************************** */
const modalContent = document.querySelector(".modal_content");
const openModal = document.querySelector(".open_modal");
var closeModal = document.getElementsByClassName("close_modal");
const blurBg = document.querySelector(".blur_bg");

function openModalFunction() {
  modalContent.classList.remove("hidden_modal");
  blurBg.classList.remove("hidden_blur");
}

let closeModalFunction = function () {
  modalContent.classList.add("hidden_modal")
  blurBg.classList.add("hidden_blur")
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape"
     && !modalContent.classList.contains("hidden")
   ) {
        closeModalFunction();
    }
});

for (var i = 0; i < closeModal.length; i++) {
  closeModal[i].addEventListener("click", closeModalFunction);
}

openModal.addEventListener("click", openModalFunction);
blurBg.addEventListener("click", closeModalFunction);


/* ********************************** */
/* ******* SAVE CUSTOMER DATA ******* */
/* ********************************** */
//Data names: fname, lname, id, exp, dob, address, city, state, zip

//Update dataArr with new localStorage data
function updateCustomerInfoArray() {
  for (var i = 0; i < localStorage.length; i++){
    dataArr[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
  }
}

function exportData() {
  var inputArr = document.getElementsByClassName("customer_popup_input");

  var custInfoObj = {
    fname: `${inputArr[0].value}`,
    lname: `${inputArr[1].value}`,
    id: `${inputArr[2].value}`,
    exp: `${inputArr[3].value}`,
    dob: `${inputArr[4].value}`,
    address: `${inputArr[5].value}`,
    city: `${inputArr[6].value}`,
    state: `${inputArr[7].value}`,
    zip: `${inputArr[8].value}`
  };

  localStorage.setItem(`${Date.now()}`, JSON.stringify(custInfoObj));

  updateCustomerInfoArray();
}


/* ********************************** */
/* ********* SEARCH CUSTOMER ******** */
/* ********************************** */
//Customer Info: lname, fname, id, exp, dob, address, city, state, zip
const searchCustomerInput = document.getElementById("search_customer_input");
var filePath = 'customerData.json';
var dataArr = [];
var matchArr = {};

//Read localStorage and save all objects to dataArr onload
updateCustomerInfoArray();

//Match JSON data to search input
$("#search_customer_input").on('input', function() { 
  var searchName = $(this).val().toLowerCase();
  //if statement so that we don't count an empty input as a match
  if (searchName !== '') {
    matchArr = dataArr.filter(function(data) {
      //Look for the entry with a matching `lname or fname` value
      concactenatedData = String(data.lname + data.fname);
      return (concactenatedData.toLowerCase().indexOf(searchName) !== -1)
    });
  } else {
    matchArr = {};
    closeMatchesFunction();
  }

  //Add matches to popup dropdown//
  matchesDropdown.innerHTML = `
  <div id="close_matches_dropdown" onclick="closeMatchesFunction()">x</div>
  `; //Reset dropdown

  //Check if any matches are made
  if (Object.keys(matchArr).length !== 0) {
    matchArr.forEach(
      ({ fname, lname, id, exp, dob, address, city, state, zip }) => {
        (matchesDropdown.innerHTML += `
        <li value="1" class="matches_dropdown_option" onclick="populateCustomer('${fname}', '${lname}', '${id}', '${exp}', '${dob}', '${address}', '${city}', '${state}', '${zip}')">${lname}, ${fname}</li>
        `)
      }
    );
  } else {
    matchesDropdown.innerHTML += `
        <li class="matches_dropdown_option">No results found</li>
        `
  };
  
});

//Display selected customer Info
const displayFullName = document.getElementById("display_full_name");
const displayAddress = document.getElementById("display_address");
const displayId = document.getElementById("display_id");
const displayExp = document.getElementById("display_exp");
const displayDob = document.getElementById("display_dob");

//Display selected customer
function populateCustomer(fname, lname, id, exp, dob, streetAddress, city, state, zip) {
  const fullName = fname + " " + lname;
  const address = "\n" + city + ", " + state+ ", " + zip;

  displayFullName.innerText = fullName;
  displayAddress.innerText = streetAddress + address;
  displayId.innerText = id;
  displayExp.innerText = exp;
  displayDob.innerText = dob;

  changeSelectedCustomerLocalStorage(fullName, streetAddress, address, id, exp, dob);
};

//Selected customer empty on page load
function clearSelectedCustomer() {
  displayFullName.innerText = "";
  displayAddress.innerText = "";
  displayId.innerText = "";
  displayExp.innerText = "";
  displayDob.innerText = "";

  changeSelectedCustomerLocalStorage("", "", "", "", "", "");
};

clearSelectedCustomer();

//Save selected customer info to localStorage for use on Purchase Page
function changeSelectedCustomerLocalStorage(nameParam, streetAddressParam, addressParam, idParam, expParam, dobParam) {
  const storedCurrentCustomer = {
    name: nameParam,
    streetAddress: streetAddressParam,
    address: addressParam,
    id: idParam,
    exp: expParam,
    dob: dobParam
  };
  console.log(storedCurrentCustomer);
  localStorage.setItem("selectedCustomer", JSON.stringify(storedCurrentCustomer));
};


/* ********************************** */
/* ************ DROPDOWN ************ */
/* ********************************** */
const matchesDropdown = document.getElementById("matches_dropdown");
const closeMatchesDropdown = document.getElementById("close_matches_dropdown");

function openMatchesFunction() {
  console.log("open dropdown");
  matchesDropdown.classList.remove("hidden_matches");
}

function closeMatchesFunction() {
  console.log("close modal");
  if (!matchesDropdown.classList.contains("hidden_matches")) {
    matchesDropdown.classList.add("hidden_matches");
  }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape"
     && !matchesDropdown.classList.contains("hidden")
   ) {
        closeMatchesFunction();
    }
});

function redirectToPurchase() {
  const currentCustomer = JSON.parse(localStorage.getItem("selectedCustomer"));
  if (currentCustomer.name !== "") {
  window.location.href = "./purchase.html"
  } else {
    alert("Customer must be selected before entering purchase order");
  }
}




/* ********************************** */
/* ************* DELETE ************* */
/* ********************************** */

//Read JSON file, store contents to dataArr
/*
$(function() { 
    $.getJSON(filePath).done(function(data) {
        dataArr = data;
    }).fail(function(data) {
        console.log('no results found');
    });
});*/

/*
function objectifyForm() {
  //serialize data function
  var returnArray = {};
  for (var i = 0; i < inputCategoryArr.length; i++){
      returnArray[inputCategoryArr[i]['name']] = inputCategoryArr[i]['value'];
  }
  console.log(inputCategoryArr);
  return returnArray;
}

function exportData() {
  console.log(inputCategoryArr);
  objectifyForm();
};*/
    /*
    var csvData = [];

    // Get the field names
    var fieldNames = [];
    for (var i = 0; i < formData.length; i++) {
      fieldNames.push(formData[i].name);
    }
    
    // Add the field names to the CSV data
    csvData.push('"' + fieldNames.join('","') + '"');
  
    // Loop through the form fields and build the CSV data
    var row = [];
    for (var i = 0; i < formData.length; i++) {
      var fieldValue = formData[i].value;
      fieldValue = fieldValue.replace(/"/g, '""');
      row.push('"' + fieldValue + '"');
    }
    
    // Add the row to the CSV data
    csvData.push(row.join(","));
  
    // Convert the CSV data to a string and encode it for download
    var csvString = csvData.join("\n");
    var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvString);
  
    // Create a temporary link element and click it to trigger the download
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customer_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }*/

  /*
function exportF() {
    //Format your table with form data
    document.getElementById("input").innerHTML = document.getElementById("text").value;
  
    var table = document.getElementById("table");
    var html = table.value;
  
    var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    var link = document.getElementById("downloadLink");
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv"); // Choose the file name
    link.click(); // Download your excel file   
    return false;
}*/

/*
function SubForm (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/410/',
        type:'post',
        data:$("#customer_popup_form").serializeArray(),
        success: function(){
          alert("Form Data Submitted :)")
        },
        error: function(){
          alert("There was an error :(")
        }
    });
}
*/

/*function WriteToFile(passForm) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fileLoc = "./sample.csv";
    var file  = fso.OpenTextFile(fileLoc, 8, true,0);
    file.writeline(passForm.fname.value + ',' +
             passForm.lname.value + ',' +
             passForm.id.value + ',' +
             passForm.exp.value + ',' +
             passForm.dob.value + ',' +
             passForm.address.value + ',' +
             passForm.city.value + ',' +
             passForm.state.value + ',' +
             passForm.zip.value);
    file.Close();
    alert('File created successfully at location: ' + fileLoc);
  }*/