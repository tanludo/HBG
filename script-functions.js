const requestURL = "versets.json";

async function getVerses(){

    let listVerses = {};
    
    await fetch(requestURL).then(function(resp){
        return resp.json();
    }).then(function(data){
        //console.log(data);
        listVerses = data["versets"];
        
    });

    return listVerses;
};

//d'apres l'algo de Fisher
function randomize(tab) {
    var i, randNumb, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        randNumb = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[randNumb];
        tab[randNumb] = tmp;
    }
    return tab;
}

function faceOrBack(){
    var choice = Math.floor(Math.random() * 2);

    return choice;

}