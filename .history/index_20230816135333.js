//Promesa
//Callback resolve cuando la promesa se cumple 
//Callback reject es cuando NO se cumple
//cree promesa pero se consume en index

import { routeAbsolute, routeValid } from "./fuctions.js"; 

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
 const routeA =  routeAbsolute (path)
 resolve(routeA)
  })
};



// Consumir la promesa 
mdLinks ("./pruebas")
.then(links => {
console.log('iniciando promesa', links)
});
