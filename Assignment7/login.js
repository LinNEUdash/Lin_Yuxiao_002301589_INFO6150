$(document).ready(() => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@northeastern\.edu/;
    const specialCharPattern = /[^a-zA-Z0-9]/;

    let isEmailTouched = false;
    let isUsernameTouched = false;
    let isPasswordTouched = false;
    let isConfirmPasswordTouched = false;

    const validateEmail = () => {
        const email = $('#email').val().trim();
        if (!email) {
            if (isEmailTouched) {
                $('#emailError').text("Email cannot be empty").show();
            }
            return false;
        } else if (!emailPattern.test(email)) {
            if (isEmailTouched) {
                $('#emailError').text("Email must be a northeastern.edu email").show();
            }
            return false;
        } else {
            $('#emailError').hide();
            return true;
        }
    };

    const validateUsername = () => {
        const username = $('#username').val().trim();
        if (!username) {
            if (isUsernameTouched) {
                $('#usernameError').text("Username cannot be empty").show();
            }
            return false;
        } else if (specialCharPattern.test(username)) {
            if (isUsernameTouched) {
                $('#usernameError').text("Username cannot contain special characters").show();
            }
            return false;
        } else if (username.length < 3 || username.length > 15) {
            if (isUsernameTouched) {
                $('#usernameError').text("Username must be 3-15 characters").show();
            }
            return false;
        } else {
            $('#usernameError').hide();
            return true;
        }
    };

    const validatePassword = () => {
        const password = $('#password').val();
        if (!password) {
            if (isPasswordTouched) {
                $('#passwordError').text("Password cannot be empty").show();
            }
            return false;
        } else if (password.length < 6 || password.length > 12) {
            if (isPasswordTouched) {
                $('#passwordError').text("Password must be 6-12 characters").show();
            }
            return false;
        } else {
            $('#passwordError').hide();
            return true;
        }
    };

    const validateConfirmPassword = () => {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        if (confirmPassword !== password) {
            if (isConfirmPasswordTouched) {
                $('#confirmPasswordError').text("Passwords do not match").show();
            }
            return false;
        } else {
            $('#confirmPasswordError').hide();
            return true;
        }
    };

    const validateFields = () => {
        const isEmailValid = validateEmail();
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        const isValid = isEmailValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid;

        $('#loginButton').prop('disabled', !isValid);
    };

    $('#email').on('input', () => {
        isEmailTouched = true; 
        validateFields();
    });
    $('#username').on('input', () => {
        isUsernameTouched = true; 
        validateFields();
    });
    $('#password').on('input', () => {
        isPasswordTouched = true; 
        validateFields();
    });
    $('#confirmPassword').on('input', () => {
        isConfirmPasswordTouched = true; 
        validateFields();
    });

    $('#loginButton').on('click', () => {
        window.location.href = 'calculator.html?username=' + encodeURIComponent($('#username').val());
    });
});