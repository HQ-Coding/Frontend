const CardsField = document.querySelector('#CardsField'); // Single DOM element, no need to use [0]

const fetchCards = async () => {
    try {
        const res = await fetch('../json/data.json');
        const data = await res.json();
        const cards = data.SodaBottleIMG;
        LoadCardDisplay(cards); 
        attachEventListeners(cards)
    } catch (err) {
        console.log(err);
    }
};

const LoadCardDisplay = (cards) => {
    CardsField.innerHTML = "";  // Clear previous content
    cards.forEach(card => {
        CardsField.innerHTML +=
        `
        <!-- Card ${card.id} -->
        <div class="col-lg-4 col-md-6 col-sm-6 cardBot">
              <div class="card container-fluid">
                <span class="cardBody"></span>
                <div class="row align-items-end">
                  <div class="col-lg-6 col-sm-12">
                    <div class="product">
                      <div class="soda" style="--url: url('${card.img_url}')"></div>
                    </div>
                    <div id="price">${card.price}$</div>
                  </div>
                  <div class="col-lg-6 col-sm-12">
                    <div class="cardInfo">
                      <h6>Samurai Soda</h6>
                      <h3>${card.name}</h3>
                      <p>${card.description}</p>
                      <div class="cardButton">
                        <div class="cardIcons">
                          <button class="decrease"><i class='bx bxs-chevron-left-circle'></i></button>
                          <span >
                          <input class="showNumber" type="number" id="number-input" placeholder="0" min="0" max="100" value="0">
                          </span>
                          <button class="increase"><i class='bx bxs-chevron-right-circle'></i></button>
                        </div>
                        <button class="addToCart">ADD</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>                            
            </div>`
    });

};


fetchCards();

const attachEventListeners = (cards) => {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const showNumber = document.querySelectorAll('.showNumber');
    const addToCart = document.querySelectorAll('.addToCart');
    const shopList = document.querySelector('.cart-Items');

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const currentCount = cards[index].count
            const INTshowNumber = parseInt(showNumber[index].value)
            
            if(currentCount > INTshowNumber){            
                i++
                showNumber[index].value = INTshowNumber + 1; 
            }else{
                alert("Maximum limit reached")
            }   
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const INTshowNumber = parseInt(showNumber[index].value)
           
            if(INTshowNumber >= 1 ){
                showNumber[index].value = INTshowNumber - 1;
                
            }else{
                alert("Cannot decrease below zero")
            }   
        });
    });

    addToCart.forEach((button, index) => {
      button.addEventListener('click', () => {

        const INTshowNumber = parseInt(showNumber[index].value)
        const {id ,name , price , soda_url} = cards[index]
       
        // LoadCartItem( id ,  name , price, img_url , INTshowNumber )
        if( INTshowNumber >= 1){
          shopList.innerHTML += 
          `
          <div class="cart-Item">
          <img src="${soda_url}" alt="${name} soda img">
          <div class="cart-detail">
            <h5 id="productName">name : ${name} #${id}</h5>
            <p id="count">Count : ${INTshowNumber}</p>
            <p id="price">Price : <span>${price }</span>$</p>
            <p id="TotalofProduct">Total : <span>${ price * INTshowNumber}</span>$</p>
          </div>
          <button id="delete">delete</button>
          </div>`
          }

          showNumber[index].value = "0";
          deleteFromCart();
          CalcShopList();      
        });
    });
}



// const LoadCartItem = (id ,  name , price, img_url , count ) => {
  
// }


const total = document.querySelector("#total span")
const taxs = document.querySelector("#taxs span")
const shouldPay = document.querySelector("#shouldPay span")

const deleteFromCart = () => {
  const deleteCartItemButtons = document.querySelectorAll('#delete'); 
  const shopListItems = document.querySelectorAll('.cart-Item'); 
  
  deleteCartItemButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      shopListItems[index].remove(); 
    });
  });
  CalcShopList();
};

const CalcShopList = () => {
  let shopListTotal = 0
  const shopListItems = document.querySelectorAll('.cart-Item'); 

  shopListItems.forEach((item, index) => {
    const totalElement = item.querySelector('#TotalofProduct span');
    let currentItemTotal = parseInt(totalElement.textContent) ;
    shopListTotal += currentItemTotal
  });


  taxs.textContent = ( (2/100) * shopListTotal)
  total.textContent = shopListTotal
  shouldPay.textContent = shopListTotal + (( (5/100) * shopListTotal))
};

