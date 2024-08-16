const fromDown = document.querySelectorAll('.fromDown');
const fromUp = document.querySelectorAll('.fromUp');
const fromLeft = document.querySelectorAll('.fromLeft');
const fromRight = document.querySelectorAll('.fromRight');

const observer = new IntersectionObserver (entries => {
    entries.forEach( entry =>{
        entry.target.classList.toggle("show" , entry.isIntersecting)
        if(entry.IntersectionObserver) observer.unobserve(entry.target)
    }),
    {
        threshold : .5,
    }    
})

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