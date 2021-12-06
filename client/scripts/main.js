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
        window.location.href='#/'
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
                    window.usager.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM4NzUyNDkxLCJleHAiOjE2Mzg3NTk2OTF9.jFZh7do-Irv5CQXa7ap_RZFbta6XhDLCgbS9oPa7__Q';
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
    const menuEmploy = document.getElementById('menuEmploye');
    menuEmploy.classList.toggle('cache');

}

function resetMenu(){
    const menuEmploy = document.getElementById('menuEmploye');
    if(!menuEmploy.classList.contains('cache')){
        menuEmploy.classList.toggle('cache');
    }
}



