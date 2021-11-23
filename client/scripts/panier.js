function genererPanier(data) {
  let produits = document.getElementById("panier-grille");
  let total = document.getElementById("panier-total");

  let quantitetotal = 0;
  produits.innerHTML = "";
  for (let indice in data.items) {
    let element = data.items[indice];
    quantitetotal += element.quantite;
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
      "<input value=" +
      element.quantite +
      ' type="number" name="age" id="quantite" required onchange="changerquantite(' +
      element.id +
      "," +
      element.quantite +
      ',this.value)"/>' +
      "</ul>" +
      "<ul>" +
      "<h2>Prix : " +
      element.prix +
      "$" +
      "</h2>" +
      "</ul>" +
      "</ul>" +
      "<ul>" +
      "<h2>Total : " +
      (element.prix * element.quantite).toFixed(2) +
      "$" +
      "</h2>" +
      "</article>";
  }

  total.innerHTML =
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
    "<h2>" +
    data.valeur.toFixed(2) +
    `$ (${quantitetotal} articles)`;
  "$" + "</h2>" + "</ul>" + "</article>";
}

function changerquantite(id, anciennequantite, nouvellequantite) {
  const quantite = { quantite: Number(nouvellequantite) - anciennequantite };
  const init = {
    method: "PUT",
    body: JSON.stringify(quantite),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`,
    },
  };
  fetch(`./clients/${window.usager.id}/panier/${id}`, init)
    .then((reponse) => {
      if (reponse.ok) {
        return reponse.json();
      } else {
        return reponse.text();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  chargerpanier();
  document.getElementById("quantite").value = nouvellequantite;
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
