
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon ()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type =  type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
     return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //buscando a nossa lista de pokemons (reponse http)
        .then((response) => response.json()) // converteu http em jason //
        .then((jsonBody) => jsonBody.results) // pegamos a lista de pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // pegamos lista do detalhes do pokemon com novos detalhes com o fetch ali em cima.//
        .then((detailRequests) => Promise.all(detailRequests)) // esperando todas as requisição terminar toda.
        .then((pokemonsDetails) => pokemonsDetails)  // lista de detalhes do pokemon //
}


/*
Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]).then((results) => {
    console.log(results)
})

*/
