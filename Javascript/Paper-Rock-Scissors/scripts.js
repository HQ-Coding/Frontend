// let images = document.querySelectorAll(".img-items");
let cpuImages =document.querySelectorAll(".img-cpu-choosed");
let userPoint = document.querySelector("#user-point > p");
let cpuPoint = document.querySelector("#cpu-point > p");
let images = document.querySelectorAll("#btn")



for (let i = 0; i <= images.length -1 ;i++){
    images[i].addEventListener('click',()=>{
    disableds()
    hiddenSelect(i);

    randomCpu = Math.floor((Math.random()*10)/4);
    cpuImages[randomCpu].classList.remove("hidden");
    gameLogic(i,randomCpu)
    
    setTimeout(refresh, 1500)
    setTimeout(inabled, 1500)
    
})
}

function gameLogic(user,cpu){
    
    if(user !== cpu){
        if(user==0){
            if(cpu==1){
                userPoint.innerHTML = Number(userPoint.innerHTML) + 1
            }else{
                cpuPoint.innerHTML = Number(cpuPoint.innerHTML) + 1
            }
        }else if(user==1){
            if(cpu==2){
                userPoint.innerHTML = Number(userPoint.innerHTML) + 1
            }else{
                cpuPoint.innerHTML = Number(cpuPoint.innerHTML) + 1
            }

        }else if(user==2){
            if(cpu==0){
                userPoint.innerHTML = Number(userPoint.innerHTML) + 1
            }else{
                cpuPoint.innerHTML = Number(cpuPoint.innerHTML) + 1
            }
    }
}}

// Functions -------------------------
function disableds(){
    images.forEach((x)=>x.disabled = true)
}
function inabled(){
    images.forEach((x)=>x.disabled = false)
}
function hiddenSelect(i){
    for (let j = 0; j <= images.length -1 ;j++){
        if(j !== i){
            images[j].classList.add('hidden');
        }
    }
}

// buttons function ------------------

const refresh= () =>{
    for (let i = 0; i <= images.length -1 ;i++){
        images[i].classList.remove('hidden');
        cpuImages[i].classList.add('hidden')
    }
}

const restart = ()=>{
    userPoint.innerHTML = '0';
    cpuPoint.innerHTML = '0';
    for (let i = 0; i <= images.length -1 ;i++){
        images[i].classList.remove('hidden');
        cpuImages[i].classList.add('hidden')
    }
    }

// buttons ------------------
document.querySelector('.restart').addEventListener('click', restart)

// keybord ------------------
document.addEventListener('keydown',(e)=>{
    if(e.key == 'r'){
        restart();
    }
});

// setTimeOut ---------------