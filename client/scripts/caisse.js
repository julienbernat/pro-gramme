function sinscrire() {
  const formulaire = new FormData(document.getElementById("formulaire-caisse"));
  const corps = JSON.stringify(Object.fromEntries(formulaire));
  console.log(corps);
  const init = {
    method: "POST",
    body: corps,
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  fetch("/clients", init)
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
        afficherMessage("Inscription réussie!", "positif");
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
async function chargerinscription() {
  const btnInscription = document.getElementById("btn-sinscrire");
  btnInscription.addEventListener("click", sinscrire);
}
