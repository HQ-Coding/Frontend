const menu = document.querySelector('.menu-bar');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close');

menuIcon.addEventListener('click',()=>{
    menu.classList.remove('hide')
})
closeIcon.addEventListener('click',()=>{
    menu.classList.add('hide')
})

// ==============================
let swiperShoes = new Swiper('.home__images', {
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
            translate:[100, 0, -500,100],
            opacity:0,
        },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })