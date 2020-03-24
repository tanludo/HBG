const requestURL = "versets.json";

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



function createCard(){
    var gameCards = "";

    var listVersets = [["Mat 6:9","Prière modèle"],["Mat 7:12","Regle d'or"],["Heb 11:1","La foi"],["Gal 5:19","Fruits de la chaire"],["Gal 5:22","Fruits de l'esprit"],["Mat 28: 19-20","Faite des disciples"]];
    for(var i= 0; i<listVersets.length ;i++){
        gameCards +="<div class=\"memory-card\" data-verset="+i+"> \
                   <h2 class=\"front-face\">"+listVersets[i][0]+"</h2> \
                   <img class=\"back-face\" src=\"book.svg\" alt=\"memory-card\"> \
           </div> \
           <div class=\"memory-card\" data-verset="+i+"> \
                   <h2 class=\"front-face\">"+listVersets[i][1]+"</h2> \
                   <img class=\"back-face\" src=\"book.svg\" alt=\"memory-card\"> \
           </div>";
   }
   document.getElementById("game-Area").innerHTML = gameCards;
   cards = document.querySelectorAll('.memory-card');
   cards.forEach(card=>card.addEventListener('click',flipCard));
  }





(function shuffle(){
    createCard();
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });

    
})();




