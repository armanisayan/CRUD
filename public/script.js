let userName = document.getElementById('userName')
let userAge = document.getElementById('userAge')

function getVal(){
    fetch("http://localhost:3000/addinfo",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({login: userName.value, age: userAge.value })
    })
        
}

