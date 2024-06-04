let diceElement = document.querySelector(".image");

let p1TS = document.querySelector(".player0-TS");
let p1CS = document.querySelector(".player0-CS");
let p2TS = document.querySelector(".player1-TS");
let p2CS = document.querySelector(".player1-CS");

let turnp1 =document.querySelector(".turn1");
let turnp2 =document.querySelector(".turn2");

let turn = 0;
let currentScore = 0

document.querySelector(".startGame").addEventListener("click",restart)
document.querySelector(".roll").addEventListener("click",()=>{

    const dices = Math.trunc((Math.random())*6)+1;
    diceElement.classList.remove('hidden');
    diceElement.src = `./images/dice-${dices}.png`;
    if(dices !== 1){
        currentScore += dices;
        document.querySelector(`.player${turn}-CS`).innerHTML = currentScore ;}
    else{
        currentScore = 0
        document.querySelector(`.player${turn}-CS`).innerHTML= currentScore;
        turn = turn === 0 ? 1 : 0;
        turnp1.classList.toggle("hidden")
        turnp2.classList.toggle("hidden")
    }
    });
  
 
let scores = [0,0]

document.querySelector(".hold").addEventListener("click",()=>{

    scores[turn] += currentScore ;
    console.log(turn)
    document.querySelector(`.player${turn}-TS`).innerHTML = scores[turn];
    document.querySelector(`.player${turn}-CS`).innerHTML=0
    currentScore = 0

    turnp1.classList.toggle("hidden")
    turnp2.classList.toggle("hidden")
    
    turn = turn === 0 ? 1 : 0;
    winner(p1TS.innerHTML,p2TS.innerHTML);
})


function winner(player1TS,player2TS){
    if(player1TS >= 100){
        hiddenRemove()
        turnp1.innerHTML = ("YOU WIN")
        turnp2.innerHTML = ("YOU LOSE")
        document.querySelector("#disable").disabled = true;
    }else if(player2TS >= 100){
        hiddenRemove()
        turnp2.innerHTML = ("YOU WIN")
        turnp1.innerHTML = ("YOU LOSE")
        document.querySelector("#disable").disabled = true;}}

function hiddenRemove(){
    turnp1.classList.remove("hidden")
    turnp2.classList.remove("hidden")
}

function restart(){
    turnp2.classList.remove("hidden")
    turnp1.classList.add("hidden")
    turn = 0
    currentScore = 0
    scores = [0,0]
    p1CS.innerHTML = 0
    p1TS.innerHTML = 0
    p2TS.innerHTML = 0
    p2CS.innerHTML = 0
    diceElement.classList.add('hidden')
    turnp1.innerHTML = ("Waiting for <br>-Your turn")
    turnp2.innerHTML = ("Waiting for <br>-Your turn")
    document.querySelector("#disable").disabled = false;
}

document.querySelector(".roll").addEventListener('click',()=>{
    diceElement.classList.toggle("animation");
    }
);