/**Project 3 - Build an Interactive Form
 */


const userName = document.querySelector('#name');
const userEmail = document.querySelector('#mail');
const titleSelector = document.querySelector('#title');
const otherTitleTextField = document.createElement('input');
const otherTitleLabel = document.createElement('label');
const designSelector = document.querySelector('#design');
const colorSelector = document.querySelector('#color');
const activities = document.querySelectorAll('.activities label');
const paymentOptions = document.querySelector('#payment');
const creditCardForm = document.querySelector('#credit-card');
const paypalForm = document.querySelector('#paypal');
const bitcoinForm = document.querySelector('#bitcoin');
const submitButton = document.querySelector('button[type=submit]');
const ccNumber = document.querySelector('#cc-num');
const zipNumber = document.querySelector('#zip');
const cvvNumber = document.querySelector('#cvv');
let totalCost = 0;

//Setting up initial values
paymentOptions.selectedIndex = 1;
paypalForm.style.display = 'none';
bitcoinForm.style.display = 'none';
colorSelector.style.display = 'none';
colorSelector.previousElementSibling.style.display = 'none';

// set focus on user name field
userName.focus();

/**
 * Create 'Other' field and label
 */
const createOtherTitleTextAndLabel = function () {
    otherTitleTextField.setAttribute('type', 'text');
    otherTitleTextField.setAttribute('id', 'other-title');
    otherTitleTextField.setAttribute('placeholder', 'Your Job Role');
    otherTitleLabel.setAttribute('for', 'other-title');

    document.querySelector('fieldset').appendChild(otherTitleLabel);
    document.querySelector('fieldset').appendChild(otherTitleTextField);
    otherTitleLabel.style.display = 'none';
    otherTitleTextField.style.display = 'none';
}

/**
 * Event listener when 'other' option is selected
 */
const onSelectTitleChanged = function () {
    let selectedTitle = titleSelector.value;
    console.log(selectedTitle);
    if (selectedTitle === 'other') {
        otherTitleLabel.style.display = '';
        otherTitleTextField.style.display = '';
    } else {
        otherTitleLabel.style.display = 'none';
        otherTitleTextField.style.display = 'none';
    }
}

/**
 * Event listener for design change
 */
const onSelectDesignChanged = function () {
    let selectedDesign = designSelector.value;
    if (designSelector.selectedIndex === 0) {
        colorSelector.style.display = 'none';
        colorSelector.previousElementSibling.style.display = 'none';
    }
    if (selectedDesign === 'js puns') {
        colorSelector.style.display = '';
        colorSelector.previousElementSibling.style.display = '';
        colorSelector.selectedIndex = 0;
        for (let i = 0; i < colorSelector.options.length; i++){
            if (i < 3) {
                colorSelector.options[i].style.display = '';
            } else {
                colorSelector.options[i].style.display = 'none';
            }
        }
    } else if (selectedDesign === 'heart js') {
        colorSelector.style.display = '';
        colorSelector.previousElementSibling.style.display = '';
        colorSelector.selectedIndex = 3;
        for (let i = 0; i < colorSelector.options.length; i++){
            if (i < 3) {
                colorSelector.options[i].style.display = 'none';
            } else {
                colorSelector.options[i].style.display = '';
            }
        }
        //colorSelector.children
    } else {
        colorSelector.selectedIndex = 0;
        for (let i = 0; i < colorSelector.children.length; i++){
            colorSelector.children[i].style.display = '';
        }
    }
}

// ”Register for Activities” section of the form

/**
 * Helper functions enabling/disabling workshops
 */

var disableWorkshop = function (workshopName) {
    var workshopName = document.querySelector('input[name=' + workshopName + ']');
    workshopName.disabled = true;
    workshopName.parentElement.classList.add("disabled");
}

var enableWorkshop = function (workshopName) {
    var workshopName = document.querySelector('input[name=' + workshopName + ']');
    workshopName.disabled = false;
    workshopName.parentElement.classList.remove("disabled");
}


//function checking conflicting times and calculating total cost
var timeConflictAndCostCalculator = function() {
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


//adding timeConflictAndCostCalculator as event listener to checkboxes
var addEventListenersToCheckboxes = function () {
    for (let i = 0; i < activities.length; i++) {
        activities[i].children[0].addEventListener('click', timeConflictAndCostCalculator);
    }
}

//adding up costs
var totalPriceP = document.createElement('p');
totalPriceP.innerText = 'Total cost: $ ';
var totalPriceElement = document.createElement('span');
totalPriceElement.innerText = totalCost;
totalPriceP.append(totalPriceElement);
activities[0].parentNode.append(totalPriceP);

// event listener for the payment options select menu
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

// Form validation:



// helper function for email validation

var validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// helper function for checkbox validation

const validateCheckboxes = function () {
    const checkboxes = document.querySelectorAll('.activities input');
    let isValid = false;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            isValid = true;
        }
    }
    return isValid;
}

// helper functions for displaying and removing error messages

const displayErrorMessage = function (element, errorMessage) {
    let span = document.createElement('span');
    span.classList.add('errorspan');
    span.innerText = errorMessage;
    element.classList.add('error');
    element.after(span);
}

const removeErrorMessages = function () {
    var errors = document.querySelectorAll('input.error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].classList.remove('error');
    }
    document.querySelector('fieldset.activities').classList.remove('error');

    var errorMessages = document.querySelectorAll('span.errorspan');
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].remove();
    }
}

// form validation
var validateFormOnSubmit = function (e) {
    removeErrorMessages();

    // Name field validation
    if (userName.value === '') {
        e.preventDefault();
        displayErrorMessage(userName, 'Please enter your name.')
    }
    // Email field validation (if empty or if not correct format)
    if (userEmail.value === '') {
        e.preventDefault();
        displayErrorMessage(userEmail, 'Please enter your email.')
    } else if (!validateEmail(userEmail.value)) {
        e.preventDefault();
        displayErrorMessage(userEmail, 'Please enter a valid email (Ex.: someone@somewhere.com).');
    }
    // Must select at least one checkbox under the "Register for Activities" section of the form.
    if (!validateCheckboxes()) {
        e.preventDefault();
        const checkboxFieldset = document.querySelector('.activities');
        displayErrorMessage(checkboxFieldset, 'Please select at least one activity.');
    }

    // Credit card payment validation (display various error messages)
    if (paymentOptions.selectedIndex === 1) {
        if (ccNumber.value === '') {
            e.preventDefault();
            displayErrorMessage(ccNumber, 'Missing credit card number.');
        } else if (isNaN(ccNumber.value) || ccNumber.value.length < 13 || ccNumber.value.length > 16) {
            e.preventDefault();
            displayErrorMessage(ccNumber, 'Credit card number must be between 13 and 16 digits.');
        }

        if (zipNumber.value === '') {
            displayErrorMessage(zipNumber, 'Missing ZIP number.');
        } else if (isNaN(zipNumber.value) || zipNumber.value.length != 5) {
            e.preventDefault();
            displayErrorMessage(zipNumber, 'ZIP must be an 5 digit number.');
        }

        if (cvvNumber.value === '') {
            displayErrorMessage(cvvNumber, 'Missing CVV number.');
        } else if (isNaN(cvvNumber.value) || cvvNumber.value.length != 3) {
            e.preventDefault();
            displayErrorMessage(cvvNumber, 'CVV number must be 3 digits.');
        }
    }
}

// Real time validation of email field
const validateEmailRealTime = function () {
    if (userEmail.value === '') {
        removeErrorMessages();
        displayErrorMessage(userEmail, 'Please enter your email.')
    } else if (!validateEmail(userEmail.value)) {
        removeErrorMessages();
        displayErrorMessage(userEmail, 'Please enter a valid email (Ex.: someone@somewhere.com).');
    } else {
        removeErrorMessages();
    }
}

userEmail.addEventListener('input', validateEmailRealTime);
createOtherTitleTextAndLabel();
titleSelector.addEventListener('change', onSelectTitleChanged, false);
designSelector.addEventListener('change', onSelectDesignChanged, false);
addEventListenersToCheckboxes();
submitButton.addEventListener('click', validateFormOnSubmit);