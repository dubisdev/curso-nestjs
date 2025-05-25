export const Deprecated = (deprecationReason: string) => {
    return (_target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {

        return {
            get() {
                const wrapperFn = (...args: any[]) => {
                    console.warn(`Method ${memberName} is deprecated: ${deprecationReason}`);
                    return propertyDescriptor.value.apply(this, args);
                };
                return wrapperFn
            },

        };
    }
}



export class Pokemon {
    constructor(
        public readonly id: number,
        public name: string,
    ) { }

    scream() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }


    @Deprecated('Use speak2 instead')
    speak() {
        console.log(`${this.name}, ${this.name}!`);
    }

    speak2() {
        console.log(`${this.name}, ${this.name}!!!!!`);
    }
}


export const charmander = new Pokemon(4, 'Charmander');

charmander.scream();

charmander.speak();
