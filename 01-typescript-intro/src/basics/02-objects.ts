export const pokemonIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// typescript will not allow you to push a string into an array of numbers
// pokemonIds.push("sssss")
// This is valid javascript, but not valid typescript.


// but we can create custom array types to allow it
export const pokemonIds2: Array<number | string> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
pokemonIds2.push("sssss"); // Now this is allowed

// We can declare interfaces to define the shape of an object
interface Pokemon {
    id: number;
    name: string;
}

// Now we use a custom type to define a pokemon object
export const bulbasaurPokemon: Pokemon = {
    id: 1,
    name: "Bulbasaur",
}

console.log(bulbasaurPokemon)



const pokemons: Pokemon[] = [bulbasaurPokemon]

pokemons.forEach(console.log)
