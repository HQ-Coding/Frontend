let result1 = document.querySelector('.calculation1')
let result2 = document.querySelector('.calculation2')

let sum = ["++" ,"-+","/+","%+",'*+','.+']
let minus = ["+-" ,"--","/-","%-",'*-','.-']
let multiplication = ["+*" ,"-*","/*","%*",'**','.*']
let Division = ["+/" ,"-/","//","%/",'*/','./']
let Percent= ["+%" ,"-%","/%","%%",'*%',".%"]
let auditor= ["+." ,"-.","/.","%.",'*.',".."]


function cal(val){

    
    result1.innerHTML += val;
  
    for (let i in sum)
        result1.innerHTML = result1.innerHTML.replace(sum[i],'+');
    for (let i in minus)
        result1.innerHTML = result1.innerHTML.replace(minus[i],'-');
    for (let i in multiplication )
        result1.innerHTML = result1.innerHTML.replace(multiplication [i],'*');
    for (let i in Division )
        result1.innerHTML = result1.innerHTML.replace(Division [i],'/');
    for (let i in Percent)
        result1.innerHTML = result1.innerHTML.replace(Percent[i],'%');
    for (let i in auditor)
        result1.innerHTML = result1.innerHTML.replace(auditor[i],'.');

    let stringResult = result1.innerHTML;
    return stringResult
}
function mosavi(){
    result1.classList.add('grey')
    result2.classList.remove('grey')
}
function clearall(){
    result1.innerHTML = ''
    result2.innerHTML = ''
    result1.classList.remove('grey')
    result2.classList.add('grey')
}
function backspace(){
    result1.innerHTML = result1.innerHTML.slice(0,-1)
}

//---------------------------- 

document.onclick = function(){
    let strings =cal("")
    if (eval(strings)== undefined){
        result2.innerHTML = ""
    }
    else{
    result2.innerHTML = (eval(strings))}
}

