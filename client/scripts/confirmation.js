function genererConfirmation() {
  let preWorkout = document.getElementById("confirmation");
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
function chargerconfirmation() {
  genererConfirmation();
  fetch("./produits")
    .then((produits) => {
      return produits.json();
    })
    .then((data) => genererProduit(data, 0, 10000));
}
