function genererProduit(data) {
  let locaux = document.getElementById("prod-grille");
  console.log({ data });

  let innerHTML = "";
  for (let indice in data) {
    let element = data[indice];
    innerHTML +=
      '<article class="prod-item">' +
      "<h1>" +
      element.nom +
      "</h1>" +
      "<address>" +
      element.description +
      "</address>" +
      "<h2>Prix: </h2>" +
      "<ul>";

    innerHTML += "</ul></article>";
  }

  locaux.innerHTML = innerHTML;
}

function chargerproduits() {
  fetch("./produits")
    .then((produits) => {
      return produits.json();
    })
    .then((data) => genererProduit(data));
}
