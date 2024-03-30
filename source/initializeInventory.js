//sku, desc, price, img

//add javaScript access to each item in HTML
const _1ozge = document.getElementById('1oz_ge');
const _1ozgml = document.getElementById('1oz_gml');
const _1ozgkr = document.getElementById('1oz_gkr');

const _1ozgb = document.getElementById('1oz_gb');
const _1_2ozgb = document.getElementById('1/2oz_gb');
const _1ggb = document.getElementById('1g_gb');

const _1ozse = document.getElementById('1oz_se');
const _1ozsml = document.getElementById('1oz_sml');
const _1ozskr = document.getElementById('1oz_skr');

const _1ozsb = document.getElementById('1oz_sb');
const _1_2ozsb = document.getElementById('1/2oz_sb');
const _1gsb = document.getElementById('1g_sb');

//add info to each inventory item
//TODO: finish filling out the info for all the items
const Obj_1ozge = {
    sku: "1oz_ge",
    desc: "1oz Gold Eagle",
    price: 2200,
    img: "images/img_1oz_ge.jpg",
};

const Obj_1ozgml = {
  sku: "1oz_gml",
  desc: "1oz Gold Maple Leaf",
  price: 2180,
  img: "images/img_1oz_gml.jpg",
};

const Obj_1ozgkr = {
  sku: "1oz_gkr",
  desc: "1oz Gold Krugerrand",
  price: 2170,
  img: "images/img_1oz_gkr.jpg",
};

//gold bars
const Obj_1ozgb = {
  sku: "1oz_gb",
  desc: "1oz Gold Bar",
  price: 2150,
  img: "images/img_1oz_gb.jpeg",
};

const Obj_1_2ozgb = {
  sku: "1/2oz_gb",
  desc: "1/2oz Gold Bar",
  price: 1140,
  img: "images/img_1_2oz_gb.jpg",
};

const Obj_1ggb = {
  sku: "1g_gb",
  desc: "1g Gold Bar",
  price: 70,
  img: "images/img_1g_gb.jpg",
};

//silver coins
const Obj_1ozse = {
  sku: "1oz_se",
  desc: "1oz Silver Eagle",
  price: 30,
  img: "images/img_1oz_se.jpg",
};

const Obj_1ozsml = {
sku: "1oz_sml",
desc: "1oz Silver Maple Leaf",
price: 28,
img: "images/img_1oz_sml.jpg",
};

const Obj_1ozskr = {
sku: "1oz_skr",
desc: "1oz Silver Krugerrand",
price: 27,
img: "images/img_1oz_skr.jpg",
};

//silver bars
const Obj_1ozsb = {
  sku: "1oz_sb",
  desc: "1oz Silver Bar",
  price: 26,
  img: "images/img_1oz_sb.jpg",
};

const Obj_1_2ozsb = {
  sku: "1/2oz_sb",
  desc: "1/2oz Silver Bar",
  price: 14,
  img: "images/img_1_2oz_sb.jpg",
};

const Obj_1gsb = {
  sku: "1g_sb",
  desc: "1g Silver Bar",
  price: 2,
  img: "images/img_1g_sb.jpg",
};

//Add item to inventory array
//TODO: add all the objects once the info is filled out
const inventoryData = [Obj_1ozge, Obj_1ozgml, Obj_1ozgkr, Obj_1ozgb, Obj_1_2ozgb, Obj_1ggb, Obj_1ozse, Obj_1ozsml, Obj_1ozskr, Obj_1ozsb, Obj_1_2ozsb, Obj_1gsb];


//Use the desc to display on the screen, rather than the HTML
//TODO: finish this for all the items
_1ozge.innerHTML = Obj_1ozge.desc;
_1ozgml.innerHTML = Obj_1ozgml.desc;
_1ozgkr.innerHTML = Obj_1ozgkr.desc;

_1ozgb.innerHTML = Obj_1ozgb.desc;
_1_2ozgb.innerHTML = Obj_1_2ozgb.desc;
_1ggb.innerHTML = Obj_1ggb.desc;

_1ozse.innerHTML = Obj_1ozse.desc;
_1ozsml.innerHTML = Obj_1ozsml.desc;
_1ozskr.innerHTML = Obj_1ozskr.desc;

_1ozsb.innerHTML = Obj_1ozsb.desc;
_1_2ozsb.innerHTML = Obj_1_2ozsb.desc;
_1gsb.innerHTML = Obj_1gsb.desc;


//TODO: Try to make the above automated
//const categoryList = document.querySelectorAll('#search_inventory_section .category');