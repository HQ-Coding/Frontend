// ====================== Selectors ======================
const DOM = {
  aboutMeSection: document.querySelector("#aboutME"),
  experiance_Info_Box: document.querySelector("#experience-list"),
  experianceINFO_Section : document.querySelector("#experianceINFO"),
  educationINFO_Section : document.querySelector("#educationINFO"),
  education_Info_Box: document.querySelector("#education-list"),
  aboutMeTextHTML: document.querySelector('.aboutMeText'),
  catBox: document.querySelector(".catBox"),
  catReading: document.querySelector(".catReading"),
  catTextBox: document.querySelector(".catTextBox"),
  myExpSection: document.querySelector("#myExperianceSection"),
  expObjs: document.querySelector("#experience_Item"),
  skillBars: document.querySelector("#skillBars"),
  certificate_List : document.querySelector('.slider-track'), //* #certificate_List* != slider-track
  projects: document.querySelector('#projects'),
  projectCardList: document.getElementById('projectCard_list'),
  addMoreCard: document.getElementById('addMoreCard'),
  contact: document.getElementById('contact'),
  character: document.getElementById('character'),
  shape01: document.getElementById('shape01'),
  shape02: document.getElementById('shape02'),
  shape03: document.getElementById('shape03'),
  RightHand: document.getElementById('RightHand'),
  LeftHand: document.getElementById('LeftHand'),
};

// ====================== Utils ======================
const onScroll = (() => {
  let listeners = [];
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    listeners.forEach(cb => cb(scrollY));
  });
  return (callback) => listeners.push(callback);
})();

function createObserver(viewHeight, toggle, sectionChild, className) {
  const observerHTML = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (toggle) {
          sectionChild.classList.add(className);
        } else {
          sectionChild.classList.add(className);
        }
      } else {
        if (toggle) {
          sectionChild.classList.remove(className); 
        }
      }
    });
  }, { threshold: viewHeight });

  return observerHTML;
}

const handelObjectScroll = (sectionEl, targetEl, newClassName, scrollPositionDivider, doToggle) => {
  onScroll(() => {
    const sectionTop = sectionEl.offsetTop;
    const sectionHeight = sectionEl.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight / scrollPositionDivider;

    if (doToggle) {
      targetEl.classList.toggle(newClassName, scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight);
    } else {
      targetEl.classList.add(newClassName);
    }
  });
};

const typingAnimation = (element, text) => {
  element.textContent = "";
  [...text].forEach((char, i) => {
    setTimeout(() => {
      element.textContent += char;
    }, i * 50);
  });
};

// ====================== Data Fetch ======================
const fetchJSON = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Fetch Error: ${url}`, err);
    return null;
  }
};

// ====================== Render Functions ======================
const renderExperience = (list) => {
  DOM.experiance_Info_Box.innerHTML = list.map(obj =>
    `<p class='pLightGray'>${obj.duration} ${obj.title}</p>`
  ).join("");
};

const renderEducation = (list) => {
  DOM.education_Info_Box.innerHTML = list.map(obj =>
    `<p class='pLightGray'>${obj.degree}</p>`
  ).join("");
};

const renderSkills = (skills) => {
  DOM.skillBars.innerHTML = skills.map(obj => `
    <div class="skillBar">
      <div class="label font-extrabold uppercase">${obj.name}</div>
      <p class="experianceLevel text-sm mb-2 text-gray-500 italic">${obj.level}</p>
      <div class="bar" style="--value: ${obj.percent}%;"><div class="fill"></div><span class="percent">${obj.percent}%</span></div>
    </div>
  `).join("");
};

const renderExpList = (list) => {
  DOM.expObjs.innerHTML = list.map(obj =>`
  <li class="flex gap-1 items-center my-2 ml-10">
    <svg class="w-[40px] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z"/>
    </svg>
    <span class="pDarkGray text-sm sm:text-lg md:text-xl">${obj}</span>
  </li>`
)
.join('');
};

const renderCertificate = (list) => {
  DOM.certificate_List.innerHTML = list.map(obj => `
    <a href="${obj.link}"
        target="_blank"  
        class="certificate w-[100px] sm:w-[200px] flex-shrink-0 border-custom rounded-md flex flex-col items-center border p-5 mx-auto"
        style="--value:${obj.color}">
      <svg class="w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        ${obj.path}
      </svg>
      <p class="text-center certificate-Name mt-5" >${obj.name}</p>
      <p class="text-center font-semibold text-gray-400">${obj.tag}</p>
    </a>
  `).join('');
};

// ====================== Init App ======================
const initApp = async () => {
  const data = await fetchJSON('base/db/db.json');
  if (!data) return;

  const { aboutMeText, experianceINFO, educationINFO, skills ,experienceItem , certificateList } = data;

  console.log(certificateList);

  if (DOM.aboutMeTextHTML) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typingAnimation(entry.target, aboutMeText);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(DOM.aboutMeTextHTML);
  }

  if (DOM.experiance_Info_Box) renderExperience(experianceINFO);
  if (DOM.education_Info_Box) renderEducation(educationINFO);
  if (DOM.skillBars) renderSkills(skills);
  if (DOM.expObjs) renderExpList(experienceItem);
  if (DOM.certificate_List) renderCertificate(certificateList);

  if(DOM.catBox, DOM.catReading, DOM.catTextBox){
    const elementsToAnimate = [DOM.catBox, DOM.catReading, DOM.catTextBox];

    elementsToAnimate.forEach(el => {
      const myObserver = createObserver(0.5, true, el, 'fixed');
      myObserver.observe(DOM.aboutMeSection);
    });
  }  
};

// initApp();

// ====================== Projects (cards) ======================
let CardList = [];
let CardListStartingIndex = 0;
let CardListEndingIndex = 3;

const addCardsToHTML = (list = []) => {
  if (!DOM.projectCardList) {
    console.warn("projectCard_list not found");
    return;
  }
  const html = list.map(obj => `
    <div class="projectCard max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-around">
      <img class="w-full" loading="lazy" src="${obj.imgLink}" alt="${obj.name}">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${obj.name}</div>
        <p class="text-gray-700 md:text-base text-xs">${obj.category}</p>
      </div>
      <div class="flex items-center justify-center sm:flex-row flex-col gap-2 mb-5 w-100">
        <a href="${obj.gitLink}" target="_blank" rel="noopener" class="inline-flex items-center px-4 py-2 md:text-sm text-xs font-medium text-center rounded-lg border border-black w-100">GitHub</a>
        <a href="${obj.webLink}" target="_blank" rel="noopener" class="inline-flex items-center py-2 px-4 md:text-sm text-xs font-medium text-center rounded-lg border border-black w-100">Demo</a>
      </div>
    </div>
  `).join('');

  DOM.projectCardList.insertAdjacentHTML('beforeend', html);

  const cards = DOM.projectCardList.querySelectorAll('.projectCard')
  if(cards.length){
    cards.forEach(el => {
      const myObserver = createObserver(.2, false , el, 'fadeOut');
      myObserver.observe(el);
    });
  } 
};

const fetchCardsData = async () => {
  const data = await fetchJSON('base/db/projects.json');
  if (!data || !Array.isArray(data.projects)) {
    console.error('Projects data invalid or not found');
    return;
  }
  CardList = data.projects;
  addCardsToHTML(CardList.slice(CardListStartingIndex, CardListEndingIndex));
};

const fetchMoreCard = () => {
  CardListStartingIndex += 3;
  CardListEndingIndex += 3;
  addCardsToHTML(CardList.slice(CardListStartingIndex, CardListEndingIndex));

  if (DOM.addMoreCard && CardListEndingIndex >= CardList.length) {
    DOM.addMoreCard.disabled = true;
    DOM.addMoreCard.textContent = 'No more data to load';
  }
};

if (DOM.addMoreCard) {
  DOM.addMoreCard.addEventListener('click', fetchMoreCard);
}

// ====================== Hover Animation (Event Delegation) ======================
document.addEventListener('pointerenter', (e) => {
  const target = e.target.nodeType === 1 ? e.target : e.target.parentElement;
  const card = target?.closest('.projectCard');
  if (card && !card.classList.contains('rainbow-glow')) {
    card.classList.add('rainbow-glow');
  }
}, true);

document.addEventListener('pointerleave', (e) => {
  const target = e.target.nodeType === 1 ? e.target : e.target.parentElement;
  const card = target?.closest('.projectCard');
  if (card && card.classList.contains('rainbow-glow')) {
    setTimeout(() => {
      card.classList.remove('rainbow-glow');
    }, 500);
  }
}, true);

// ====================== Skill Fill Animation (IntersectionObserver) ======================
const observeSkillFills = () => {
  const fills = document.querySelectorAll('.fill');

  if (!fills.length || !DOM.myExpSection) {
    console.warn("عنصرهای لازم برای اجرای این تابع پیدا نشدند.");
    return;
  }

  fills.forEach(el => {
    const myObserver = createObserver(0.5, true, el, 'filled');
    myObserver.observe(DOM.myExpSection);
  });
  
};

// ====================== scrollProgressForSection (using onScroll util) ======================
const scrollProgressForSection = (sectionTAG, positionDivider = 1, callback) => {
  const section = document.querySelector(sectionTAG);
  if (!section) {
    console.error(`Section ${sectionTAG} not found`);
    return;
  }

  // compute on each scroll using the shared onScroll
  onScroll(() => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.scrollHeight || section.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight / positionDivider;

    const scrollInSection = Math.min(Math.max(scrollPos - sectionTop, 0), sectionHeight);
    const scrollPercent = sectionHeight === 0 ? 0 : (scrollInSection / sectionHeight);
    callback({ scrollPercent });
  });
};

// ====================== Contact Section Animations ======================
if (DOM.contact) {
  scrollProgressForSection("#contact", 0.65, ({ scrollPercent }) => {
    if (DOM.character) DOM.character.style.transform = `translateY(${100 - scrollPercent * 100}%)`;
  });

  scrollProgressForSection("#contact", 0.8, ({ scrollPercent }) => {
    if (DOM.LeftHand) DOM.LeftHand.style.transform = `translateX(${100 - scrollPercent * 100}%)`;
  });

  scrollProgressForSection("#contact", 0.8, ({ scrollPercent }) => {
    if (DOM.RightHand) DOM.RightHand.style.transform = `translateX(-${100 - scrollPercent * 100}%)`;
  });

  scrollProgressForSection("#contact", 0.8, ({ scrollPercent }) => {
    if (DOM.shape02) DOM.shape02.style.transform = `rotate(${scrollPercent * 180}deg)`;
  });

  scrollProgressForSection("#contact", 0.8, ({ scrollPercent }) => {
    if (DOM.shape03) DOM.shape03.style.transform = `rotate(-${scrollPercent * 180}deg)`;
  });

  scrollProgressForSection("#contact", 2, ({ scrollPercent }) => {
    if (DOM.shape01) DOM.shape01.style.transform = `rotateX(-${scrollPercent * 180}deg)`;
  });
}

// ====================== Run remaining initializations ======================
if(DOM.experianceINFO_Section , DOM.educationINFO_Section) {
  const elementsToAnimate = [DOM.experianceINFO_Section , DOM.educationINFO_Section ];
  elementsToAnimate.forEach(el => {
    const myObserver = createObserver(0.25, true, el, 'show');
    myObserver.observe(DOM.aboutMeSection);
  });
}

const runRemaining = async () => {
  await initApp();
  sliderCards()
  observeSkillFills();
  await fetchCardsData();
};

// run after initApp (initApp from previous block already called earlier)
// if initApp hasn't finished yet, this still works because fetchCardsData uses fetchJSON
runRemaining();

const sliderCards = () => {
  const track = document.querySelector('.slider-track');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const cards = document.querySelectorAll('.certificate');

  let cardsPerView;
  let currentIndex = 0;

  let isDragging = false;
  let startX = 0;
  let prevTranslate = 0;
  let currentTranslate = 0;

  function setCardsPerView() {
    const width = window.innerWidth;
    if (width < 640) { cardsPerView = 2; }
    else if (width < 1024) { cardsPerView = 3; }
    else { cardsPerView = 5; }
    const maxIndex = cards.length - cardsPerView;
    if (currentIndex > maxIndex) currentIndex = Math.max(0, maxIndex);
    updateSlider();
  }

  function getCardWidth() {
    const style = getComputedStyle(cards[0]);
    return cards[0].offsetWidth + parseInt(style.marginRight);
  }

  function updateSlider() {
    const cardWidth = getCardWidth();
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    prevTranslate = -currentIndex * cardWidth;
  }

  function dragStart(position) {
    isDragging = true;
    startX = position;
    track.style.transition = 'none';
  }

  function dragMove(position) {
    if (!isDragging) return;
    const diff = position - startX;
    currentTranslate = prevTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`; // ← حرکت زنده
  }

  function dragEnd(position) {
    if (!isDragging) return;
    isDragging = false;
    const diff = position - startX;
    const threshold = 50;
    if (diff > threshold && currentIndex > 0) {
      currentIndex--;
    } else if (diff < -threshold && currentIndex < cards.length - cardsPerView) {
      currentIndex++;
    }
    updateSlider();
  }

  // Mouse
  track.addEventListener('mousedown', e => {
    dragStart(e.clientX);
    function mouseMove(e) { dragMove(e.clientX); }
    function mouseUp(e) {
      dragEnd(e.clientX);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  });

  // Touch
  track.addEventListener('touchstart', e => {
    dragStart(e.touches[0].clientX);
    function touchMove(e) { dragMove(e.touches[0].clientX); }
    function touchEnd(e) {
      dragEnd(e.changedTouches[0].clientX);
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
    }
    window.addEventListener('touchmove', touchMove);
    window.addEventListener('touchend', touchEnd);
  });

  prev.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateSlider();
  });

  next.addEventListener('click', () => {
    if (currentIndex < cards.length - cardsPerView) currentIndex++;
    updateSlider();
  });

  window.addEventListener('resize', setCardsPerView);
  setCardsPerView();
};

