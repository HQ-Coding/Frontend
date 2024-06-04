let root = document.documentElement;
const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemonImage');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-button');

const DataBaseURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";


const isValid = ( PokemonsList, UserInput) => {
    console.log("isValid RUN successful")
    const pokemon = PokemonsList.find((obj) => obj.name === UserInput || obj.id == UserInput);
    if (pokemon) {
        pokemonINFO(pokemon.url);
    } else {
        alert("Pokémon not found");
    }
};

const pokemonINFO = async (url) => {
    console.log("pokemonINFO RUN successful")
    try {
        const res = await fetch(url);
        const data = await res.json();

        pokemonName.textContent = data.name.toUpperCase();
        pokemonID.textContent = `#${data.id}`;
        height.textContent = `Height: ${data.height}`;
        weight.textContent = `Weight: ${data.weight}`;

        const pokemonIMG = data.sprites;
        pokemonImage.innerHTML = `<img id="sprite" src="${pokemonIMG.front_default}" alt="${data.name} front default sprite">`;

        types.innerHTML = "";
        const Datatypes = data.types;
        for (let i = 0; i <= Datatypes.length - 1; i++) {
            let power = Datatypes[i].type.name;
            let powerUpper = power.toString().toUpperCase();
            types.innerHTML += `<span class="type ${power}">${powerUpper}</span>`;

            let element = document.querySelector(`.${power}`);
            let computedStyle = window.getComputedStyle(element);

            let colour = computedStyle.backgroundColor;
            root.style.setProperty(`--shadow-base-color-${i + 1}`, `${colour}`);
        }

        const stats = data.stats;
        for (let i = 0; i <= stats.length - 1; i++) {
            switch (stats[i].stat.name) {
                case "hp":
                    hp.textContent = stats[i].base_stat;
                    break;
                case "attack":
                    attack.textContent = stats[i].base_stat;
                    break;
                case "defense":
                    defense.textContent = stats[i].base_stat;
                    break;
                case "special-attack":
                    specialAttack.textContent = stats[i].base_stat;
                    break;
                case "special-defense":
                    specialDefense.textContent = stats[i].base_stat;
                    break;
                case "speed":
                    speed.textContent = stats[i].base_stat;
                    break;
                default:
                    console.log("SOMETHING WRONG IN STATS DATA !!!");
            }
        }
    } catch (err) {
        console.log(err);
    }
};


const fetchData = async () => {
    console.log("fetchData RUN successful")
    try {
        const res = await fetch(DataBaseURL);
        const data = await res.json();
        const { count, results } = data;
        return{ results };

    } catch (err) {
        console.log(err);
    }
};

const MainFunction = async () => {
    hp.textContent = "0";
    attack.textContent = "0";
    defense.textContent = "0";
    specialAttack.textContent = "0";
    specialDefense.textContent = "0";
    speed.textContent = "0";
    pokemonName.textContent = "";
    pokemonID.textContent = "";
    height.textContent = "";
    weight.textContent = "";
    types.innerHTML = "";
    pokemonImage.innerHTML = "";
    const x = await fetchData();
    const PokemonsList = x.results
    
    const userInput = searchInput.value.trim().toLowerCase();
    isValid(PokemonsList, userInput);
};
  
searchBtn.addEventListener('click',MainFunction)