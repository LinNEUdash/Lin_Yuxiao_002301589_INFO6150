$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    $('#displayUsername').text(urlParams.get('username'));

    const validateNumberInput = (inputField, errorField) => {
        const value = $(inputField).val().trim();
        if (!value) {
            $(errorField).text("Input cannot be empty, please enter a number").show();
        } 
        else if (isNaN(value)) {
            $(errorField).text("Please enter a valid number").show();
        }
        else {
            $(errorField).hide();
        }
    };

    const validateAndCalculate = (operation) => {
        const number1 = $('#number1').val().trim();
        const number2 = $('#number2').val().trim();
        let isValid = true;

        // Validate both inputs
        if (!number1) {
            $('#number1Error').text("Input cannot be empty, please enter a number").show();
            isValid = false;
        } 
        else if (isNaN(number1)) {
            $('#number1Error').text("Please enter a valid number").show();
        }
        else {
            $('#number1Error').hide();
        }

        if (!number2) {
            $('#number2Error').text("Input cannot be empty, please enter a number").show();
            isValid = false;
        } 
        else if (isNaN(number2)) {
            $('#number2Error').text("Please enter a valid number").show();
            isValid = false;
        }
        else if (operation === 'divide' && number2 === '0') {
            $('#number2Error').text("The dividend in division operation cannot be 0").show();
            isValid = false;
        }
        else {
            $('#number2Error').hide();
        }

        if (isValid) {
            const num1 = parseFloat(number1);
            const num2 = parseFloat(number2);
            let result = 0;
            const performCalculation = (num1, num2, op) => {
                switch (op) {
                    case 'add':
                        return num1 + num2;
                    case 'subtract':
                        return num1 - num2;
                    case 'multiply':
                        return num1 * num2;
                    case 'divide':
                        return num2 !== 0 ? num1 / num2 : 'Infinity';
                }
            };
            result = performCalculation(num1, num2, operation);
            $('#result').val(result);
        }
    };

    // Bind input event for real-time validation
    $('#number1').on('input', () => {
        $('#result').val('');
        validateNumberInput('#number1', '#number1Error');
    });
    $('#number2').on('input', () => {
        $('#result').val('');
        validateNumberInput('#number2', '#number2Error')
    });
    
    $('#add').on('click', () => validateAndCalculate('add'));
    $('#subtract').on('click', () => validateAndCalculate('subtract'));
    $('#multiply').on('click', () => validateAndCalculate('multiply'));
    $('#divide').on('click', () => validateAndCalculate('divide'));
});