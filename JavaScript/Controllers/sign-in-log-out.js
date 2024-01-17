import SportsService from "../Services/SportsService.js";


$(document).ready(function() {
    var isLoggedIn = sessionStorage.getItem("function") === "true";

    updateButtonState();

    $(".sign-logout").on("click", function() {
        if (isLoggedIn) {
            // User is logged in, perform logout actions
            sessionStorage.removeItem("function");
            sessionStorage.removeItem("Username");
            sessionStorage.removeItem("Id");
        } else {
            // User is not logged in, redirect to the login page
            window.location.href = "../HTML/login.html";
        }

        // Toggle the user's login state
        isLoggedIn = !isLoggedIn;

        // Update the button state
        updateButtonState();
    });

    function updateButtonState() {
        // Update the button text based on the user's login state
        if (isLoggedIn) {
            $(".sign-logout").text("Logout");
        } else {
            $(".sign-logout").text("Sign In");
        }
    }
   
});

  