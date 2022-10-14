// const pathVariables = location.pathname.split("/");
// const pokemonName = pathVariables.pop();

// todo start the battle against this pokemon
// fetch data about this specific pokemon

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(res=>res.json()).then(pokemon => {
    let imgSrc = pokemon.sprites.other.dream_world.front_default;
    document.getElementById("pokemon-sprite").src = imgSrc;
    // pokemon.data.map(p => {
    //     let span = document.createElement("span");
    //     document.getElementById("pokemon").appendChild(span);
    //     span.innerText = p.name;
    // });
});

const iWon = Math.random() > 0.5;
document.getElementById("who-won").innerText = iWon ? "I won :D" : "I lost :(";
// Once the battle is over then post the result to my backend

