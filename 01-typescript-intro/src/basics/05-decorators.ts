class NewPokemon {
    constructor(
        public readonly id: number,
        public name: string,
    ) { }

    scream() {
        console.log(`TESTTTT!!!`);
    }

    speak() {
        console.log(`TEST TESTTTT!`);
    }
}


const MyDecorator = () => {
    return (_target: Function) => {
        return NewPokemon
    }
}

// Decorators are functions that can modify or enhance classes, methods, properties, or parameters.
@MyDecorator()
export class Pokemon {
    constructor(
        public readonly id: number,
        public name: string,
    ) { }

    scream() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    speak() {
        console.log(`${this.name}, ${this.name}!`);
    }
}


export const charmander = new Pokemon(4, 'Charmander');

charmander.scream();

charmander.speak();
