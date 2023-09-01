//Promesa
//Callback resolve cuando la promesa se cumple 
//Callback reject es cuando NO se cumple
//cree promesa pero se consume despues 

import { routeAbsolute, routeValid, isFiles, fileDirectory} from "./fuctions.js"; 

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
 const routeA =  routeAbsolute (path);
 if (routeValid(routeA)=== false){
  reject('Route invalid')
 }
 let arrayAllFile = []; //contiene todos los archivos
 if (isFiles(routeA) === true) {
   arrayAllFile.push(routeA)
 } else {
   arrayAllFile = fileDirectory(routeA)
   console.log(arrayAllFile)
   }





})
};



// Consumir la promesa 
//links para función de links 
mdLinks ("./testFile")
.then(links => {
console.log('iniciando promesa', links)
});

