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
        <img src="${imgLink}" alt="${name} image">
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
    
    if(webDataArr.length <= webEndingIndex){
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
    
    if(jsDataArr.length <= jsEndingIndex){
        moreJsBtn.disabled = true ;
        moreJsBtn.textContent = 'No more data to load';
    }
};

moreJsBtn.addEventListener('click',fetchMoreJs)
// ===========================
fetchData()


