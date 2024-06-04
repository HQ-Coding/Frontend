const homeLink =document.querySelector(".home-link");
const loginJoin =document.querySelector(".login-join");
const visibilityOff =document.querySelector(".visibility_off");
const visibility =document.querySelector(".visibility");
const password =document.querySelector(".password");

const home =document.querySelector(".home");
const join=document.querySelector(".join");


homeLink.addEventListener('click',()=>{
    home.classList.remove("hidden");
    join.classList.add("hidden");
}
)
loginJoin.addEventListener('click',()=>{
    home.classList.add("hidden");
    join.classList.remove("hidden");
}
)

visibilityOff.addEventListener('click',()=>{
    visibility.classList.toggle("hidden");
    visibilityOff.classList.toggle("hidden");

    if (password.type === "password") {
        password.type = "text";
      }else {
        password.type = "password";
      }


}
)
visibility.addEventListener('click',()=>{
    visibility.classList.toggle("hidden");
    visibilityOff.classList.toggle("hidden");

    if (password.type === "password") {
        password.type = "text";
      }else {
        password.type = "password";
      }
}
)
