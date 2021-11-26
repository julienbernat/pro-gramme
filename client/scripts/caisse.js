function envoyer() {
  const formulaire = new FormData(document.getElementById("formulaire-caisse"));
  const corps = Object.fromEntries(formulaire);
  const body = { ...corps, idClient: window.PushManager.id };
  const init = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
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
}