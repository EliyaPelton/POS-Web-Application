/* ****************************************************** */
/* ********************** HEADER ************************ */
/* ****************************************************** */
const headerPageTitle = document.getElementById("header_title");
headerPageTitle.innerText = document.title.toUpperCase();

function redirectToCustomer() {
    window.location.href = "./customer.html";
    alert("Customer must be selected before entering purchase order");
};