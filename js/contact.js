// 1. Sidebar Toggle Logic
function toggleMenu() {
    let nav = document.getElementById("sideNav");
    let icon = document.getElementById("toggleIcon");

    if (nav.style.left === "0px") {
        nav.style.left = "-250px";
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    } else {
        nav.style.left = "0px";
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }
}
// Select Elements
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("passwordInput");
let repasswordInput = document.getElementById("repasswordInput");
let submitBtn = document.getElementById("submitBtn");

// Flags
let nameValid = false;
let emailValid = false;
let phoneValid = false;
let ageValid = false;
let passwordValid = false;
let repasswordValid = false;

// 1. Name Validation (Only letters and spaces)
nameInput.addEventListener("keyup", function () {
    let regex = /^[a-zA-Z ]+$/;
    if (regex.test(nameInput.value)) {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        nameValid = true;
    } else {
        document.getElementById("nameAlert").classList.replace("d-none", "d-block");
        nameValid = false;
    }
    checkSubmit();
});

// 2. Email Validation (Standard Email)
emailInput.addEventListener("keyup", function () {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(emailInput.value)) {
        document.getElementById("emailAlert").classList.replace("d-block", "d-none");
        emailValid = true;
    } else {
        document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        emailValid = false;
    }
    checkSubmit();
});

// 3. Phone Validation (Egyptian Numbers)
phoneInput.addEventListener("keyup", function () {
    // يقبل الأرقام المصرية التي تبدأ بـ 01 ويليها 9 أرقام
    let regex = /^01[0125][0-9]{8}$/;
    if (regex.test(phoneInput.value)) {
        document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
        phoneValid = true;
    } else {
        document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        phoneValid = false;
    }
    checkSubmit();
});

// 4. Age Validation (1-99)
ageInput.addEventListener("keyup", function () {
    // يقبل أرقام من 1 إلى 99 (ويمكن إضافة 100)
    let regex = /^[1-9][0-9]?$|^100$/; 
    if (regex.test(ageInput.value)) {
        document.getElementById("ageAlert").classList.replace("d-block", "d-none");
        ageValid = true;
    } else {
        document.getElementById("ageAlert").classList.replace("d-none", "d-block");
        ageValid = false;
    }
    checkSubmit();
});

// 5. Password Validation (Min 8 chars, 1 letter, 1 number)
passwordInput.addEventListener("keyup", function () {
    // تم التعديل ليقبل الأحرف الكبيرة والصغيرة
    // (?=.*[A-Za-z]): حرف واحد على الأقل (كبير أو صغير)
    // (?=.*\d): رقم واحد على الأقل
    // [A-Za-z\d]{8,}: الطول 8 على الأقل ويحتوي على أحرف وأرقام
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (regex.test(passwordInput.value)) {
        document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        passwordValid = true;
    } else {
        document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
        passwordValid = false;
    }
    
    // إعادة فحص تطابق الباسورد عند تغيير الباسورد الأصلي
    if (repasswordInput.value !== "") {
        triggerRepasswordCheck();
    }
    
    checkSubmit();
});

// 6. Repassword Validation
repasswordInput.addEventListener("keyup", triggerRepasswordCheck);

function triggerRepasswordCheck() {
    if (repasswordInput.value == passwordInput.value) {
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
        repasswordValid = true;
    } else {
        document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
        repasswordValid = false;
    }
    checkSubmit();
}

// Main Submit Check
function checkSubmit() {
    if (nameValid && emailValid && phoneValid && ageValid && passwordValid && repasswordValid) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", "true");
    }
}