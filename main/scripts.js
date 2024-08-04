const webCards = document.getElementById("webCards");
const jsCards = document.getElementById("jsCards");
const moreWebBtn = document.getElementById("webProjectBtn")
const moreJsBtn = document.getElementById("jsProjectBtn")

let webStartingIndex = 0;
let webEndingIndex = 8;
let webDataArr = [];

let jsStartingIndex = 0;
let jsEndingIndex = 8;
let jsDataArr = [];

const fetchData = async () => {
    console.log("fetchData RUN successfully");
    try {
        const res = await fetch('./main/info.json');
        const data = await res.json();
        webDataArr = data.WebProject
        jsDataArr = data.jsProject
        getWebData(webDataArr.slice(webStartingIndex, webEndingIndex))
        getJsData(jsDataArr.slice(jsStartingIndex,jsEndingIndex))

    } catch (err) {
        console.log(err);
    }
  };

//   =============================== load Web card data
const getWebData = (WebProjects)=>{
    WebProjects.forEach((obj)=>{
        const{name,imgLink,webLink,category} = obj;
        const cardHtml = 
        `<div class="col-md-4 card" style="width: 18rem;">
        <img src="${imgLink}" alt="${name} class="cardImg">
        <div class="card-body">
        <h5 class="card-title my-3">${name}</h5>
        <p class="card-text my-2">
            <span id="category">${category}</span>
        </p>
        <a href="${webLink}" class="btn w-100" target="_blank">Click Here</a>
        </div>
        </div>`
        webCards.innerHTML += cardHtml
    }) 
}
const fetchMoreWeb =()=>{
    webStartingIndex += 8;
    webEndingIndex += 8;
    getWebData(webDataArr.slice( webStartingIndex, webEndingIndex))
    
    if(webDataArr.length <= endingIndex){
        moreWebBtn.disabled = true ;
        moreWebBtn.textContent = 'No more data to load';
    }
};

moreWebBtn.addEventListener('click',fetchMoreWeb)
// ============================ java card data load
const getJsData = (jsProjects)=>{
    jsProjects.forEach((obj)=>{
        const{name,imgLink,webLink} = obj;
        const cardHtml = 
        `<div class="col-md-4 card" style="width: 18rem;">
        <img src="${imgLink}" alt="${name} image">
        <div class="card-body">
        <h5 class="card-title my-3">${name}</h5>
        <p class="card-text my-2">
        </p>
        <a href="${webLink}" class="btn w-100" target="_blank">Click Here</a>
        </div>
        </div>`
        jsCards.innerHTML += cardHtml
    }) 
}
const fetchMoreJs =()=>{
    jsStartingIndex += 8;
    jsEndingIndex += 8;
    getJsData(jsDataArr.slice(jsStartingIndex , jsEndingIndex))
    
    if(jsDataArr.length <= endingIndex){
        moreJsBtn.disabled = true ;
        moreJsBtn.textContent = 'No more data to load';
    }
};

moreJsBtn.addEventListener('click',fetchMoreJs)
// ===========================
fetchData()


// ==============================
document.addEventListener('mousemove', (e) => {
    const light = document.getElementById('light');
    const lightWidth = light.offsetWidth;
    const lightHeight = light.offsetHeight;
    let left = e.clientX - lightWidth / 2;
    let top = e.clientY - lightHeight / 2;
  
    left = Math.max(0, Math.min(left, window.innerWidth - lightWidth));
    top = Math.max(0, Math.min(top, window.innerHeight - lightHeight));
  
    light.style.left = `${left}px`;
    light.style.top = `${top}px`;
  });

// ============================================= lightmod

const LM = document.getElementById('lightMods');
const LMBTN = document.getElementById('lightModButton')
const sunBTN = document.getElementById('sun')
const moonBTN = document.getElementById('moon')


moonBTN.style.display = 'none';
LMBTN.addEventListener('click', () => {
    sunBTN.style.display = sunBTN.style.display === 'none' ? 'block' : 'none';
    moonBTN.style.display = moonBTN.style.display === 'none' ? 'block' : 'none';
    LM.style.clipPath = LM.style.clipPath === 'circle(100%)' ? 'circle(0%)' : 'circle(100%)' ;

    document.body.classList.toggle('light-mode');

})