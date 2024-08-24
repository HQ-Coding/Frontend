const product = document.getElementsByClassName('product');

const fromDown = document.querySelectorAll('.fromDown');
const fromUp = document.querySelectorAll('.fromUp');
const fromLeft = document.querySelectorAll('.fromLeft');
const fromRight = document.querySelectorAll('.fromRight');

const observer = new IntersectionObserver (entries => {
    entries.forEach( entry =>{
        entry.target.classList.toggle("show" , entry.isIntersecting)
        if(entry.IntersectionObserver) observer.unobserve(entry.target)
    });}
    ,
    {
        threshold : .5,
    }
  )

  fromDown.forEach(obj=>{
    observer.observe(obj)
  })
  fromUp.forEach(obj=>{
    observer.observe(obj)
  })
  fromLeft.forEach( obj =>{
    observer.observe(obj)
  })
  fromRight.forEach(obj=>{
    observer.observe(obj)
  })

const myText = document.getElementsByClassName('AboutUS-TEXT');
const Wellcome = document.getElementsByClassName('wellcome');
let i = 0;

  const WriteMyText = new IntersectionObserver (entries => {
    entries.forEach( entry =>{
      if(entry.isIntersecting){
        const writeText = setInterval(() => {

          let objs = entry.target.getAttribute('data-obj');
          const toWrite = objs.split('');
          
          if(i < toWrite.length){
            entry.target.textContent += toWrite[i];
            i++;
          }else{
            clearInterval(writeText);
          }
        }, 50);
        observer.unobserve(entry.target)
      }
    }),
    {
        threshold : .5,
    }    
})

if (myText.length > 0) {
  WriteMyText.observe(myText[0]);
}
if ( Wellcome[0].getAttribute('data-obj').length > 0) {
  console.log('Wellcome')
  WriteMyText.observe(Wellcome[0]);
}

const sodaBot = document.querySelectorAll(".circle img");
const circles = document.querySelectorAll(".circle");
const BaseCircleIMG = document.querySelector(".Base-Circle img");
const BaseCircle = document.querySelector(".Base-Circle img");
const characterIMG = document.querySelector(".characterIMG-1");

sodaBot.forEach((soda ,i )=>{
  soda.addEventListener("click",()=>{
    BaseCircleIMG.src = sodaBot[i].src
    characterIMG.src = `../image/characters/${i +1}.png`
    
    BaseCircleIMG.style.animation = 'none'; 
    BaseCircleIMG.offsetHeight;  
    BaseCircleIMG.style.animation = 'scaletoShow .4s linear 1';
    
    characterIMG.style.animation = 'none'; 
    characterIMG.offsetHeight;  
    characterIMG.style.animation = 'fadeToRight .4s linear 1';
    
    sodaBot.forEach(soda => soda.style.filter = "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))");
    circles.forEach(circle => circle.style.backgroundColor = "transparent");
    sodaBot[i].style.filter = "grayscale(1)";
    circles[i].style.backgroundColor = "var(--red)";
   
  })
})