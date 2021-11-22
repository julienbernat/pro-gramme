const mockData = {};

function genererPanier(data) {
  console.log({ data });
  let produits = document.getElementById("prod-grille");

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
      "<h2>Prix : " +
      element.prix +
      "$" +
      "</h2>" +
      "<p>Quantité restant : " +
      element.qte_inventaire +
      "</p>" +
      "<button>Ajouter au panier</button>";
    innerHTML += "</article>";
  }
  produits.innerHTML = innerHTML;
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
