import type { PokeAPIResponse } from "../interfaces/pokeapi-response.interface";

export class Pokemon {

    constructor(
        public readonly id: number,
        public name: string
    ) {
        console.log("Called constructor of Pokemon class");
    }

    // Getter
    get imageUrl(): string {
        return `https://pokemon.com/${this.id}.jpg`;
    }

    // Method
    public scream(): void {
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    // Private Method
    private speak(): void {
        console.log(`${this.name} ${this.name}`);
    }

    // Async methods
    async fetchPokemonData(): Promise<PokeAPIResponse> {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        const json = await data.json();
        console.log(json);

        return json as PokeAPIResponse;
    }

}


export const charmander = new Pokemon(4, "Charmander");


// charmander.id = 4 // Error: Cannot assign to 'id' because it is a read-only property.


// charmander.speak(); // Cannot access private method 'speak' of class 'Pokemon'.
charmander.scream();
charmander.fetchPokemonData().then((data) => {
    data.abilities.forEach((ability) => {
        console.log(ability.ability?.name);
    });
    console.log(data.name);
}).catch(console.error);
