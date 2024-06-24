const albumCover = document.querySelector(".album-cover");
const musicBase = document.querySelector(".swiper-wrapper");
const songName = document.getElementById("songName");
const songBy = document.getElementById("songBy");
const cover = document.querySelector(".cover");
const source = document.querySelector('source');
const audio = document.getElementById('audio');
const timeDisplay = document.getElementById('time-display');
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const playStop = document.querySelector("#playStop")
const stopMusic = document.querySelector(".bx-stop")
const playMusic = document.querySelector(".bx-play")
const downloadButton = document.getElementById('download');

var swiper; // global instance
let info ; // global instance
let duration; // global instance
let currentTime; // global instance

const fetchData = async () => {
  try {
    const res = await fetch('../json/data.json');
    const data = await res.json();
    info = data.musicInfo;
    showCardsInDisplay(info);
    
    await initializeSwiper();
    await goToMiddle();
    slideClickToPlay();

    console.log("fetchData RUN successfully %csuccessfully", 'color: green');

  } catch (err) {
    console.log(err);
  }
};

const showCardsInDisplay = (items) => {
  items.forEach((item) => {
    const { img, title } = item;
    musicBase.innerHTML += `
      <div class="swiper-slide">
        <div class="song">
          <img class="img-Ref" src="${img}" alt="${title} song Cover">
        </div>
      </div>
    `;
  });
};

// ===================================================== 

const initializeSwiper = () => {
  return new Promise((resolve) => {
    const mySwiper = document.querySelector(".mySwiper");
    swiper = new Swiper(mySwiper, { 
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 1,
      
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        init: function() {
          resolve();
        }
      }
    });
  });
};

fetchData();

// ==================================================== base Functions

const slideClickToPlay = () =>{
    const slidesList = document.querySelectorAll(".swiper-slide");
    slidesList.forEach((element, index) => {
      element.addEventListener("click", () => {
        swiper.slideTo(index);
        
        toPlay(index)
      });
    });
}

const goToMiddle = ()=>{
  const middle = Math.round((swiper.slides.length) / 2 - 1);
  swiper.slideTo(middle);
  loadDataOnDisply(middle)
}

const toPlay = (index) =>{
  cover.style.backgroundImage = `url(${info[index].img})`
  loadDataOnDisply(index)
}

const loadDataOnDisply = (index) =>{
  songName.textContent =  info[index].title ;
  songBy.textContent = info[index].artist;
  source.src = info[index].link;
  audio.load()
  audio.pause();
  stopMusic.style.display = "none"
  playMusic.style.display = "block"
  handleDownload(info[index].link, info[index].title, info[index].artist)
}

// ==================================================== Time display
audio.addEventListener('loadedmetadata', () => {
    duration = audio.duration;
    updateDisplay();
  });
audio.addEventListener('timeupdate', () => {
    currentTime = audio.currentTime;
    updateDisplay();
  });

function updateDisplay() {
  if (duration !== undefined && currentTime !== undefined) {
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

// ==================================================== Button action
next.addEventListener("click", ()=>{
  let currentIndex = swiper.activeIndex ;
  if( currentIndex < swiper.slides.length && currentIndex >= 0 ){
    let nextSlide = currentIndex +1;
    swiper.slideTo(nextSlide);
    toPlay(nextSlide)
  }
})
prev.addEventListener("click", ()=>{
  let currentIndex = swiper.activeIndex ;
  if( currentIndex < swiper.slides.length && currentIndex >= 0 ){
    let prevtSlide = currentIndex - 1;
    swiper.slideTo(prevtSlide);
    toPlay(prevtSlide)
  }
})

playStop.addEventListener("click", ()=>{
  if (audio.paused) {
    audio.play();
    playMusic.style.display = "none"
    stopMusic.style.display = "block"
  } else {
    audio.pause();
    stopMusic.style.display = "none"
    playMusic.style.display = "block"
  }
});


const handleDownload = (link, title, artist) => {
  // downloadButton.setAttribute('data-href', link);

  downloadButton.addEventListener('click', () => {
    // const hrefValue = downloadButton.getAttribute('data-href');
    const hrefValue = link;
  
    const tempLink = document.createElement('a');
    tempLink.href = hrefValue;
    tempLink.download = `${title} By ${artist}`; // Create a custom name for the file when downloading.
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  });
};

// ====================================================

