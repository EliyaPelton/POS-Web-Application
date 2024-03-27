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

//ADDTOCART FEATURE of "cart_section" section of Sale & Purchase Pages
const addToCartBtn = document.getElementById('btn_add_to_cart');
const inputQty = document.getElementById("qty");
const inputPrice = document.getElementById("price");
const cartContainer = document.getElementById("cart_container");
const cartTotalDisplay = document.getElementById("cart_total_amount");

const cartData = [];
let currentItem = {};

//ID (lineitem differentiator), SKU (item differentiator), description (based on SKU), qty, price, amount

function addToCart() {
  const dataArrIndex = cartData.findIndex((item) => item.id === currentItem.id);
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

  updateCartHTML()
};

function updateCartHTML() {
  cartContainer.innerHTML = "";
  let cartTotal = 0;

  cartData.forEach(
    ({ id, sku, desc, qty, price, amount }) => {
      (cartContainer.innerHTML += `
      <tr>
        <td class="cart_cell">${desc}</td>
        <td class="cart_cell">${qty}</td>
        <td class="cart_cell">${amount}</td>
        <td class="cart_cell">
            <button onclick="deleteItem(this)" type="button"><i class="fa fa-trash"></i></button>
        </td>
        </tr>
      `)
      cartTotal += amount;
    }
  );

  cartTotalDisplay.innerText = cartTotal;
};

reset = () => {
  inputQty.value = 0;
  inputPrice.value = 0;
  currentItem = {};
}


//TODO: Add function to delete something from cart
function deleteItem() {};

addToCartBtn.addEventListener("click", addToCart);