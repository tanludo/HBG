let hasFlippedCard = false;
let gameCard = "";
let listVerses;
let i;
 
async function init(){
    
    listVerses = await getVerses(); 
    
    listVerses = randomize(listVerses);
    i = 0;
    hasFlippedCard = false;

    createCard();

    

}

function keySpaceDown(event){
    if(event.keyCode === 32){
        
        flipCard();
    }
           
    
}

 function flipCard2(){
    
     if(!hasFlippedCard){
         hasFlippedCard = true;
         this.classList.toggle('flip');

         return;
     }

    hasFlippedCard = false;
    i++;

    //this.classList.remove('flip');
    isFinish();
    
     
 }

 function flipCard(){
    
    if(!hasFlippedCard){
       
        document.getElementsByClassName('memory-card')[0].classList.toggle('flip');
        hasFlippedCard = true;

        return;
    }
    
   hasFlippedCard = false;
   i++;

   //this.classList.remove('flip');
   isFinish();
   
    
}
 
 function createCard(){  

    if(faceOrBack()){
        gameCard ="<div class=\"memory-card\"> \
                    <div class=\"front-face\"><h2 class=\"text\">"+listVerses[i][0]+"</h2><span>("+listVerses[i][1]+")</span></div> \
                    <div class=\"back-face\"><h2 class=\"text\">"+listVerses[i][2]+"</h2></div> \
            </div> \
            ";
    }else{
        gameCard ="<div class=\"memory-card\"> \
                    <div class=\"front-face\"><h2 class=\"text\">"+listVerses[i][2]+"</h2><span>("+listVerses[i][1]+")</span></div> \
                    <div class=\"back-face\"><h2 class=\"text\">"+listVerses[i][0]+"</h2></div> \
            </div> \
            ";
    }
    
       

        document.getElementById("game-Area").innerHTML = gameCard;
        card = document.getElementsByClassName('memory-card');
        
        card[0].addEventListener('click',flipCard);
        document.addEventListener('keydown',keySpaceDown);
       
    
}

function isFinish(){
   if(i > listVerses.length-1){
        alert("Carte épuisé, recommencer");
        init();
        
   }else{
    createCard();
   }

  
}

(function launcher(){init();})();