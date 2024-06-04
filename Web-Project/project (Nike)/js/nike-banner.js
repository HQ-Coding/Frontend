const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click',() =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click',() =>{
        navMenu.classList.remove('show-menu')
    })
}
/*=============== SHOW MENU ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== Swiper Shoe ================== */

let swiperShoes = new Swiper('.home__swiper', {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
    effect:'creative',
    creativeEffect:{
        prev:{
            translate:[-100, 0, -500],
            opacity:0,
        },
        next:{
            translate:[100, 0, -500],
            opacity:0,
        },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
/*=============== Shadow Header ================== */
const shadowHeader = ()=>{
    const header = document.getElementById('header')
        this.scrollY >= 50 ? header.classList.add('shadow-header')
                           : header.classList.remove('shadow-header')
}
window.addEventListener('scroll',shadowHeader)