document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link');
    const contentSections = document.querySelectorAll('.content-section');
    const logoutLink = document.getElementById('logout-link');
    const accountForm = document.getElementById('account-form');
    const passwordForm = document.getElementById('change-password-form');


    // Tab navigation
    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            menuLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const target = this.getAttribute('data-target');
            contentSections.forEach(section => section.classList.remove('active'));
            document.querySelector(`.${target}`).classList.add('active');
        });
    });

    // Logout functionality
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        alert('Logout clicked!');
    });

    // Account form validation
    accountForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phoneNumber = document.getElementById('phone-number').value.trim();

        // Validation logic
        if (firstName === '') {
            isValid = false;
            showError('first-name-error', 'First name is required.');
        } else {
            hideError('first-name-error');
        }

        if (lastName === '') {
            isValid = false;
            showError('last-name-error', 'Last name is required.');
        } else {
            hideError('last-name-error');
        }

        if (email === '' || !validateEmail(email)) {
            isValid = false;
            showError('email-error', 'Valid email is required.');
        } else {
            hideError('email-error');
        }

        if (phoneNumber === '' || !validatePhoneNumber(phoneNumber)) {
            isValid = false;
            showError('phone-number-error', 'Valid phone number is required.');
        } else {
            hideError('phone-number-error');
        }

        if (isValid) {
            alert('Account settings saved successfully!');
        }
    });

    // Password change form validation
    passwordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        const oldPassword = document.getElementById('old-password').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        const confirmNewPassword = document.getElementById('confirm-new-password').value.trim();

        if (oldPassword === '') {
            isValid = false;
            showError('old-password-error', 'Old password is required.');
        } else {
            hideError('old-password-error');
        }

        if (newPassword === '') {
            isValid = false;
            showError('new-password-error', 'New password is required.');
        } else {
            hideError('new-password-error');
        }

        if (confirmNewPassword === '' || confirmNewPassword !== newPassword) {
            isValid = false;
            showError('confirm-new-password-error', 'Passwords must match.');
        } else {
            hideError('confirm-new-password-error');
        }

        if (isValid) {
            showPopup('password-change-success');
        }
    });

    // Helper functions
    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.style.display = 'block';
    }

    function hideError(elementId) {
        const element = document.getElementById(elementId);
        element.style.display = 'none';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhoneNumber(phoneNumber) {
        const re = /^\d{10}$/;
        return re.test(phoneNumber);
    }



    function showPopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.style.display = 'block';

        const closeBtn = popup.querySelector('.close');
        closeBtn.addEventListener('click', function () {
            popup.style.display = 'none';
        });

        setTimeout(function () {
            popup.style.display = 'none';
        }, 3000);
    }
});
