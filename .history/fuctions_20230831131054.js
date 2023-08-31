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
  let arrayFile = []; // Se inicializa un array vacío para almacenar las rutas de archivos encontrados
  const fileD = fs.readdirSync(route, "utf-8"); // Lee los contenidos del directorio en la ruta dada
  fileD.forEach((file) => {
    //console.log(file, "THESE ARE THE FOLDERS");
    // Crea la ruta completa al archivo o directorio
    const newRoute = path.join(route, file);
    if (isFiles(newRoute)) {
      arrayFile.push(newRoute); // Agrega la ruta al array si es un archivo
      //console.log(newRoute, "Route New");
    } else {
      fileDirectory(newRoute); // Llamada recursiva si es un directorio
    }
  });
  // console.log(arrayFile, "these are the links");
  return arrayFile; // Devuelve el array con las rutas de archivos
}

//Función para filtrar los archivos .md
//esta función filtra el array arrayFile y
// devuelve un nuevo array que solo contiene las rutas de archivos con la extensión ".md"
export function filterMD(arrayFile) {
  //console.log(chalk.yellowBright("files without filter"));
  return arrayFile.filter((file) => path.extname(file) === ".md");
}

//convierte un array de rutas de archivos en un array de objetos
export function fileToStringArray(arrayFileDirectory) {
  // Inicializa un array vacío para almacenar los objetos de archivos y contenido
  const allFiles = [];
  // Itera a través de cada ruta de archivo en el array arrayFileDirectory
  arrayFileDirectory.forEach((pathFile) => {
    // Lee el contenido del archivo en la ruta pathFile
    const content = fs.readFileSync(pathFile, "utf-8");
    // Agrega un objeto al array allFiles con la ruta del archivo y su contenido
    allFiles.push({ filePath: pathFile, content: content });
  });
  // Devuelve el array con objetos de archivos y contenido
  return allFiles;
}

// Encuentra los enlaces en el texto de un archivo .md y en que linea del archivo se encuentra el link
export function linkFinder(fileContent, file) {
  // Definición de una expresión regular para encontrar enlaces en formato [texto](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g; // expresión regular regex que busca patrones de enlaces Markdown.
  const links = []; //Se crea una matriz vacía llamada links para almacenar los enlaces encontrados.
  let match;
  // Dividir el contenido del archivo en líneas individuales
  const lines = fileContent.split("\n");
  let lineNumber = 1;
  // Iterar a través de cada línea del contenido del archivo
  for (const line of lines) {
    // Utilizar el método `exec` de la expresión regular para encontrar enlaces en la línea actual
    while ((match = regex.exec(line))) {
    // `match` contiene información sobre el enlace encontrado
      const [ text, href] = match;
      // Agregar la información del enlace encontrado al array `links`
      links.push({ text, href, file, line: lineNumber });
    }
    lineNumber++; //Después de revisar una línea completa, se incrementa el contador lineNumber para realizar un seguimiento de la línea actual.
  }

  if (links.length === 0) {
    //Después de procesar todas las líneas, se verifica si se encontraron enlaces (links.length === 0).
    //Si no se encontraron enlaces, la función arroja un error indicando que no se encontraron enlaces en el archivo.
    throw new Error("No links found in the file.");
  }
// Devolver el array de enlaces encontrados
console.log(links)
  return links;
}
