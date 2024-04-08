window.addEventListener("DOMContentLoaded", () => {
    // (A) FILE PICKER
    const picker = document.getElementById("demo");
  
    // (B) READ SELECTED CSV FILE
    picker.onchange = () => {
      let reader = new FileReader();
      reader.addEventListener("loadend", () => {
        // (B1) PARSE INTO ARRAY
        let data = CSV.parse(reader.result);
  
        // (B2) ADD NEW ROWS
        data.push(["A", "B"]); // APPEND
        data.unshift(["C", "D"]); // PREPEND
        data.splice(4, 0, ["E", "F"]); // INSERT
  
        // (B3) INSERT BEFORE "JOE DOE"
        let at = 0;
        for (let [i,r] of Object.entries(data)) {
          if (r.includes("Joe Doe")) { at =i; break; }
        }
        data.splice(at, 0, ["G", "H"]);
  
        // (B4) "CLEAN" CSV DATA
        // credit : https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
        data = data.map(row => row
          .map(String) // convert to string
          .map(v => v.replaceAll('"', '""')) // escape double quotes
          .map(v => `"${v}"`) // quote
          .join(",") // comma-separated
        ).join("\r\n"); // new line
  
        // (B5) FORCE DOWNLOAD
        var blob = new Blob([data], { type: "text/csv;charset=utf-8;" }),
            url = URL.createObjectURL(blob),
            a = document.createElement("a");
        a.href = url;
        a.setAttribute("download", "updated.csv");
        a.click();
        URL.revokeObjectURL(url);
        a.remove();
        picker.value = "";
      });
      reader.readAsText(picker.files[0]);
    };
  });


/*
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
    link.setAttribute("download", "form-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



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
    link.setAttribute("download", "form-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
*/


/*function exportF() {
    //Format your table with form data

    var html = document.getElementById("text1").value + document.getElementById("text2").value;
  
    var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    var link = document.getElementById("downloadLink");
    link.setAttribute("href", url);
    link.setAttribute("download", "export.xml"); // Choose the file name
    link.click(); // Download your excel file   
    return false;
  }*/
  


/*
$('#completeCartTable > tbody').empty();
    $('#completeCartTable > tfoot').empty();
    var rows = $('#cartItems').find('tbody > tr');
    $('#cartItems').find('tbody > tr').each(function () {
        var index = 0;
        var newRow = '';
        var lineItem = new Object();
        $(this).find('td').each(function () {
            if (index == 0) {
                lineItem['desc'] = $(this).context.innerHTML;
            }
            else
                if (index == 1) {
                    lineItem['qty'] = $(this).context.innerHTML;
                }
                else
                    if (index == 2) {
                        var amount = $(this).context.innerHTML;
                        lineItem['amount'] = amount;
                    }
                    else
                        if (index == 4) {
                            var sku = $(this).context.innerHTML;
                        }
                        else
                            if (index == 5) {
                                var price = $(this).context.innerHTML;
                                lineItem['price'] = price;
                            }
                            else
                                if (index == 7) {
                                    if ('no' == 'yes') {
                                        lineItem['backorder'] = $(this).context.innerHTML;
                                    }
                                }
            index++;
        });
        newRow = '<tr>';
        newRow += '<td>' + lineItem["desc"] + '</td>';
        newRow += '<td>' + formatCurrencyNoDollarSign(lineItem["price"]) + '</td>';
        newRow += '<td>' + lineItem["qty"] + '</td>';
        newRow += '<td>' + lineItem["amount"] + '</td>';
        if ('no' == 'yes') {
            newRow += '<td>' + lineItem["backorder"] + '</td>';
        }
        newRow += '</tr>';

        $('#completeCartTable > tbody').append(newRow);
    });



//Lines 938-1009
    $('.speedSpreadCalcBtn').click(function () {
        showSpinner('Dark');
        var data = new Object();
        var cart = new Array();
        $('#cartItems').find('tbody > tr').each(function () {
            var index = 0;
            var sku = '';
            var qty = '';
            var price = '';
            var amount = '';
            var commVals = '';
            $(this).find('td').each(function () {
                if (index == 1) {
                    qty = $(this).context.innerHTML;
                }
                else
                    if (index == 2) {
                        amount = $(this).context.innerHTML;
                    }
                    else
                        if (index == 4) {
                            sku = $(this).context.innerHTML;
                        }
                        else
                            if (index == 5) {
                                price = $(this).context.innerHTML;
                            }
                            else
                                if (index == 8) {
                                    commVals = $(this).context.innerHTML;
                                }
                index++;
            });
            var temp = new Object();
            temp["sku"] = sku;
            temp["qty"] = qty;
            temp["amount"] = amount;
            temp["price"] = price;
            temp["commVals"] = commVals;
            if ('1GE' == sku) {
                var cartPrice = parseFloat(price);
                var entryPrice = parseFloat($('#' + 'F141B65179A64B719366039779DB8582' + '-price').val().replace(/,/g, ''));
                var cartQty = qty;
                var entryQty = $('#' + 'F141B65179A64B719366039779DB8582' + '-qty').val();

                if (cartPrice != entryPrice || cartQty != entryQty) {
                    cart.push(temp);
                }
            }
            else {
                cart.push(temp);
            }
        });
        data["cart"] = cart;
        data["currentItemSku"] = '1GE';
        data["currentPrice"] = $('#' + 'F141B65179A64B719366039779DB8582' + '-price').val();
        data["currentQty"] = $('#' + 'F141B65179A64B719366039779DB8582' + '-qty').val();
        data["commPercent"] = '0';
        data["currentSplit"] = '100';

        if (isIRATrade == "yes") {
            data["dealType"] = "IRA";
        }
        else {
            data["dealType"] = "cash";
        }

        if (data["currentQty"] == '') {
            $('#' + 'F141B65179A64B719366039779DB8582' + '-qty').focus();
            hideSpinner();
            return false;
        }
        */

        //All of this is for adding item to the inventory
/*
const categoryList = document.querySelectorAll('#search_inventory_section .category');
const itemList = document.querySelectorAll('#search_inventory_section .category');
const inventoryData = [];
let currentItem = {};

//categoryList[
    //itemList[
        //itemObj{
            //sku
            //desc
            //price
            //img
        //}
    //]
//]
//sku, desc, price, image

function addItemToInventory() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
  }


function initializeIventory() {
    for (const item of inventoryList) {
        const itemObj = {
            id: `${Date.now()}`,
            sku: ``,
            desc: `description`,
            qty: inputQty.value,
            price: inputPrice.value,
            amount: inputQty.value*inputPrice.value
          };
    }
}

$('#search_inventory_section').find('tbody > tr').each(function () {
    var index = 0;
    var sku = '';
    var qty = '';
    var price = '';
    var amount = '';
    var commVals = '';
    $(this).find('td').each(function () {
        if (index == 1) {
            qty = $(this).context.innerHTML;
        }
        else
            if (index == 2) {
                amount = $(this).context.innerHTML;
            }
            else
                if (index == 4) {
                    sku = $(this).context.innerHTML;
                }
                else
                    if (index == 5) {
                        price = $(this).context.innerHTML;
                    }
                    else
                        if (index == 8) {
                            commVals = $(this).context.innerHTML;
                        }
        index++;
    });
    var temp = new Object();
    temp["sku"] = sku;
    temp["qty"] = qty;
    temp["amount"] = amount;
    temp["price"] = price;
    temp["commVals"] = commVals;

//UPDATE ITEM AMOUNT FEATURE of "item_display_section" of Sale & Purchase Pages
function updateItemDisplayAmount() {
  itemDisplayAmount.innerText = inputQty.value*inputPrice.value;
}

//ID (lineitem differentiator), SKU (item differentiator), description (based on SKU), qty, price, amount
function addToCart() {
  const dataArrIndex = cartData.findIndex((item) => item.id === currentLineItem.id);
  const itemObj = {
    id: `${Date.now()}`,
    sku: ``,
    desc: `description`,
    qty: inputQty.value,
    price: inputPrice.value,
    amount: inputQty.value*inputPrice.value
  };

  if (dataArrIndex === -1) {
    cartData.push(itemObj);
  }

};


$('.speedSpreadCalcBtn').click(function () {
    showSpinner('Dark');
    var data = new Object();
    var cart = new Array();
    $('#cartItems').find('tbody > tr').each(function () {
        var index = 0;
        var sku = '';
        var qty = '';
        var price = '';
        var amount = '';
        var commVals = '';
        $(this).find('td').each(function () {
            if (index == 1) {
                qty = $(this).context.innerHTML;
            }
            else
                if (index == 2) {
                    amount = $(this).context.innerHTML;
                }
                else
                    if (index == 4) {
                        sku = $(this).context.innerHTML;
                    }
                    else
                        if (index == 5) {
                            price = $(this).context.innerHTML;
                        }
                        else
                            if (index == 8) {
                                commVals = $(this).context.innerHTML;
                            }
            index++;
        });
        var temp = new Object();
        temp["sku"] = sku;
        temp["qty"] = qty;
        temp["amount"] = amount;
        temp["price"] = price;
        temp["commVals"] = commVals;
        if ('1GE' == sku) {
            var cartPrice = parseFloat(price);
            var entryPrice = parseFloat($('#' + 'F141B65179A64B719366039779DB8582' + '-price').val().replace(/,/g, ''));
            var cartQty = qty;
            var entryQty = $('#' + 'F141B65179A64B719366039779DB8582' + '-qty').val();

            if (cartPrice != entryPrice || cartQty != entryQty) {
                cart.push(temp);
            }
        }
        else {
            cart.push(temp);
        }
    });

    */