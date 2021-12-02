function genererProduit(data, prixMin, prixMax) {
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
    if(element.prix >= prixMin && element.prix <= prixMax){
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
    .then((data) => genererProduit(data, 0, 10000));
  openAllProducts();
}

<!--fonction qui sert à montrer tous les produits quand la page est chargé -->
function openAllProducts(){

  const preWorkout = document.getElementById('PreWorkOutProd');
  preWorkout.classList.remove('cache');
  preWorkout.classList.add('cache');
  preWorkout.classList.toggle('cache');

  const prot = document.getElementById('ProtsProd');
  prot.classList.remove('cache');
  prot.classList.add('cache');
  prot.classList.toggle('cache');

  const postWorkout = document.getElementById('PostWorkOutProd');
  postWorkout.classList.remove('cache');
  postWorkout.classList.add('cache');
  postWorkout.classList.toggle('cache');

  const autre = document.getElementById('AutresProduits');
  autre.classList.remove('cache');
  autre.classList.add('cache');
  autre.classList.toggle('cache');
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
function close_clip(idToClose, idimage){
  const preWorkout = document.getElementById(idToClose);
  const img = document.getElementById(idimage);
  preWorkout.classList.toggle('cache');
  if(preWorkout.classList.contains('cache')){
    img.src = "images/arrow_down.png"
  }else{
    img.src = "images/arrow_up.png"
  }
}

async function recherche(idtext, prixMin, prixMax){
  var text = document.getElementById(idtext).value;
  var prixmin = document.getElementById(prixMin).value;
  var prixmax = document.getElementById(prixMax).value;
  if(text != ""){
    fetch("./produits?nom="+ text)
        .then((produits) => {
          return produits.json();
        })
        .then((data) => genererProduit(data, prixmin, prixmax));
  } else{
    fetch("./produits")
      .then((produits) => {
        return produits.json();
      })
      .then((data) => genererProduit(data, prixmin, prixmax));
    openAllProducts();

  }
}
