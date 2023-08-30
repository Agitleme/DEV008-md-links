import path from "path";
import chalk from "chalk";
import fs from "fs";
import { pathToFileURL } from "url";
/* aqui van todas la funciones, validad una ruta, path a absuluto abiri con console log "node espacio y nombre del archivo"
npm i path es una libreria de node que nos permite trabajar con rutas.
Crear la función para validar ruta existe  con  File System fs.existSYNC(route).
Retorna True or False. No se mete a directorios.
npm i fs se instala y se importa.*/

export function routeValid(route) {
  if (fs.existsSync(route)) {
    console.log(chalk.bgBlue("ruta valida"));
    return true;
  } else {
    console.log(chalk.bgYellow("ruta invalida"));
    return false;
  }
}
//funcion para validad una ruta a ruta absoluta.
// Route es path, segundo route es parametroes otro route.
//path.resolve se usa para pasar de una ruta relativa a una absoluta
export function routeAbsolute(route) {
  if (path.isAbsolute(route)) {
    console.log(chalk.bgGreen("ruta absoluta", route));
  } else {
    console.log(chalk.bgGrey("ruta absoluta", path.resolve(route)));
    return path.resolve(route);
  }
}

//verificar si es archivo o directorio
export function isFiles(route) {
  const state = fs.statSync(route);
  return state;
  /* if (state.isFiles()) {
    return true;
  } else if (state.isDirectory()) {
    return false;
  }*/
}

//Del directorio obtiene los archivos
export function fileDirectory(route) {
  let arrayFile = [];
  const fileD = fs.readdirSync(route, "utf-8");
  fileD.forEach((file) => {
    console.log(file, "ESTAS SON LAS CARPETAS");
    const newRoute = path.join(route, file);
    if (isFiles(newRoute)) {
      arrayFile.push(newRoute); // estoy agregando al array vacio
      console.log(newRoute, "Nueva Ruta");
    } else {
      fileDirectory(newRoute);
    }
  });
  console.log(arrayFile, "estos son los links");
  return arrayFile;
}

//Función para filtrar los archivos .md
 export function filterMD(arrayFile) {
  console.log(chalk.yellowBright("Archivos sin filtro"));
   return arrayFile.filter((file) => path.extname(file) === ".md");
 }

/*
/convierte un arry de rutas de archivos en un array de objetos
export function fileToStringArray(arrayFileDirectory) {
  const allFiles = [];
  arrayFileDirectory.forEach((pathFile) => {
    //se recorre cada uno de los archivos
    const content = fs.readFileSync(pathFile, "utf-8");
    allFiles.push({ filePath: pathFile, content: content });
  });
  return allFiles;
}*/

/*Función que obtiene todos los links 
export function searchForLinks(stringArray){
    const links = [];
    const regex =

}*/
