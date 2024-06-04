const forms = document.querySelector('.forms');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');
const closeIcon = document.getElementById('close-icon');
const loginPupupBtn = document.getElementById('login-pupup-btn');


registerlink.addEventListener('click',()=> {
    forms.classList.add('active');
    forms.classList.remove('right');
});

loginlink.addEventListener('click',()=> {
    forms.classList.add('right');
    forms.classList.remove('active');
});

closeIcon.addEventListener('click',()=>{
    forms.classList.add('hide');
})
loginPupupBtn.addEventListener('click',()=>{
    forms.classList.remove('hide');
})