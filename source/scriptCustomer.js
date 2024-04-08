
//Popup Modal
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

//Save Data to Excel File
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