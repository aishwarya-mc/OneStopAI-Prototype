
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById("username");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        // Validate inputs
        if (!usernameInput.checkValidity()) {
            alert(usernameInput.validationMessage);
            return;
        }

        if (!emailInput.checkValidity()) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!passwordInput.checkValidity()) {
            alert(passwordInput.validationMessage);
            return;
        }

        // Assuming all validations pass, you can proceed with storing data in the database
        const formData = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            date: new Date().toISOString().split('T')[0] // Today's date
        };

        // Now you can send formData to your backend for database storage
        // Example using fetch API:
        fetch('/submit_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Login details saved successfully!');
            form.reset(); // Clear the form after successful submission
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('Failed to save login details.Same email cannot be used!! Try another email.');
        });
    });
});

