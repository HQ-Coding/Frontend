

const observer = new IntersectionObserver (entries=>{
    entries.forEach((entry)=>{
        entry.target.classList.toggle("show",entry.isIntersecting)
        if (entry.isIntersecting) observer.unobserve(entry.target)
    }),
    {
      threshold : .5,
    }
  })

const toObserve = ( objList ) =>{
  objList.forEach(obj=>{
    observer.observe(obj)
  })
}