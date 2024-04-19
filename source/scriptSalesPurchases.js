/* ********************************** */
/* ******* Section #1: SEARCH ******* */
/* ********************************** */

//DROPDOWN FEATURE of "search_inventory_section" section of Sale & Purchase Pages
var coll = document.getElementsByClassName("collapsible");

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");  //EVENT LISTENER
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//Function to search inventory items with search bar
function searchInventory() {
  //Initially hide everything, only those that match the search input will reappear
  for (i = 0; i < coll.length; i++) {
    coll[i].style.display = "none";
  }

  //Declare variables
  var input, filter, searchInventorySection, cnt;
  input = document.getElementById("search_inventory_input");
  filter = input.value.toUpperCase();
  searchInventorySection = document.getElementById("search_inventory_section");
  cnt = searchInventorySection.getElementsByClassName("content");

  //Loop through all list items
  for (i = 0; i < cnt.length; i++) {
    cnt[i].style.display = "block";
    var btn = cnt[i].getElementsByTagName("button");
    for (j = 0; j < btn.length; j++) {
      itm = btn[j];
      if (itm.innerHTML.toUpperCase().indexOf(filter) > -1) {
        itm.style.display = "block";
      } else {
        itm.style.display ="none";
      };
    };
  };

  //Reset view when input is deleted
  if (filter === "") {
    for (i = 0; i < coll.length; i++) {
      for (j = 0; j < cnt.length; j++) {
        cnt[j].style.display = "none";
      };
      coll[i].style.display = "block";
    };
  };

}


/* ********************************** */
/* ******* Section #2: DISPLAY ****** */
/* ********************************** */
//Function to display a picture of the inventory item
var itemBtn = document.getElementsByClassName("item_btn");

function displayItem() {
  const itemArrIndex = inventoryData.findIndex((item) => item.sku === this.id);

  itemDisplayProductName.innerText = inventoryData[itemArrIndex].desc;
  currentLineItem.sku = inventoryData[itemArrIndex].sku;
  currentLineItem.desc = inventoryData[itemArrIndex].desc;
  inputQty.value = 1;
  inputPrice.value = inventoryData[itemArrIndex].price;
  updateItemDisplayAmount()

  r = document.querySelector(':root');
  r.style.setProperty('--image_path', `url("${inventoryData[itemArrIndex].img}")`);
}

//EVENT LISTENERS
for (var i = 0; i < itemBtn.length; i++) {
  itemBtn[i].addEventListener("click", displayItem);
}


/* ********************************** */
/* ******** Section #3: CART ******** */
/* ********************************** */ 

//Declare variables
const addToCartBtn = document.getElementById('btn_add_to_cart');
const inputQty = document.getElementById("qty");
const inputPrice = document.getElementById("price");
const itemDisplayAmount = document.getElementById("item_display_amount");
const cartContainer = document.getElementById("cart_container");
const cartTotalDisplay = document.getElementById("cart_total_amount");
const itemDisplayProductName = document.getElementById("item_display_product_name");

let cartTotal = 0;
let cartData = [];
let currentLineItem = {};
//currentLineItem object: id (unique line item id), sku (item id), desc, qty, price

function addToCart() {
  //Searching for currentLineItem.id will allow us to add an "edit" feature in the future.
  //The item being edited will be the set to the currentLineItem.
  //If an item is being edited and not added for the first time, then we can make sure it is not pushed to the cartData.
  //Instead of pushing a new item to cartData, it should just replace the existing array entry.
  const dataArrIndex = cartData.findIndex((item) => item.id === currentLineItem.id);
  const itemObj = {
    id: `${Date.now()}`,
    sku: `${currentLineItem.sku}`,
    desc: `${currentLineItem.desc}`,
    qty: inputQty.value,
    price: inputPrice.value,
    amount: inputQty.value*inputPrice.value
  };

  if (dataArrIndex === -1) {
    cartData.push(itemObj);
  }

  updateCartHTML();
  updatePDF();
  currentLintItem = {}; //Only necessary when we add the "edit" feature
};

function updateCartHTML() {
  cartContainer.innerHTML = "";
  cartTotal = 0;

  cartData.forEach(
    ({ id, sku, desc, qty, price, amount }) => {
      (cartContainer.innerHTML += `
      <tr>
        <td class="cart_cell">${desc}</td>
        <td class="cart_cell">${qty}</td>
        <td class="cart_cell">$${amount}</td>
        <td class="cart_cell">
            <button class="delete_btn" onclick="deleteItem(this)" type="button"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
      `)
      cartTotal += amount;
    }
  );

  cartTotalDisplay.innerText = `$${cartTotal}`;
};

function calculateTotal() {
  cartTotal = 0;
  cartData.forEach(({amount}) => {cartTotal += amount;});
  cartTotalDisplay.innerText = `$${cartTotal}`;
}

function updateItemDisplayAmount() {
  itemDisplayAmount.innerText = "$" + inputQty.value*inputPrice.value;
}

const deleteItem = (buttonEl) => {
  const itemArrIndex = cartData.findIndex((item) => item.id === buttonEl.parentElement.id);

  buttonEl.parentElement.parentElement.remove();
  cartData.splice(itemArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(cartData));

  calculateTotal();
};

function resetAll() {
  cartContainer.innerHTML = '';
  cartData = [];
  calculateTotal();
};

//EVENT LISTENERS
addToCartBtn.addEventListener("click", addToCart);


/* ********************************** */
/* ********** GENERATE PDF ********** */
/* ********************************** */ 
const invoiceCellContainer = document.getElementById("invoice_cell_container");
const invoiceTotalDisplay = document.getElementById("invoice_total_amount");
const invoiceHeader = document.getElementById("invoice_header");
const invoiceCustomerInfo = document.getElementById("invoice_customer_info");


function confirm() {
  printPDF();
  resetAll();
}

function printPDF() {
  addCustomerInfoToPDF();
  showPDF();
  generatePDF();
  myTimeout = setTimeout(hidePDF, 1);
}

function showPDF() {
  const containerContent = document.querySelector(".pdf_container");
  containerContent.classList.remove("hidden_pdf");
}

function hidePDF() {
  const containerContent = document.querySelector(".pdf_container");
  containerContent.classList.add("hidden_pdf");
}

function invoiceDate() {
  const currentDate = new Date();
  const dateStr = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  const timeStr = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  const invoiceIdStr = Date.now();
  invoiceHeader.innerHTML = `
  Invoice #${invoiceIdStr}<br />
  Created: ${dateStr} ${timeStr}<br />`;
  return invoiceIdStr;
}

function generatePDF() 
  {
    //Credit: Code With Mark
    //Author URL: http://codewithmark.com
    //Github : https://ekoopmans.github.io/html2pdf.js

    const invoiceIdStr = invoiceDate();
    var element = document.getElementById('pdf_container');
    html2pdf().set({filename: `I-${invoiceIdStr}.pdf`}).from(element).save();

    //custom settings
    var opt = 
    {
      margin:       1,
      filename:     `I-${invoiceIdStr}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    //html2pdf().set(opt).from(element).save();
  };

function updatePDF() {
  invoiceCellContainer.innerHTML = "";
  cartTotal = 0;

  cartData.forEach(
    ({ id, sku, desc, qty, price, amount }) => {
      (invoiceCellContainer.innerHTML += `

      <tr class="item">
        <td>${desc}</td>
        <td>${qty}</td>
        <td>$${price}</td>
        <td>$${amount}</td>
      </tr>
      `)
      cartTotal += amount;
    }
  );

  invoiceTotalDisplay.innerHTML = `Total: $${cartTotal}`;
};

const currentCustomer = JSON.parse(localStorage.getItem("selectedCustomer"));
function addCustomerInfoToPDF() {
  if (currentCustomer.name !== "") {
    invoiceCustomerInfo.innerHTML += `
    <td>
      <strong>Customer Name:</strong><br />
      ${currentCustomer.name}<br />
    </td>
    <td>
      <strong>Customer Info:</strong><br />
      ${currentCustomer.streetAddress}<br />
      ${currentCustomer.address}
    </td>
        `;
  };
  
}