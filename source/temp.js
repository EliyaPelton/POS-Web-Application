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