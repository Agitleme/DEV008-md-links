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
  if (fs.existsSync(route)) { //// Si el archivo o directorio existe en la ruta dada
   // console.log(chalk.bgBlue("ruta valida"));
    return true;
    //// Devuelve true, lo que indica que la ruta es válida
  } else {
    //console.log(chalk.bgYellow("ruta invalida"));
    return false;
  }
}
//funcion para validad una ruta a ruta absoluta.
// Route es path, segundo route es parametroes otro route.
//path.resolve se usa para pasar de una ruta relativa a una absoluta
export function routeAbsolute(route) {
  if (path.isAbsolute(route)) {
    //console.log(chalk.bgGreen("absolute path", route));
  } else {
   // console.log(chalk.bgGrey("absolute path", path.resolve(route)));
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
    //console.log(file, "THESE ARE THE FOLDERS");
    const newRoute = path.join(route, file);
    if (isFiles(newRoute)) {
      arrayFile.push(newRoute); // estoy agregando al array vacio
      //console.log(newRoute, "Route New");
    } else {
      fileDirectory(newRoute);
    }
  });
 // console.log(arrayFile, "these are the links");
  return arrayFile;
}

//Función para filtrar los archivos .md
 export function filterMD(arrayFile) {
  //console.log(chalk.yellowBright("files without filter"));
   return arrayFile.filter((file) => path.extname(file) === ".md");
 }


//convierte un array de rutas de archivos en un array de objetos
export function fileToStringArray(arrayFileDirectory) {
  const allFiles = [];
  arrayFileDirectory.forEach((pathFile) => {
    //se recorre cada uno de los archivos
    const content = fs.readFileSync(pathFile, "utf-8");
    allFiles.push({ filePath: pathFile, content: content });
  });
  return allFiles;
}

// Encuentra los enlaces en el texto de un archivo .md y en que linea del archivo se encuentra el link
export function linkFinder(fileContent, file) { //fileContent: El contenido del archivo en el que deseas buscar enlaces. Se espera que este contenido sea una cadena de texto.
  //file: El nombre del archivo en el que se están buscando los enlaces. Esto se utiliza para asociar los enlaces encontrados con un archivo específico.
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g; // expresión regular regex que busca patrones de enlaces Markdown. 
  //Los patrones de enlaces Markdown tienen la forma [texto](enlace) donde texto es el texto del enlace y enlace es la URL de destino del enlace.
  const links = []; //Se crea una matriz vacía llamada links para almacenar los enlaces encontrados.
  let match;

  const lines = fileContent.split('\n');
  let lineNumber = 1;

  for (const line of lines) {
      while ((match = regex.exec(line))) {
          const [, text, href] = match;
          links.push({ text, href, file, line: lineNumber });
      }
      lineNumber++;
  }

  if (links.length === 0) {
      throw new Error('No links found in the file.');
  }

  return links;
}




