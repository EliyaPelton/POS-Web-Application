/* ********************************** */
/* ***** SEARCH MATCHES DROPDOWN **** */
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


/* ********************************** */
/* ********* SEARCH CUSTOMER ******** */
/* ********************************** */

//Customer Info: lastName, firstName, id, exp, dob, address, city, state, zip
const searchCustomerInput = document.getElementById("search_customer_input");
var filePath = 'customerData.json';
var dataArr = {};
var matchArr = {};

//Read JSON file, store contents to dataArr
$(function() { 
    $.getJSON(filePath).done(function(data) {
        dataArr = data;
        console.log(dataArr[0].lastName);
    }).fail(function(data) {
        console.log('no results found');
    });
});

//Match JSON data to search input
$("#search_customer_input").on('input', function() { 
  var searchName = $(this).val().toLowerCase();
  if (searchName !== '') {
    matchArr = dataArr.filter(function(data) {
      //Look for the entry with a matching `lastName or firstName` value
      concactenatedData = data.lastName + data.firstName;
      return (concactenatedData.toLowerCase().indexOf(searchName) !== -1)}
    );
  } else {
    //Don't count an empty input as a match
    matchArr = {};
    closeMatchesFunction();
  }


  //Add matches to popup dropdown//
  //Reset dropdown
  matchesDropdown.innerHTML = `
  <div id="close_matches_dropdown" onclick="closeMatchesFunction()">x</div>
  `;
  //Check if any matches are made
  if (Object.keys(matchArr).length !== 0) {
    matchArr.forEach(
      ({ lastName, firstName }) => {
        (matchesDropdown.innerHTML += `
        <li class="matches_dropdown_option" onclick="populateCustomer()">${lastName}, ${firstName}</li>
        `)
      }
    );
  } else {
    matchesDropdown.innerHTML += `
        <li class="matches_dropdown_option">No results found</li>
        `
  };
  
});


//TODO: Write to populate screen with customer info
function populateCustomer() {
  console.log("code to populate customer info is coming");
  closeMatchesFunction();
  //insert code
};


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



/*

//url: https://www.skillsugar.com/how-to-read-a-json-file-with-jquery
 $.getJSON(filePath, function (data) {
    $.each(data, function (key, val) {
      //Checkpoint
        console.log(val['country']);
    });
  });


//url: https://stackoverflow.com/questions/34255181/how-to-search-in-json-file
// Variable to hold the locations
var dataArr = {};
// Load the locations once, on page-load.
$(function() { 
    $.getJSON( "api/videoData.js").done(function(data) {
        window.dataArr = data.pages;
    }).fail(function(data) {
        console.log('no results found');
        //window.dataArr = testData; // remove this line in non-demo mode
    });
});
// Respond to any input change, and show first few matches
$("#search_customer_input").on('keypress keyup change input', function() { 
    var arrival = $(this).val().toLowerCase();
    $('#matches').text(!arrival.length ? '' : 
        dataArr.filter(function(place) {
            // look for the entry with a matching `code` value
            return (place.title.toLowerCase().indexOf(arrival) !== -1);
        }).map(function(place) {
            // get titles of matches
            return place.title;
        }).join('\n')); // create one text with a line per matched title
});*/



/* ********************************** */
/* ******* SAVE CUSTOMER DATA ******* */
/* ********************************** */

//Data names: fname, lname, id, exp, dob, address, city, state, zip
function exportToExcel() {
    // Get the form data
    var formData = document.forms["myForm"].elements;
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
  }

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