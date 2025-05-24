export const name = "David"
export const AGE = 22
const isValid = true

// Code executed on the module will run inmmediately when imported
console.log({ isvalid: isValid })



const multiline = `
This is a multiline string
It can span multiple lines
And it will keep the formatting
It is very useful for long strings
Can include double quotes " and single quotes ' without escaping
It can also include backticks \` without escaping
Also can include variable interpolation like this: ${name} and ${AGE}
`;

console.log(multiline);
