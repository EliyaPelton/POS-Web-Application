/* ****************************************************** */
/* ********************** HEADER ************************ */
/* ****************************************************** */
const headerPageTitle = document.getElementById("header_title");
headerPageTitle.innerText = document.title.toUpperCase();

/* ****************************************************** */
/* ****************** PAGE: CUSTOMER ******************** */
/* ****************************************************** */





/* ****************************************************** */
/* *************** PAGE: SALES/PURCHASES **************** */
/* ****************************************************** */

/* ********************************** */
/* ******* Section #1: SEARCH ******* */
/* ********************************** */

//DROPDOWN FEATURE of "search_inventory_section" section of Sale & Purchase Pages
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


/* ********************************** */
/* ******* Section #2: DISPLAY ****** */
/* ********************************** */
//function to display a picture of the inventory item
var itemBtn = document.getElementsByClassName("item_btn");

for (var i = 0; i < itemBtn.length; i++) {
  itemBtn[i].addEventListener("click", displayItem);
}

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
const btnCartConfirm = document.getElementById("btn_cart_confirm");

let cartTotal = 0;
let cartData = [];
let currentLineItem = {};
//currentLineItem object: id (unique line item id), sku (item id), desc, qty, price


//FUNCTION
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

  localStorage.setItem("data", JSON.stringify(cartData));
  updateCartHTML()
  currentLintItem = {}; //Only necessary when we add the "edit" feature
};

//FUNCTION
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
            <button onclick="deleteItem(this)" type="button"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
      `)
      cartTotal += amount;
    }
  );

  cartTotalDisplay.innerText = `$${cartTotal}`;
};

//FUNCTION
function calculateTotal() {
  cartTotal = 0;
  cartData.forEach(({amount}) => {cartTotal += amount;});
  cartTotalDisplay.innerText = `$${cartTotal}`;
}

//UPDATE ITEM AMOUNT FEATURE of "item_display_section" of Sale & Purchase Pages
function updateItemDisplayAmount() {
  itemDisplayAmount.innerText = "$" + inputQty.value*inputPrice.value;
}

//FUNCTION
const deleteItem = (buttonEl) => {
  const itemArrIndex = cartData.findIndex((item) => item.id === buttonEl.parentElement.id);

  buttonEl.parentElement.parentElement.remove();
  cartData.splice(itemArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(cartData));

  calculateTotal();
};

//FUNCTION
function resetAll() {
  cartContainer.innerHTML = '';
  cartData = [];
  calculateTotal();
}

//TODO: Add an invoice generation function

//EVENT LISTENERS
//TODO: Change "btnCartConfirm" action to invoice generation function
addToCartBtn.addEventListener("click", addToCart);
btnCartConfirm.addEventListener("click", resetAll);


//TODO: Add search function
//https://dev.to/am20dipi/how-to-build-a-simple-search-bar-in-javascript-4onf
//https://www.w3schools.com/howto/howto_js_search_menu.asp
/*SEARCH FUNCTION
const searchInventoryInput = document.getElementById("search_inventory_input");

searchInventoryInput.addEventListener("input", (e) => {
  let value = e.target.value;
  if (value && value.trim().length > 0){
    value = value.trim().toLowerCase();
  } else {}
});

function setList(results) {
  for (const item of results) {
    const resultItem = document.createElement('li');
    resultItem.classList.add('results_item');
    const text = document.createTextNode(item.desc);
    resultItem.appendChild(text);
    list.appendChild(resultItem);
  }
};

searchInventoryInput.addEventListener("input", (e) => {
  let value = e.target.value;

  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase()

    setList(inventoryData.filter(item => {
      return item.desc.includes(value)
    }));
  };
});

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  };
};*/