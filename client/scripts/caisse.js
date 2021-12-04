function envoyer() {
  const formulaire = new FormData(document.getElementById("formulaireCaisse"));
  const corps = Object.fromEntries(formulaire);
  console.log({ corps });
  const body = { idClient: window.usager.id };
  const init = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`,
    },
  };
  fetch("/ventes", init)
    .then((reponse) => {
      if (reponse.ok) {
        return reponse.json();
      } else {
        return reponse.text();
      }
    })
    .then((json) => {
      if (typeof json === "object" && json !== null) {
        window.confirmation = json;
        window.location.href = "/#/confirmation";
        console.log("Reussi");
      } else {
        console.log(json);
        afficherMessage(`Erreur: ${json}`, "negatif");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
function chargercaisse() {
  const btnCaisse = document.getElementById("btn-envoyer");
  btnCaisse.addEventListener("click", envoyer);
  pourChargerResumePanier();
}

function pourChargerResumePanier(){
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
      .then((data) => chargeResume(data));
}
function chargeResume(data){

  let quantitetotal = 0;
  let tax = 0;
  let livraison = 0;
  let total = 0;
  let resumerCom = document.getElementById("resumerCommande");
  resumerCom.innerHTML = "";

  resumerCom.innerHTML +='<div class="prixProduit">' + "Produits:" + '</div>' +
      '<div class="prixProduitArgent">' + "Prix:" + '</div>'


  for (let indice in data.items) {
    let element = data.items[indice];

    quantitetotal += element.quantite;
    resumerCom.innerHTML +=
        '<div class="produitResumer">' + element.nomProduit + " ("+ element.quantite +")"+ '</div>'+
        '<div class="produitResumerArgent">' + element.prix + "$" + ' </div>';
  }
  tax = 0.15 * data.valeur.toFixed(2);
  livraison = 0.10 * data.valeur.toFixed(2);
  total = tax + livraison + data.valeur;

  resumerCom.innerHTML +=
      '<div class="TTL" style="border-top: solid black 2px">' + "Taxe:" + '</div>'+
      '<div class="TTLArgent" style="border-top: solid black 2px">' + tax.toFixed(2) + "$"+  '</div>'+
      '<div class="TTL">' + "Livraison:" + '</div>'+
      '<div class="TTLArgent">' + livraison.toFixed(2) + "$"+  '</div>'+
      '<div class="TTL" style="margin-bottom: 5px">'+ "Total:" + '</div>'+
      '<div class="TTLArgent" style="margin-bottom: 5px">' + total.toFixed(2) + "$" + '</div>';
}
