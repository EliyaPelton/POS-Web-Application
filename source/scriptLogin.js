/* ****************************************************** */
/* *************** LOGIN AUTHENTICATION ***************** */
/* ****************************************************** */
//Test for authentication
function authenticate() {
    var nameId = document.login_authentication.username.value;
    var passId = document.login_authentication.password.value;
    var isValid = false;
    
    if (nameId == "" || passId == "") {
        alert('\nERROR. Please enter username and password.');
    } else {
        for (i = 0; i < validIdArr.length; i++) {
            if (nameId === validIdArr[i].username && passId === validIdArr[i].password) {
                isValid = true;
                localStorage.setItem("currentUser", JSON.stringify(validIdArr[i].accountId)); //Add current username to localStorage to display name in header}
            };
        };
        if (isValid) {
            window.location.href = "./home.html";
        } else {alert('\nERROR: Invalid username and password.\nUsername and Password are both case sensitive.');};
    };
};


//Define valid users
const validIdArr = [
    { username: "Eliya", password: "Elephant", accountId: "Eliya Pelton"},
    { username: "Gregory", password: "Professor", accountId: "Gregory Baumgardner"}
]