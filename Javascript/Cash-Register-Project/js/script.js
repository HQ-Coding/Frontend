let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const priceScreen = document.getElementById("price")
const cash = document.getElementById("cash")
const purchaseBTN = document.getElementById("purchase-btn")
const changeDue = document.getElementById("change-due")
const Status = document.getElementById("Status")
const cidDisplay = document.getElementById("cid")
priceScreen.textContent = `Total: $${price}`;

const CurrencyUnit = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];
let rcu = CurrencyUnit.reverse()

const addToDisplay =(arr)=>{
  const displayHTML = arr.map((unit) => `<p>${unit[0]}: $${unit[1]}</p>`).join('');
  return displayHTML
}
cidDisplay.innerHTML += addToDisplay(cid);

let reversedCid = [...cid].reverse();

//============================
const compute = (total, moneyAmount)=>{
  const costomerDisplay= []
  moneyAmount.forEach((arr ,index)=>{
      let count = 0
      while(total >= rcu[index][1] && arr[1] >= rcu[index][1]){
          total= Number(parseFloat(total - rcu[index][1]).toFixed(2))
          arr[1] = Number(parseFloat(arr[1] - rcu[index][1]).toFixed(2))
          count ++;}

      if( count > 0 ){
        costomerDisplay.push([rcu[index][0], count * rcu[index][1]])}
      }) 

  let CashierDisplay = [...moneyAmount].reverse();
  return{total,costomerDisplay,CashierDisplay}
}
//========== main
const CurrencyAmount = ( money ) =>{
  const sum = cid.reduce((total, current) => total + Number(current[1]), 0);
  money = money - price

  if(sum < money){
    return (changeDue.innerHTML = '<p id="Status" style="color:red">Status: INSUFFICIENT_FUNDS</p>');
  }
  else{
    const result = compute(money,reversedCid)
    if(result.total > 0){
      changeDue.innerHTML = `<p id="Status">Status: INSUFFICIENT_FUNDS</p>`
    }
    else if(sum == money){
      changeDue.innerHTML = `<p id="Status">Status: CLOSED</p>`
      changeDue.innerHTML += addToDisplay(result.costomerDisplay);
    }
    else{
      changeDue.innerHTML = `<p id="Status">Status: OPEN</p>`
      changeDue.innerHTML += addToDisplay(result.costomerDisplay);
      cidDisplay.innerHTML = ``
      cidDisplay.innerHTML += addToDisplay(result.CashierDisplay);
    }}
    console.log(sum)
    console.log(money,"money")
  }
//  ======= click
purchaseBTN.addEventListener('click',()=>{
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }
  else if(Number(cash.value) == price){
    changeDue.innerHTML =
    '<p id="Status">No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
}
  else{
    CurrencyAmount(Number(cash.value))
    cash.value = '';
    return;
  }})

cash.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      CurrencyAmount(Number(cash.value))}})