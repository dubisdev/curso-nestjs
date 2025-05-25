// import { name, AGE } from "./basics/01-types";
// import { bulbasaurPokemon } from "./basics/02-objects";

import { charmander } from "./basics/06-decorators2";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello ${charmander.name} ${charmander.id}!!</h1>
  <div>Great Course</div>
`

