
function chargerventes() {
  const init = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`,
    },
  };
  fetch("./ventes", init)
      .then((clients) => {
        return clients.json();
      })
      .then((data) => chargerClients(data));

}

function chargerClients(listeVentes){
  const init = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`,
    },
  };
  fetch("./clients", init)
      .then((clients) => {
        return clients.json();
      })
      .then((data) => chargerCommandesClients(listeVentes, data));

}

function chargerCommandesClients(listeVente, listeClients){
  let listeCommande = document.getElementById("listcmd");

  let commandes = "";

  for (let indice in listeVente) {
    let element = listeVente[indice];
    if(element.idClient != 3){
      commandes += '<div class="commandeIndividuel">' +
          '<div class="idcommande">' + element.id + '</div>' +
          '<div class="nomProduits">';

          for (let i in listeVente[indice].produits){
            commandes += listeVente[indice].produits[i].nomProduit + '<br class="entreProduits">';
          }
          commandes += '</div>' + '<div class="quantiteProduits">';

          for (let i in listeVente[indice].produits){
            commandes += listeVente[indice].produits[i].quantite + '<br class="entreProduits">';
          }
          commandes +='</div>' + '<div class="adresse">';

          for (let i in listeClients){
            if(listeClients[i].id == element.idClient){
              commandes += listeClients[i].adresse + '<br>'+
                  listeClients[i].pays;
            }
          }
          commandes+= '</div>' +
          '<button class="enleverventer" onclick="supprimerVente(' + element.id +', ' + element.idClient + ')">' +
          "</button>"+
          '</div>';

    }
  }

  listeCommande.innerHTML = commandes;
}


function supprimerVente(id, idclient) {
  const idcli = { idClient: Number(idclient)};
  const init = {
    method: "DELETE",
    body: JSON.stringify(idcli),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer: ${window.usager.token}`
    },
  };
  fetch(`./ventes/${id}`, init)
      .then((reponse) => {
        if (reponse.ok) {
          return reponse.json();
        } else {
          return reponse.text();
        }
      })
      .then((json) => {
        if (typeof json === "object" && json !== null) {
          chargerventes();
        } else {
          console.log(json);
          afficherMessage(`Erreur: ${json}`, "negatif");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}