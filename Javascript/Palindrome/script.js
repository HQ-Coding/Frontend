const input = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const output = document.getElementById('result');

checkBtn.addEventListener('click',()=>{
    const inputValue = input.value;
    if(inputValue  === ''){
        alert("Please input a value.")
    }
    else{
    let x = inputValue.replace(/[- _ + = / \\ \s+ . , : ) ( { } ! @ # $ % ^ & *]/g,'').toLowerCase()
    const y = x.split('').reverse().join('')
    
    if(y === x){
        output.classList.remove('hide')
        output.innerHTML = `${input.value} is a palindrome`
    }else if(y !== x){
        output.classList.remove('hide')
        output.innerHTML = `${input.value} is not a palindrome`   
    }
}
});

