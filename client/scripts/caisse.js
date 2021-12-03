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
}
