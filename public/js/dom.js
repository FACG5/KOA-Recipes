const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("btn");
const sign = document.getElementById('sign_up');


button.addEventListener("click", () => {

    if (verfiy()) {
        const objData = {
            "username": username.value,
            "password": password.value
        };

        fetch(objData, "POST", "/sign_in", (err, res) => {
            if (err) {
                window.location = "/sign_in";
            } else {
                window.location = "/home";
            }
        })

    } else {
        alert("full the filed");
    }

});

const verfiy = () => {
    return username.value.trim() !== '' && password.value.trim() !== '';

}

sign.addEventListener('click',(e)=>{
    window.location='/sign_up';
})