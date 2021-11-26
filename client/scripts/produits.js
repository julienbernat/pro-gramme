function genererProduit(data) {
  <!-- la fonction divise les produits dans leurs catégories respective -->
  let preWorkout = document.getElementById("PreWorkOutProd");
  let prots = document.getElementById("ProtsProd");
  let postWorkout = document.getElementById("PostWorkOutProd");
  let autre = document.getElementById("AutresProduits");

  <!-- catérogie 1: preWorkout -->
  <!-- catérogie 2: prots -->
  <!-- catérogie 3: postWorkout -->
  <!-- catérogie 4: autre -->

  let innerHTMLpreWorkout = "";
  let innerHTMLprots = "";
  let innerHTMLpostWorkout = "";
  let innerHTMLautre = "";
  for (let indice in data) {
    let element = data[indice];

    if(element.categorie.id == 1){
      innerHTMLpreWorkout +=
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
        '<button onclick="ajouteraupanier(' +
        element.id +
        ')">Ajouter au panier</button>';
      innerHTMLpreWorkout +="</article>";
    }
    else if(element.categorie.id == 2){
      innerHTMLprots +=
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
          '<button onclick="ajouteraupanier(' +
          element.id +
          ')">Ajouter au panier</button>';
      innerHTMLprots +="</article>";
    }
    else if(element.categorie.id == 3){
      innerHTMLpostWorkout +=
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
          '<button onclick="ajouteraupanier(' +
          element.id +
          ')">Ajouter au panier</button>';
      innerHTMLpostWorkout +="</article>";
    }
    else if(element.categorie.id == 4){
      innerHTMLautre +=
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
          '<button onclick="ajouteraupanier(' +
          element.id +
          ')">Ajouter au panier</button>';
      innerHTMLautre +="</article>";
    }

  }
  preWorkout.innerHTML = innerHTMLpreWorkout;
  prots.innerHTML = innerHTMLprots;
  postWorkout.innerHTML = innerHTMLpostWorkout;
  autre.innerHTML = innerHTMLautre;
}

function chargerproduits() {
  fetch("./produits")
    .then((produits) => {
      return produits.json();
    })
    .then((data) => genererProduit(data));

}

function ajouteraupanier(idProduit) {
  const produit = { idProduit: idProduit, quantite: 1 };
  if (!window.usager) {
    afficherMessage(
      "Vous devez être connecté pour ajouter un item à votre panier",
      "negatif"
    );
    return;
  }
  const init = {
    method: "POST",
    body: JSON.stringify(produit),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`,
    },
  };
  fetch(`/clients/${window.usager.id}/panier`, init)
    .then((reponse) => {
      console.log({ reponse });
      if (reponse.ok) {
        return reponse.json();
      } else {
        return reponse.text();
      }
    })
    .then((json) => {
      if (typeof json === "object" && json !== null) {
        console.log("Reussi");
        afficherMessage("Ajouter au panier", "positif");
      } else {
        console.log(json);
        afficherMessage(`Erreur: ${json}`, "negatif");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
