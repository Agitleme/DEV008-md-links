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
  return state.isFile();
}

//Del directorio obtiene los archivos
export function fileDirectory(route) {
  let arrayFile = []; // Se inicializa un array vacío para almacenar las rutas de archivos encontrados
  const fileD = fs.readdirSync(route, "utf-8"); // Lee los contenidos del directorio en la ruta dada
  fileD.forEach((file) => {
    // Crea la ruta completa al archivo o directorio
    const newRoute = path.join(route, file);
    if (isFiles(newRoute)) {
     arrayFile.push(newRoute); // Agrega la ruta al array si es un archivo
      } else {
      //spread se utiliza para descomponer los elementos de un arreglo y agregarlos uno por uno en otro arreglo.
      arrayFile = [...arrayFile, ...fileDirectory(newRoute)]// Llamada recursiva si es un directorio
      }

  });
 
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
export function linkFinder(stringArray) {
  const links = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g; // Patrón regular que busca esto [texto](enlace)

  stringArray.forEach((file) => {
    const ArrayMatches = file.content.match(regex);
    if (ArrayMatches) { // Aca estan todos los links encontrados [texto](enlace) en un array
      ArrayMatches.forEach((linkMatch) => {//Recorremos cada uno de los links
        const matchParts = linkMatch.match(/\[([^\]]+)\]\(([^)]+)\)/); //parte en dos el link para traer el contenido y la url
        // if (matchParts) {
        const text = matchParts[1]; // Texto entre corchetes
        const link = matchParts[2]; // Enlace entre paréntesis
        links.push({ file: file.filePath, href: link, text: text, }); // Pushea los objetos { filePath, text, link }
        // }
      });
    }
  });
  return links;
}

/*

export const axiosPeticion = (arryLinks) => {
  const arrayPromises = arryLinks.map((item) => {
    return axios
      .get(item.href)
      .then((response) => { // status 200
        item.status = response.status
        item.mensaje = response.statusText
        return item
      })
      .catch((err) => {
        if (err.response) {// 300, 400, 500
          item.status = err.response.status;
          item.mensaje = err.response.statusText
        } else { //uNDEFINED
          item.status = 404
          item.mensaje = 'Not found'
        }
        return item
      });
  });
  return Promise.all(arrayPromises)
}

*/