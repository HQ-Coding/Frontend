const fromDown = document.querySelectorAll(".fromDown");
const fromUp = document.querySelectorAll(".fromUp");
const fromleft = document.querySelectorAll(".fromLeft");
const fromRight = document.querySelectorAll(".fromRight");
const fade= document.querySelectorAll(".fade");

const cardBase = document.querySelectorAll(".base .section:nth-child(3) .col");


const observer = new IntersectionObserver(entries =>{
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting)
    if (entry.isIntersecting) observer.unobserve(entry.target)
  }),
  {
    threshold : .3,
  }
  
})


fromDown.forEach(obj=>{
  observer.observe(obj)
})
fromUp.forEach(obj=>{
  observer.observe(obj)
})
fromleft.forEach( obj =>{
  observer.observe(obj)
})
fromRight.forEach(obj=>{
  observer.observe(obj)
})
fade.forEach(obj=>{
  observer.observe(obj)
})


// ==================================

let isScrolling = false;

        window.addEventListener('wheel', (event) => {
            if (isScrolling) return;

            const sections = document.querySelectorAll('.section');
            const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);
            const delta = Math.sign(event.deltaY);
            let nextSectionIndex = currentSectionIndex + delta;
            nextSectionIndex = Math.max(0, Math.min(nextSectionIndex, sections.length - 1));
            const targetSection = sections[nextSectionIndex];
            if (targetSection) {
                isScrolling = true;
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    isScrolling = false;
                }, 1000); 
            }
        });

// ==================================
const swiperHTML = document.querySelector(".swiper-wrapper");

const fetchData = async () => {
  console.log("fetchData RUN successfully");
  try {
      const res = await fetch('../json/items.json');
      const data = await res.json();
      const { items } = data;
      getData(items);
  } catch (err) {
      console.log(err);
  }
};

const getData = (items) => {
  console.log(items);
  items.forEach((item) => {
    let { id, name, count, img, price } = item;

    if (id && name && img && price) {
      addToDisplay(id, name, count, img, price);
      console.log('getData RUN %csuccessfully', 'color: green');
    } else {
      console.log('%cthere is a problem in getData function', 'color: red');
    }
  });
};

const addToDisplay = (id, name, count, img, price) => {
  console.log('addToDisplay RUN %csuccessfully', 'color: green');
  const soldOutHTML = `<span class="sold center"><p class="font-4">SOLD OUT</p></span>`;
  const cardHTML = ` 
  <div class="swiper-slide">
    <div class="card">
      <img src="${img}" alt="Card image cap">
      <div class="card-body">
        <div class="flex-col-between w-100">
          <span class="font-1" id="name">${name}</span>
          <span class="font-2" id="price">${price}</span>
        </div>
      </div>
      <button class="btn w-100" id="${id}">Add to Cart</button>
    </div>
  </div>`;

  swiperHTML.innerHTML += cardHTML;
  const cards = document.querySelectorAll(".card")
  if(count === 0){
    cards[id - 1].innerHTML += soldOutHTML
  }
};


fetchData();


// ==================================
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});