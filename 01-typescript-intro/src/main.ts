// import { name, AGE } from "./basics/01-types";
import { bulbasaurPokemon } from "./basics/02-objects";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello ${bulbasaurPokemon.name} ${bulbasaurPokemon.id}!!</h1>
  <div>Great Course</div>
`

