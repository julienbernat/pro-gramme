function genererConfirmation(data) {
  let confirmation = document.getElementById("confirmation");
  let innerHTMLconfirmation = "";
  let quantiteTotal = 0;

  for (let i in data.produits) {
    quantiteTotal += data.produits[i].quantite;
  }

  innerHTMLconfirmation +=
    '<article class="texte-confirmation">' +
    "<h1> Votre commande a bel et bien été reçue!</h1>" +
    "<h1>Nombre d'articles : " +
    quantiteTotal +
    "</h1>" +
    "<h2>Prix : " +
    data.montant.toFixed(2) +
    "$" +
    "</h2>" +
    "<p> Veuillez nous contacter à ce numéro (123) 456-7890 en cas de problème." +
    "</p>" +
    "</article>" +
    '<div class="accueil">' +
    '<button onclick="window.location.href=`#/`"' +
    'type="button">Accueil</button>' +
    "</div>";

  confirmation.innerHTML = innerHTMLconfirmation;
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
function chargerconfirmation() {
  const confirmation = window.confirmation;
  if (!confirmation.idClient) {
    window.location.href = "#/";
  }
  genererConfirmation(confirmation);
}
