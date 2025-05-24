import { name, AGE } from "./basics/01-types";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Hello ${name} ${AGE}!!</h1>
  <div>Great Course</div>
`

console.log(name);
