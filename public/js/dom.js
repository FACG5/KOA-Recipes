const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("btn");


button.addEventListener("click", ()=>{

    if(verfiy()){
        const  objData = {
            "username" : username.value ,
            "password" : password.value
        };

        fetch(objData, "POST", "/sign_in", (err,res) =>{
            if(err) alert("err");
            else{
                alert(res);
                window.location = "/home";
            }
        })

    }else{
        alert("full the filed");
    }

});

const verfiy = () =>{
    return username.value.trim() !=='' && password.value.trim() !== '';

}
