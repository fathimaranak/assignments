let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let age = document.getElementById("age");
let phone = document.getElementById("phone");

name.addEventListener("input", function() {

    if (name.value.length < 3) {
        document.getElementById("nameError").innerHTML =
            "Name must contain at least 3 characters";
    } else {
        document.getElementById("nameError").innerHTML = "";
    }

});


email.addEventListener("input", function() {

    if (!email.value.includes("@")) {
        document.getElementById("emailError").innerHTML =
            "Enter a valid email";
    } else {
        document.getElementById("emailError").innerHTML = "";
    }

});


password.addEventListener("input", function() {

    if (password.value.length < 8) {
        document.getElementById("passwordError").innerHTML =
            "Password must contain at least 8 characters";
    } else {
        document.getElementById("passwordError").innerHTML = "";
    }

});




phone.addEventListener("input", function() {

    if (phone.value.length != 10) {
        document.getElementById("phoneError").innerHTML =
            "Phone number must contain 10 digits";
    } else {
        document.getElementById("phoneError").innerHTML = "";
    }

});


document.getElementById("registrationForm").addEventListener("submit", function(event) {

    if (
        name.value.length < 3 ||
        !email.value.includes("@") ||
        password.value.length < 8 ||
        age.value < 18 ||
        age.value > 60 ||
        phone.value.length != 10
    ) {
        event.preventDefault();

        alert("Please correct the errors in the form");

    } else {

        alert("Registration successful!");

    }

});