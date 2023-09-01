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
  validateLinks,
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

    const theSameLinks = linkFinder(contentMD);
    //resolve(theSameLinks);

    //constante donde vamos a gusradar las promesa
    const arrayPromes = [];
    if (options.validate === true) {
      theSameLinks.forEach((element) => {
        arrayPromes.push(validateLinks(element));
      });
      Promise.all(arrayPromes)
        .then((resposes) => {
          resolve(resposes);
        })
        .catch((errors) => {
          console.log("errors");
        });
    } else {
      theSameLinks.forEach((element) => {
        arrayPromes.push(validateLinks(element));
      });
      Promise.all(arrayPromes)
        .then((resposes) => {
          resolve(resposes.links);
        })
        .catch((errors) => {
          console.log("errors");
        });
    }
  });
}

// Consumir la promesa
//links para función de links
mdLinks("./testFile", { validate: true }).then((links) => {
  console.log("keeping promise", links);
});
