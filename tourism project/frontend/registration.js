// JavaScript to display the success message and hide the form

// var registrationForm = document.getElementById("registration-form");
// var successMessage = document.getElementById("success-msg");


// registrationForm.addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form submission

//     // You can add your registration logic here
//     // For demonstration purposes, we'll simply show the success message

//     registrationForm.style.display = "none";
//     successMessage.style.display = "block";
// });


document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(this);

    // Convert form data to a JSON object
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    console.log(formDataObject)
    // formdataobj looks like body ie
    // {
    //     "username": "john_doe",
    //     "age": 30,
    //     "gender": "male",
    //     "email": "john.doe@example.com",
    //     "contact": 1234567890,
    //     "password": "secure_password"
    // }

    // Make a POST request to your Flask API
    fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response
            console.log(data)
            if (data.message === "User registered successfully") {
                // Show success message and clear the form
                document.getElementById('success-msg').style.display = 'block';
                document.getElementById('registration-form').reset();
            } else {
                // Handle registration failure
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


