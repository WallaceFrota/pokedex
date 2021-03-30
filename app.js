// função que recebe id como parametro
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

// gerando array com 150 dados undefineds e adicionando dados através do map a cada busca
const generatePokemonsPromises = () =>
    Array(150).fill()
        .map((_, index) =>
            fetch(getPokemonUrl(index + 1))
                .then(response => response.json()));


// array de pokemons recebendo a função que gera pokemons
const pokemonsPromises = generatePokemonsPromises();

// função que gera html e retorna cada dado do reduce através do arrow function
const generateHTML = pokemons => pokemons.reduce((accumulator, { id, name, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);

    accumulator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
               <h2 class="card-title">${id}. ${name} </h2>
               <p class="card-subtitle">${elementTypes.join(" / ")}</p>
            </li>
        `
    return accumulator;
}, '');

// insere html na página
const insertPokemonIntoPage = pokemons => {
    // inserindo no html ul / obtido através do attr
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
}

// resolvendo todas as promises
Promise.all(pokemonsPromises)
.then(generateHTML)
.then(insertPokemonIntoPage);