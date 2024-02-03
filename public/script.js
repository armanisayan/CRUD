let prodName = document.getElementById('prodName')
let price = document.getElementById('price')
let type = document.getElementById('type')
let salelocation = document.getElementById('salelocation')

function getVal() {
    fetch("/addinfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ login: prodName.value, price: price.value, type: type.value, salelocation: salelocation.value })
    })

}
