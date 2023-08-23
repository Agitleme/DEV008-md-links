//Promesa
//Callback resolve cuando la promesa se cumple 
//Callback reject es cuando NO se cumple
//cree promesa pero se consume en index

import { routeAbsolute, routeValid, isFiles, fileDirectory} from "./fuctions.js"; 

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
 const routeA =  routeAbsolute (path);
 if (!routeValid(routeA)){
  reject('ruta invalida')
 }
 let 
  })
};



// Consumir la promesa 
mdLinks ("./README.md")
.then(links => {
console.log('iniciando promesa', links)
});
