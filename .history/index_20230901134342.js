//Promesa
//Callback resolve cuando la promesa se cumple
//Callback reject es cuando NO se cumple
//cree promesa pero se consume despues

import {
  routeAbsolute,
  routeValid,
  isFiles,
  fileDirectory,
  filterMD,
  fileToStringArray,
  linkFinder,
} from "./fuctions.js";

export function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    //Calcula la ruta absoluta a partir de la ruta proporcionada
    const routeA = routeAbsolute(path);
    //Verifica si la ruta es válida usando la función
    if (routeValid(routeA) === false) {
      //Si no es válida, se rechaza
      reject("Route invalid");
    }
    //Dependiendo de si la ruta representa un archivo o un directorio,
    //se crea un arreglo llamado arrayAllFile que contendrá rutas de archivos.
    let arrayAllFile = []; //contiene todos los archivos
    if (isFiles(routeA) === true) {
      arrayAllFile.push(routeA);
    } else {
      arrayAllFile = fileDirectory(routeA);
    }

    const mdFiltro = filterMD(arrayAllFile);
    if (mdFiltro.length === 0) reject("Does not have MD files");
    let contentMD = fileToStringArray(mdFiltro);
    resolve(contentMD);

    const theSameLinks = linkFinder(contentMD);
    console.log(theSameLinks);
  });
}

// Consumir la promesa
//links para función de links
mdLinks("./testFile").then((links) => {
  console.log("keeping promise", links);
});
