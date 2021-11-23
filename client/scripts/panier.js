function genererPanier(data) {
  let produits = document.getElementById("panier-grille");
  let total = document.getElementById("panier-total");

  for (let indice in data.items) {
    let element = data.items[indice];
    produits.innerHTML +=
      '<article class="panier-item">' +
      "<ul>" +
      "<h1>" +
      element.nomProduit +
      "</h1>" +
      "<address>" +
      element.descriptionProduit +
      "</address>" +
      "</ul>" +
      "<ul>" +
      "<h2>Quantité : " +
      element.quantite +
      "</h2>" +
      "</ul>" +
      "<ul>" +
      "<h2>Prix : " +
      element.prix +
      "$" +
      "</h2>" +
      "</ul>" +
      "</ul>" +
      "<ul>" +
      "<h2>Prix total : " +
      (element.prix * element.quantite).toFixed(2) +
      "$" +
      "</h2>" +
      "</article>";
  }

  total.innerHTML +=
    '<article class="panier-item">' +
    "<ul>" +
    "</ul>" +
    "<ul>" +
    "</ul>" +
    "<ul>" +
    "<h1 >" +
    "TOTAL" +
    "</h1>" +
    "</ul>" +
    "<ul>" +
    "<h2>Prix total : " +
    data.valeur +
    "$" +
    "</h2>" +
    "</ul>" +
    "</article>";
}

function chargerpanier() {
  const init = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`,
    },
  };
  fetch("./clients/" + window.usager.id + "/panier", init)
    .then((produits) => {
      return produits.json();
    })
    .then((data) => genererPanier(data));
}
