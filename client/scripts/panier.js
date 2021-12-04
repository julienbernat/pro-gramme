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
      '<ul  class="nomEtDes">' +
      "<h1>" +
      element.nomProduit +
      "</h1>" +
      "<address>" +
      element.descriptionProduit +
      "</address>" +
      "</ul>" +
      "<ul>" +
      '<input class="prixPosition" value=' +
      element.quantite +
      ' type="number" min="1" required onchange="changerquantite(' +
        element.id + ',' + element.quantite + ',this)"/>' +
      "</ul>" +
      "<ul>" +
      "<h2 class=\"prixPosition\">Prix : " +
      element.prix +
      "$" +
      "</h2>" +
      "</ul>" +
      "<ul>" +
      "<h2 class=\"prixPosition\">Total : " +
      (element.prix * element.quantite).toFixed(2) +
      "$" +
      "</h2>" +
      "</ul>" +
      "<ul>" +
      '<button class="supprimePosition" onclick="supprimerproduit(' +
      element.idProduit +
      ')">' +
      '<i class="material-icons" style="float: left"  >delete</i>' +
      "</button>";
    "</ul>" + "</article>";

    console.log(element.id);
  }

  total.innerHTML =
    '<article class="panier-item" style="height: 80px;">' +
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
    data.valeur.toFixed(2)  +
    `$ <br> (${quantitetotal} articles)`;
  "$" + "</h2>" + "</ul>" + "</article>";

}

function supprimerproduit(id) {
  const init = {
    method: "DELETE",
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
    .then((json) => {
      if (typeof json === "object" && json !== null) {
        chrgePanier();
        chargerpanier();
      } else {
        console.log(json);
        afficherMessage(`Erreur: ${json}`, "negatif");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function changerquantite(id, anciennequantite, input) {;
  const nouvellequantite = input.value;
  if (nouvellequantite < 1) {
    afficherMessage(
      "Vous devez avoir au moins 1 item pour chaque article dans votre panier",
      "negatif"
    );
    input.value = anciennequantite;
    return;
  }
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
    .then((json) => {
      if (typeof json === "object" && json !== null) {
        chargerpanier();
      } else {
        console.log(json);
        afficherMessage(`Erreur: ${json}`, "negatif");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function chargerpanier() {
  const init = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`
    },
  };
  fetch("./clients/" + window.usager.id + "/panier", init)
      .then((produits) => {
        return produits.json();
      })
      .then((data) => genererPanier(data));
}
