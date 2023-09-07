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
  fusionStats,
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
    if (options.validate === true && options.stats === false) {
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
    } else if (options.validate === false && options.stats === false) {
      resolve(theSameLinks);
      
      /*theSameLinks.forEach((element) => {
        console.log(element);
      });*/
    } else if (options.validate === false && options.stats === true) {
      const totalLinks = fusionStats(theSameLinks);
      const totalstats = statsLinks(theSameLinks);
      resolve({
        total: totalLinks,
        unique: totalstats,
      });
      
    } else if (options.validate === true && options.stats === true) {
      const totalLinks = fusionStats(theSameLinks);
      const totalstats = statsLinks(theSameLinks);
      const totalBroken = statsBroken(theSameLinks);
      resolve({
        total: totalLinks,
        unique: totalstats,
        broken: totalBroken,
      });
    }
  });
}

// Consumir la promesa
//links para función de links

mdLinks("./README.md", {
  validate: true,
  stats: true,
}).then((links) => {
  console.log("keeping promise!", links);
});
