let userName = document.getElementById('userName')
let usEmail = document.getElementById('usEmail')
let password = document.getElementById('password')

function getVal(){
    fetch("/addinfo",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name: userName.value, email: usEmail.value, password: password.value })
    })

}
