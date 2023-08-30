import path from "path";
import chalk from "chalk";
import fs from "fs";
//import { pathToFileURL } from "url";
/* aqui van todas la funciones, validad una ruta, path a absuluto abiri con console log "node espacio y nombre del archivo"
npm i path es una libreria de node que nos permite trabajar con rutas.
Crear la función para validar ruta existe  con  File System fs.existSYNC(route).
Retorna True or False. No se mete a directorios.
npm i fs se instala y se importa.*/

export function routeValid(route) {
  if (fs.existsSync(route)) {
    // Si el archivo o directorio existe en la ruta dada
    // console.log(chalk.bgBlue("ruta valida"));
    return true;
    //Devuelve true, lo que indica que la ruta es válida
  } else {
    // Si el archivo o directorio no existe en la ruta dada
    //console.log(chalk.bgYellow("ruta invalida"));
    return false; // Devuelve false, lo que indica que la ruta no es válida
  }
}
//funcion para validad una ruta a ruta absoluta.
// Route es path, segundo route es parametroes otro route.
//path.resolve se usa para pasar de una ruta relativa a una absoluta
export function routeAbsolute(route) {
  if (path.isAbsolute(route)) {
    // Si la ruta es absoluta
    //console.log(chalk.bgGreen("absolute path", route));
  } else {
    // console.log(chalk.bgGrey("absolute path", path.resolve(route)));
    //se utiliza para convertir la ruta relativa en una ruta absoluta.
    return path.resolve(route);
  }
}

//verificar si es archivo o directorio
export function isFiles(route) {
  // Obtiene el estado (metadatos) del archivo o directorio en la ruta
  const state = fs.statSync(route);
  // Devuelve el objeto de estado (metadatos) obtenido
  return state;
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
export function linkFinder(fileContent, file) {
  //fileContent: El contenido del archivo en el que deseas buscar enlaces. Se espera que este contenido sea una cadena de texto.
  //file: El nombre del archivo en el que se están buscando los enlaces. Esto se utiliza para asociar los enlaces encontrados con un archivo específico.
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g; // expresión regular regex que busca patrones de enlaces Markdown.
  //Los patrones de enlaces Markdown tienen la forma [texto](enlace) donde texto es el texto del enlace y enlace es la URL de destino del enlace.
  const links = []; //Se crea una matriz vacía llamada links para almacenar los enlaces encontrados.
  let match;
  /* El contenido del archivo se divide en líneas utilizando el carácter de salto de línea (\n).
  Se establece un contador de número de línea (lineNumber) para realizar un seguimiento de en qué línea se encuentra el enlace.*/
  const lines = fileContent.split("\n");
  let lineNumber = 1;
  /*Se utiliza un bucle for...of para iterar a través de cada línea del contenido del archivo.
En cada línea, se utiliza un bucle while junto con la función exec de la expresión regular para buscar enlaces en esa línea.
Si se encuentra un enlace, se extrae el texto y el href del enlace mediante la coincidencia (match) y se agrega un objeto que 
representa el enlace a la matriz links. 
El objeto contiene el texto, el enlace, el nombre del archivo y el número de línea.*/
  for (const line of lines) {
    while ((match = regex.exec(line))) {
      const [, text, href] = match;
      links.push({ text, href, file, line: lineNumber });
    }
    lineNumber++; //Después de revisar una línea completa, se incrementa el contador lineNumber para realizar un seguimiento de la línea actual.
  }

  if (links.length === 0) {
    //Después de procesar todas las líneas, se verifica si se encontraron enlaces (links.length === 0).
    //Si no se encontraron enlaces, la función arroja un error indicando que no se encontraron enlaces en el archivo.
    throw new Error("No links found in the file.");
  }

  return links;
}
