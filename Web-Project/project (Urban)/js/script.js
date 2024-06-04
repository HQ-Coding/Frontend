// Utility ========================================

function sliderNumberChanger(slidelist, textId) {
  for (let i = 0; i < slidelist.length; i++) {
    if (slidelist[i].classList.contains('active')) {
      textId.innerHTML = `${i+1}/${slidelist.length}`;
    }
  }
}
// dropdown menu function 
const menubar = (itemList , items) =>{
  items.forEach((element) => element.addEventListener("click",()=>{
      itemList.innerHTML = element.innerHTML;
      console.log(itemList)
  }));
}

// dropdown menu HTML ==========================

const dropdownMenuHTML = 
`<div class="searchbar container border mx-auto mt-3 p-3 " style="border-radius: 25px;">
<div class="row ">
  <p class="col-1 bsb bold" >Buy</p>
  <p class="col-1 rsb" >Rent</p>
</div>
<div class="row my-2">

<!-- dropdown 1 -->
  <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mx-auto text-left">
    <h6>Location</h6>
    <div class="dropdown show">
      <a class="w-75 cityMenu dropdown-toggle dropdown-pro" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Citys
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="citys dropdown-item" >NewYork City</a>
        <a class="citys dropdown-item" >Washington Dc</a>
        <a class="citys dropdown-item" >California</a>
      </div>
    </div>
  </div>
  <!-- dropdown 2 -->
  <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mx-auto text-left">
    <h6>Property Type</h6>
    <div class="dropdown show">
      <a class="w-75 propertyMenu dropdown-toggle dropdown-pro" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Property
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="property dropdown-item" >Villa</a>
        <a class="property dropdown-item" >Duplex House</a>
        <a class="property dropdown-item" >Apartment</a>
      </div>
    </div>
  </div>
  <!-- dropdown 3 -->
  <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mx-auto text-left">
    <h6>Price Range</h6>
    <div class="dropdown show">
      <a class="w-75 costMenu dropdown-toggle dropdown-pro" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Price
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="cost dropdown-item" >$12,000-$40,000</a>
        <a class="cost dropdown-item" >$40,000-$60,000</a>
        <a class="cost dropdown-item" >$60,000-$90,000</a>
      </div>
    </div>
  </div>

  <!-- dropdown button -->
  <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mx-auto text-left align-self-end">
    <button class="buttons-black w-75 fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
    </svg> search</button>
  </div>

</div>
</div>
<!--======== dropdown menu for search ======= END -->`
// ===================================================
const searchbar1 = document.querySelector(".searchbar-parent1.container")
const searchbar2 = document.querySelector(".searchbar-parent2.container")

const onWindowResize = ()=>{
    if( window.innerWidth > 992){
        searchbar1.innerHTML = dropdownMenuHTML
        searchbar2.innerHTML = " "
        
    }else if(window.innerWidth < 992 ){
        searchbar2.innerHTML = dropdownMenuHTML
        searchbar1.innerHTML = " "
    }
}

if( window.innerWidth > 992){
  searchbar1.innerHTML = dropdownMenuHTML
  searchbar2.innerHTML = " "
  
}else if(window.innerWidth < 992 ){
  searchbar2.innerHTML = dropdownMenuHTML
  searchbar1.innerHTML = " "
}
window.addEventListener('resize', onWindowResize)

const cityMenu = document.querySelector(".cityMenu" );
const citys = document.querySelectorAll(".citys");
const propertyMenu = document.querySelector(".propertyMenu");
const property = document.querySelectorAll(".property");
const costMenu = document.querySelector(".costMenu");
const cost = document.querySelectorAll(".cost");

menubar(cityMenu,citys)
menubar(costMenu,cost)
menubar(propertyMenu,property)
    
// ===================================================
const bsb = document.getElementsByClassName("bsb")[0]; 
const rsb = document.getElementsByClassName("rsb")[0]; 

bsb.addEventListener("click", () => {
  bsb.classList.add("bold");
  rsb.classList.remove("bold");

});

rsb.addEventListener("click", () => {
  rsb.classList.add("bold");
  bsb.classList.remove("bold");
});

// ===================================================
const slideNumber = document.querySelector(".wwdSlideNumber")
const slideID = document.querySelectorAll(".whatWeDo .carousel-item")

const intervalId = setInterval(function() {
  sliderNumberChanger(slideID, slideNumber);
}, 500);

// ==================================================

const cards = document.querySelectorAll(".cols");

const observer = new IntersectionObserver(entries =>{
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting)
    if (entry.isIntersecting) observer.unobserve(entry.target)

  }),
  {
    threshold : .3,
  }
  
})

cards.forEach(card=>{
  observer.observe(card)
})
