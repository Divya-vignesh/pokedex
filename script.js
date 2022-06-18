const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            move:result.moves.map((move)=>move.move.name).join(','),
            id: result.id,
            ability:result.abilities.map((ability)=>ability.ability.name).join(','),
            weight:result.weight,
            height:result.height,
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h3 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <h3 class="card-title">Type: ${pokeman.type}</p>
            <h3 class="card-title">Ability:${pokeman.ability}</p>
            <h3 class="card-title">Weight:${pokeman.weight}</p>
            <h3 class="card-title">Height:${pokeman.height}</p>
            <h3 class="card-subtitle">Moves:${pokeman.move}</p>
            
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
