let form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;

    let valid = true;

    if (name.length < 3) {
        document.getElementById("nameError").innerHTML =
            "Name must contain at least 3 characters";
        valid = false;
    } else {
        document.getElementById("nameError").innerHTML = "";
    }

    if (!email.includes("@")) {
        document.getElementById("emailError").innerHTML =
            "Enter a valid email";
        valid = false;
    } else {
        document.getElementById("emailError").innerHTML = "";
    }

    if (password.length < 8) {
        document.getElementById("passwordError").innerHTML =
            "Password must contain at least 8 characters";
        valid = false;
    } else {
        document.getElementById("passwordError").innerHTML = "";
    }

    

    if (phone.length != 10) {
        document.getElementById("phoneError").innerHTML =
            "Phone number must contain 10 digits";
        valid = false;
    } else {
        document.getElementById("phoneError").innerHTML = "";
    }

    if (valid) {
        alert("Registration successful!");
    }

});