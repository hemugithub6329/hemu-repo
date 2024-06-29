// JavaScript to handle form submission and page navigation
//document.getElementById("login-button").addEventListener("click", function () {
// You can add your login validation logic here

// Redirect to the desired page (e.g., Home.html) after successful login
// window.location.href = "home.html";

// Redirect to the desired page (e.g., Home.html) in a new window/tab after successful login
//   window.open("home.html", "_blank");
//});

document.getElementById("register-button").addEventListener("click", function () {
    window.open("registration.html", "_blank");

});













document.getElementById('login-button').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create an object with the username and password
    const credentials = {
        username: username,
        password: password
    };

    // Make a POST request to the Flask /login route
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response
            if (data.message === "Login successful") {
                // Redirect to a dashboard or another page on successful login
                window.location.href = "home.html";
            } else {
                // Display an error message on failed login
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});















