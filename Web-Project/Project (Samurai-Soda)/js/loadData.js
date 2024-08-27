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
                  </div>
                  <div class="col-lg-6 col-sm-12">
                    <div class="cardInfo">
                      <h6>Samurai Soda</h6>
                      <h3>${card.name}</h3>
                      <p>${card.description}</p>
                      <div class="cardButton">
                        <div class="cardIcons">
                          <button class="decrease"><i class='bx bxs-chevron-left-circle'></i></button>
                          <span class="showNumber">0</span>
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


    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const currentCount = cards[index].count
            const INTshowNumber = parseInt(showNumber[index].textContent)
            
            if(currentCount > INTshowNumber){            
                i++
                showNumber[index].textContent = INTshowNumber + 1; 
            }else{
                alert("Maximum limit reached")
            }   
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const INTshowNumber = parseInt(showNumber[index].textContent)
           
            if(INTshowNumber >= 1 ){
                showNumber[index].textContent = INTshowNumber - 1;
                
            }else{
                alert("Cannot decrease below zero")
            }   
        });
    });

    addToCart.forEach((button, index) => {
        button.addEventListener('click', () => {
            const currentCount = cards[index].count
            const INTshowNumber = parseInt(showNumber[index].textContent)
           

            showNumber[index].textContent = 0 ;
        });
    });


}
