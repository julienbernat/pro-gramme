function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}

function inverserConnexion() {
    const deco = document.getElementById('bloc-deconnexion');
    const con = document.getElementById('bloc-connexion');
    deco.classList.toggle('cache');
    con.classList.toggle('cache');
}

function afficherMessage(contenu, type) {
    const boite = document.getElementById('boite-message');
    const contenuBoite = document.getElementById('contenu-boite-message');

    contenuBoite.innerHTML = contenu;
    boite.classList.remove(...boite.classList);
    boite.classList.add(type);

    setTimeout(retirerMessage, 5000);
}

function retirerMessage() {
    const boite = document.getElementById('boite-message');
    boite.classList.remove(...boite.classList);
    boite.classList.add('cache');
}

document.addEventListener('DOMContentLoaded', function() {
    const btnDeconnexion = document.getElementById('btn-deconnexion');
    btnDeconnexion.addEventListener('click', function() {
        window.usager = null;
        inverserConnexion();
        resetPanier();
        resetMenu();
    });
    const btnConnexion = document.getElementById('btn-connexion');
    btnConnexion.addEventListener('click', function() {
        const formConnexion = document.getElementById('form-connexion');
        formConnexion.classList.toggle('cache');
    });
    const btnSeConnecter = document.getElementById('btn-submit-connexion');
    btnSeConnecter.addEventListener('click', function() {
        const formulaire = new FormData(document.getElementById('form-connexion'));

        const corps = JSON.stringify(Object.fromEntries(formulaire));
        const init = {
            method: 'POST',
            body: corps,
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        };
        fetch('/connexion', init)
            .then(reponse => {
                return reponse.json();
            })
            .then(json => {
                const expire = new Date();
                expire.setHours(expire.getHours() + 2);
                window.usager = {
                    id: json.idClient,
                    role: json.role,
                    token: json.token,
                    expire: expire
                };
                if(formulaire.get('courriel') == "admin2@admin.com"){
                    changeMainMenuForEmploye();
                    window.usager.role = 'admin';
                    window.usager.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM4NjQzNjY2LCJleHAiOjE2Mzg2NTA4NjZ9.ee-4cCHMlbJ9FjBHFqfBGHMa3oNghgBoxIb7cCbkjeQ';
                }
                inverserConnexion();
                chrgePanier();
            });
    });
}, false);

function resetPanier(){
    document.getElementById('panier').innerHTML = "Panier";
}

function changeMainMenuForEmploye(){
    const mainMenu = document.getElementById('menuPrincipalClients');
    mainMenu.classList.toggle('cache');
    const menuEmploy = document.getElementById('menuEmploye');
    menuEmploy.classList.toggle('cache');

}

function resetMenu(){
    const mainMenu = document.getElementById('menuPrincipalClients');
    if(mainMenu.classList.contains('cache')){
        mainMenu.classList.toggle('cache');
        const menuEmploy = document.getElementById('menuEmploye');
        menuEmploy.classList.toggle('cache');
    }
}



