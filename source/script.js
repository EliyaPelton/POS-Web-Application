/* ****************************************************** */
/* ********************** HEADER ************************ */
/* ****************************************************** */
const headerPageTitle = document.getElementById("header_title");
headerPageTitle.innerText = document.title.toUpperCase();

const headerUserName = document.getElementById("header_icon");
headerUserName.innerHTML = `${JSON.parse(localStorage.getItem("currentUser"))} <i class='fa fa-user'></i>`;


/* ****************************************************** */
/* ********************* HOME PAGE ********************** */
/* ****************************************************** */
function redirectToCustomer() {
    window.location.href = "./customer.html";
    alert("Customer must be selected before entering purchase order");
};