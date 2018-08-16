const select = (elementById) => {
    return document.getElementById(elementById);
};

const username = select('username');
const usernameError = select('usernameError');
const password = select('password');
const passwordError = select('passwordError');
const confirmPassword = select('confirmPassword');
const confirmError = select('confirmError');
const fname = select('fname');
const fnameError = select('fnameError');
const lname = select('lname');
const lnameError = select('lnameError');
const button = select('button');
const sign = select('sign_in');

const regex = /^[a-zA-Z0-9\-]{5,}$/;
const regexName = /^[a-zA-Z]{1,}$/;

username.addEventListener('input', (e) => {
    e.preventDefault();
    if (username.value.length === 0) usernameError.textContent = "full the filed";
    if (!regex.test(username.value)) {
        usernameError.textContent = "The username not valid\n ( username should content [a-z] [A-Z] [0-9] [-] )\n at lest 8 character";
    } else {
        usernameError.textContent = "";
    }
});

fname.addEventListener('input', (e) => {
    e.preventDefault();
    if (!regexName.test(fname.value)) {
        fnameError.textContent = "The first name not valid\n first name should letters only [a-z] [A-Z]";
    } else {
        fnameError.textContent = "";
    }
});

lname.addEventListener('input', (e) => {
    e.preventDefault();
    if (!regexName.test(lname.value)) {
        lnameError.textContent = "The last name not valid\n last name should letters only [a-z] [A-Z]";
    } else {
        lnameError.textContent = "";
    }
});


password.addEventListener('input', (e) => {
    e.preventDefault();
    const value = password.value;

    const digit = /([\d])*/;
    const digitAndLower = /[a-z]+/;
    const digitALowerAUpper = /[A-Z]+/;
    const minimumLength = /^.{8,}$/;

    if (!minimumLength.test(value)) {
        passwordError.textContent = "at least 8 digit";
    } else {
        if (digitALowerAUpper.test(value)) {
            passwordError.textContent = "strong";
        } else if (digitAndLower.test(value)) {
            passwordError.textContent = "mediate";
        } else if (digit.test(value)) {
            passwordError.textContent = "Weak";
        }
    }

});


confirmPassword.addEventListener('input', (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
        confirmError.innerText = "Passwords do not match";
    } else {
        confirmError.innerText = "";
    }
});


button.addEventListener('click', (e) => {
    e.preventDefault();

    if (verfiy()) {
        if (usernameError.textContent === "" &&
            (passwordError.textContent === "strong" || passwordError.textContent === "mediate")
            && confirmError.textContent === "" && fnameError.textContent === "" && lnameError.textContent === "") {
            const object = {
                "username": username.value,
                "password": password.value,
                "fname": fname.value,
                "lname": lname.value
            };
            fetch(object, "POST", "/sign_up", (err, res) => {
                if (err) {
                    alert("There Is Error " + err);
                } else {
                    window.location = "/sign_in";
                }
            });


        } else alert("Can pleas Password no Weak\n and full the all require");
    } else alert("full the filed");


});


const verfiy = () => {

    if (username.value.trim() === '' ||
        password.value.trim() === '' ||
        confirmPassword.value.trim() === '' ||
        fname.value.trim() === '' ||
        lname.value.trim() === ''
    ) return false;
    else return true;
};

sign.addEventListener('click',(e)=>{
    window.location='/sign_in';
});