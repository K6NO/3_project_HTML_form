/**Set focus on the first text field
When the page loads, give focus to the first text field - OK
”Job Role” section of the form:
    A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu. - OK
    Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field. - OK

”T-Shirt Info” section of the form:
    For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu. - OK
    If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold." - OK
If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey." - OK

 ”Register for Activities” section of the form:
    Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
    When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled. - OK
    As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
    Payment Info section of the form:
    Display payment sections based on the payment option chosen in the select menu
The "Credit Card" payment option should be selected by default, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
When a user selects the "PayPal" payment option, the Paypal information should display, and the credit card and “Bitcoin” information should be hidden.
    When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
    Form validation:
    If any of the following validation errors exist, prevent the user from submitting the form:
    Name field can't be blank
Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
Must select at least one checkbox under the "Register for Activities" section of the form.
    If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
    Credit card field should only accept a number between 13 and 16 digits
The zipcode field should accept a 5-digit number
The CVV should only accept a number that is exactly 3 digits long
Form validation messages:
    Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or a message could appear near the field or at the top of the form
There should be an error indication for the name field, email field, “Register for Activities” checkboxes, credit card number, zip code, and CVV
 */
const userName = document.querySelector('#name');
const userEmail = document.querySelector('#mail');

// set focus on user name field
userName.focus();

const titleSelect = document.querySelector('#title');
const otherTitleTextField = document.createElement('input');
otherTitleTextField.setAttribute('type', 'text');
otherTitleTextField.setAttribute('id', 'other-title');
otherTitleTextField.setAttribute('placeholder', 'Your Job Role');


//create Other title field
const otherTitleLabel = document.createElement('label');
otherTitleLabel.setAttribute('for', 'other-title');

document.querySelector('fieldset').appendChild(otherTitleLabel);
document.querySelector('fieldset').appendChild(otherTitleTextField);
otherTitleLabel.style.display = 'none';
otherTitleTextField.style.display = 'none';

// event listener when 'other' option is selected
const onSelectTitleChanged = function () {
    let selectedTitle = titleSelect.value;
    console.log(selectedTitle);
    if (selectedTitle === 'other') {
        otherTitleLabel.style.display = '';
        otherTitleTextField.style.display = '';
    } else {
        otherTitleLabel.style.display = 'none';
        otherTitleTextField.style.display = 'none';
    }
}

titleSelect.addEventListener('change', onSelectTitleChanged, false);

// selecting design and color elements
const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');

// event listener for design change
const onSelectDesignChanged = function () {
    let selectedDesign = designSelect.value;
    console.log(selectedDesign);
    if (selectedDesign === 'js puns') {
        colorSelect.selectedIndex = 0;
        for (let i = 0; i < colorSelect.options.length; i++){
            if (i < 3) {
                colorSelect.options[i].style.display = '';
            } else {
                colorSelect.options[i].style.display = 'none';
            }
        }
    } else if (selectedDesign === 'heart js') {
        colorSelect.selectedIndex = 3;
        for (let i = 0; i < colorSelect.options.length; i++){
            if (i < 3) {
                colorSelect.options[i].style.display = 'none';
            } else {
                colorSelect.options[i].style.display = '';
            }
        }
        //colorSelect.children
    } else {
        colorSelect.selectedIndex = 0;
        for (let i = 0; i < colorSelect.children.length; i++){
            colorSelect.children[i].style.display = '';
        }
    }
}

designSelect.addEventListener('change', onSelectDesignChanged, false);


/* TODO ”Register for Activities” section of the form:
    Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
    When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
    As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

const activities = document.querySelectorAll('.activities label');

var disableWorkshop = function (workshopName) {
    var conflictingWS = document.querySelector('input[name=' + workshopName + ']');
    conflictingWS.disabled = true;
    conflictingWS.parentElement.classList.add("disabled");
}

var enableWorkshop = function (workshopName) {
    var conflictingWS = document.querySelector('input[name=' + workshopName + ']');
    conflictingWS.disabled = false;
    conflictingWS.parentElement.classList.remove("disabled");
}

var timeControlConflict2 = function() {
    if(this.checked){
        switch (this.name){
            case 'all':
                totalCost +=200;
                break;
            case 'js-frameworks':
                totalCost +=100;
                disableWorkshop('express');
                disableWorkshop('build-tools');
                break;
            case 'js-libs':
                totalCost +=100;
                disableWorkshop('node');
                disableWorkshop('npm');
                break;
            case 'express':
                totalCost +=100;
                disableWorkshop('js-frameworks');
                disableWorkshop('build-tools');
                break;
            case 'node':
                totalCost +=100;
                disableWorkshop('js-libs');
                disableWorkshop('npm');
                break;
            case 'build-tools':
                totalCost +=100;
                disableWorkshop('express');
                disableWorkshop('js-frameworks');
                break;
            case 'npm':
                totalCost +=100;
                disableWorkshop('node');
                disableWorkshop('js-libs');
                break;
        }
    } else {
        switch (this.name){
            case 'all':
                totalCost -=200;
                break;
            case 'js-frameworks':
                enableWorkshop('express');
                enableWorkshop('build-tools');
                break;
            case 'js-libs':
                totalCost -=100;
                enableWorkshop('node');
                enableWorkshop('npm');
                break;
            case 'express':
                totalCost -=100;
                enableWorkshop('js-frameworks');
                enableWorkshop('build-tools');
                break;
            case 'node':
                totalCost -=100;
                enableWorkshop('js-libs');
                enableWorkshop('npm');
                break;
            case 'build-tools':
                totalCost -=100;
                enableWorkshop('express');
                enableWorkshop('js-frameworks');
                break;
            case 'npm':
                totalCost -=100;
                enableWorkshop('node');
                enableWorkshop('js-libs');
                break;
        }
    }
    totalPriceElement.innerText = totalCost;
}


//adding event listener to checkboxes
var addEventListenersToCheckboxes = function () {
    for (let i = 0; i < activities.length; i++) {
        activities[i].children[0].addEventListener('click', timeControlConflict2);
    }
}

//adding up costs
var totalCost = 0;
var totalPriceP = document.createElement('p');
totalPriceP.innerText = 'Total cost: $ ';
var totalPriceElement = document.createElement('span');
totalPriceElement.innerText = totalCost;
totalPriceP.append(totalPriceElement);
activities[0].parentNode.append(totalPriceP);

addEventListenersToCheckboxes();


const paymentOptions = document.querySelector('#payment');
const creditCardForm = document.querySelector('#credit-card');
const paypalForm = document.querySelector('#paypal');
const bitcoinForm = document.querySelector('#bitcoin');

paymentOptions.selectedIndex = 1;
paypalForm.style.display = 'none';
bitcoinForm.style.display = 'none';

var onPaymentOptionsChange = function () {
    if (this.selectedIndex === 0 || this.selectedIndex === 1) {
        creditCardForm.style.display = '';
        paypalForm.style.display = 'none';
        bitcoinForm.style.display = 'none';
    } else if (this.selectedIndex === 2) {
        creditCardForm.style.display = 'none';
        paypalForm.style.display = '';
        bitcoinForm.style.display = 'none';
    } else {
        creditCardForm.style.display = 'none';
        paypalForm.style.display = 'none';
        bitcoinForm.style.display = '';
    }
}
paymentOptions.addEventListener('change', onPaymentOptionsChange);

/*
* TODO Form validation:
 If any of the following validation errors exist, prevent the user from submitting the form:
* */

const submitButton = document.querySelector('button[type=submit]');

// helper function for email validation

var validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var validateCheckboxes = function () {
    const checkboxes = document.querySelectorAll('.activities input');
    let isValid = false;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            isValid = true;
        }
    }
    return isValid;
}

var displayErrorMessage = function (element, errorMessage) {
    let span = document.createElement('span');
    span.classList.add('error');
    span.innerText = errorMessage;
    element.classList.add('error');
    element.before(span);
}
var onSubmitForm = function (e) {
    var errors = document.querySelectorAll('input.error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].classList.remove('error');
    }
    document.querySelector('fieldset.activities').classList.remove('error');

    var errorMessages = document.querySelectorAll('span.error');
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].remove();
    }

    //    Name field can't be blank
    if (userName.value === '') {
        e.preventDefault();
        displayErrorMessage(userName, 'Please enter your name.')
        //userName.classList.add('error');
    }
//    Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
    if (!validateEmail(userEmail.value)) {
        e.preventDefault();
        displayErrorMessage(userEmail, 'Please enter your email.')
    }
//    Must select at least one checkbox under the "Register for Activities" section of the form.
    if (!validateCheckboxes()) {
        e.preventDefault();
        const checkboxFieldset = document.querySelector('.activities');
        displayErrorMessage(checkboxFieldset, 'Please select at least one activity.');
    }

    /*
     * // TODO If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
     */
    //credit card payment
    if (paymentOptions.selectedIndex === 1) {
        isValid = true;
        const ccNumber = document.querySelector('#cc-num');
        const zipNumber = document.querySelector('#zip');
        const cvvNumber = document.querySelector('#cvv');

        //if (ccNumber.value === '' || zipNumber.value === '' || cvvNumber.value === ''){
        //    e.preventDefault();
        //    displayErrorMessage(ccNumber, 'Missing credit card number.');
        //    displayErrorMessage(zipNumber, 'Missing ZIP number.');
        //    displayErrorMessage(cvvNumber, 'Missing CVV number.');
        //}
        //      Credit card field should only accept a number between 13 and 16 digits

        if (isNaN(ccNumber.value) || ccNumber.value.length < 13 || ccNumber.value.length > 16) {
            e.preventDefault();
            isValid = false;
            displayErrorMessage(ccNumber, 'Credit card number must be between 13 and 16 digits.');

        }
        //     The zipcode field should accept a 5-digit number
        if (isNaN(zipNumber.value) || zipNumber.value.length != 5) {
            e.preventDefault();
            isValid = false;
            displayErrorMessage(zipNumber, 'ZIP must be an 5 digit number.');

        }
//        The CVV should only accept a number that is exactly 3 digits long
        if (isNaN(cvvNumber.value) || cvvNumber.value.length != 3) {
            e.preventDefault();
            isValid = false;
            displayErrorMessage(cvvNumber, 'CVV number must be 3 digits.');
        }
    }
}



//TODO consider adding event listener to the form's submit event
submitButton.addEventListener('click', onSubmitForm);



/*
*    /TODO Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or a message could appear near the field or at the top of the form
 There should be an error indication for the name field, email field, “Register for Activities” checkboxes, credit card number, zip code, and CVV

 * */