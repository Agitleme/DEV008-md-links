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
  statsLinks,
  statsBroken,
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
   /* } else if (options.validate === false && options.stats === true) {
      console.log("probando----");
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
        });*/
    }
    //En otras palabras, verifica si ambas propiedades son false.
    if (options.validate === false && options.stats === false) {
      resolve(arrayPromes);
    }
    //
    if (options.validate === true && options.stats === false) {
      arrayPromes(links)
        .then((response) => resolve(response));
    }

    if (options.validate === false && options.stats === true) {
      resolve(stats(links));
    }
    if (options.validate === true && options.stats === true) {
      arrayPromes(links)
        .then((response) => resolve(statsValidate(response)));
    }






  });
}

// Consumir la promesa
//links para función de links

mdLinks("./testFile", {
  validate: true, stats: true//puede ser verdadero o falso
}).then((links) => {
  console.log("keeping promise1", links);
});
