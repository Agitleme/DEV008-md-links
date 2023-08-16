import { routeAbsolute } from "./fuctions";
//Promesa
//Callback resolve cuando la promesa se cumple 
//Callback reject es cuando NO se cumple
//cree promesa pero se consume en index
 
export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
  const routeAbsolute =  routeAbsolute (path)
  })
};



// Consumir la promesa 
mdLinks ("./pruebas")
.then(links => {
console.log('iniciando promesa', links)
})
