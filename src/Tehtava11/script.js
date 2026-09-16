
// haetaan loadProducts funktiota heti kun javascript suoritetaan.
loadProducts();

function loadProducts() {

    // lähetetään GET-pyyntö api.php-tiedostolle.
    fetch("api.php")
    
    // kun palvelin vastaa, muutetaan vastaus JSON-muotoon.
    .then(response => response.json())
    
    
    // kun JSON on muutettu javascript dataksi, saadaan tuotteet products-muuttujaan.
    .then(products => {

        // luodaan tyhjä merkkijono.
        let teksti = "";

        // käydään products-taulukon jokainen tuote läpi
        products.forEach(product => {

            // lisätään teksti muuttujaan yksi HTML-taulukon rivi.
            teksti += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                </tr>
            `;
        });

        // etsitään HTML sivulta elementti, jonka id on productlist

        document.getElementById("productList").innerHTML = teksti;
    });
}


// luodaan funktio addProduct, tätä kutsutaan Lisää painikkeesta
function addProduct() {

    // haetaan HTML-sivun name kentän arvo
    let name = document.getElementById("name").value;

    // haetaan HTML-sivun price-kentän arvo
    let price = document.getElementById("price").value;


    // lähetetään pyyntö api.php tiedostolle
    fetch("api.php", {

        // määritetään metodiksi POST, tällä lähetetään uusi tuote palvelimelle
        method: "POST",

        // kerrotaan palvelimelle, että lähetettävä data on JSON-muodossa
        headers: {
            "Content-Type": "application/json"
        },

        // muutetaan javascript JSONIKSI ja lähetetään tuotteen nimi ja hinta api.php:lle
        body: JSON.stringify({
            name: name,
            price: price
        })
    })

    // kun php vastaa, muutetaan vastaus JSON-muotoon
    .then(response => response.json())

    // kun JSON on muutettu javascript dataksi, vastaus tallennetaan data-muuttujaan
    .then(data => {

        // haetaan tuotteet uudelleen tietokannasta
        loadProducts();
    });
}
