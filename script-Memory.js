
let nbCards = 12;
let cards;

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard;

function flipCard(){
    console.log("Je click");
    // console.log(this);

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    //if match
    checkForMatch();
    
}

function disableCard(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    firstCard.classList.toggle('find');
    secondCard.classList.toggle('find');

    resetBoard();
}

function unflipCard(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);

    
}

 

function checkForMatch(){
let isMatch = (firstCard.dataset.verset === secondCard.dataset.verset);
isMatch ? disableCard() : unflipCard();
    
}

function  resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}


async function getPage(url) {
    let res = await fetch(url)
    let text = await res.text()
    return text
  }
  
  /*getPage('versets.json').then(result => {
    console.log("Voici :"+ result)
  });*/


  function shuffle(){
    
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random() * nbCards);
        card.style.order = randomPos;
    });

    
}

function versesPicker(verses){//verses = tableau de verses
    let verseSelect= new Array();
    var iVerse;
    for(var i = 0; i < nbCards/2 ; i++){
        iVerse = Math.floor(Math.random() * verses.length);
        verseSelect.push(verses[iVerse]) ;
        verses.splice(iVerse, 1);

    }

    return verseSelect;
}

(async function createCard(){
    var gameCards = "";

    let listVersets = {};
    
    await fetch(requestURL).then(function(resp){
        return resp.json();
    }).then(function(data){
        console.log(data);
        listVersets = versesPicker(data["versets"]);



        for(var i= 0; i<listVersets.length ;i++){
            gameCards +="<div class=\"memory-card\" data-verset="+i+"> \
                    <div class=\"front-face\"><h2 class=\"text\">"+listVersets[i][0]+"</h2></div> \
                    <img class=\"back-face\" src=\"book.svg\" alt=\"memory-card\"> \
            </div> \
            <div class=\"memory-card\" data-verset="+i+"> \
                    <div class=\"front-face\"><h2 class=\"text\">"+listVersets[i][1]+"</h2></div> \
                    <img class=\"back-face\" src=\"book.svg\" alt=\"memory-card\"> \
            </div>";
        }

        document.getElementById("game-Area").innerHTML = gameCards;
        cards = document.querySelectorAll('.memory-card');
        cards.forEach(card=>card.addEventListener('click',flipCard));

        
    });

    shuffle();
    
})();








