const outputText = document.getElementById('output');
const convertBtn = document.getElementById('convert-btn');
 
const isValid = (inputNumber, int) => {
    let errText = '';
   
    // console.log(inputNumber)
    // console.log(typeof(inputNumber))
    
    // console.log(int)
    // console.log(typeof(int))

    if(!inputNumber || inputNumber.match(/[e.]/g)){
        errText = "Please enter a valid number"
    }
    else if(Number(int) < 1){
        errText = "Please enter a number greater than or equal to 1"
    }
    else if(Number(int) >= 4000){
        errText = "Please enter a number less than or equal to 3999"
    }
    else{
        console.log("No errors detected")
        return true
    }
    
    outputText.innerText = errText;
    outputText.classList.add('alert');
    return false
};

const convertToRoman = num => {
    const ref = [
      ['M', 1000],
      ['CM', 900],
      ['D', 500],
      ['CD', 400],
      ['C', 100],
      ['XC', 90],
      ['L', 50],
      ['XL', 40],
      ['X', 10],
      ['IX', 9],
      ['V', 5],
      ['IV', 4],
      ['I', 1]
    ];
    const res = [];
  
    ref.forEach(function (arr) {
      while (num >= arr[1]) {
        res.push(arr[0]);
        num -= arr[1];
      }
    });
  
    return res.join('');
  };

  
const clearOutput = () => {
    outputText.innerText = '';
    outputText.classList.remove('alert');
    outputText.classList.remove('isValid');
  };

const updateUI = () => {
    const inputNumber = document.getElementById('number').value;
    const int = Number(inputNumber);
  
    clearOutput();
  
    if (isValid(inputNumber, int)) {
      output.innerText = convertToRoman(int);
      outputText.classList.add('isValid');
    }
  };


convertBtn.addEventListener('click', () => {
    updateUI();
  });