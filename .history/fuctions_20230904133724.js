import path from "path";
//import chalk from "chalk";
import fs from "fs";
import { log } from "console";
//import { pathToFileURL } from "url";
/* aqui van todas la funciones, validad una ruta, path a absuluto abiri con console log "node espacio y nombre del archivo"
npm i path es una libreria de node que nos permite trabajar con rutas.
Crear la función para validar ruta existe  con  File System fs.existSYNC(route).
Retorna True or False. No se mete a directorios.
npm i fs se instala y se importa.*/

export function routeValid(route) {
  if (fs.existsSync(route)) {
    // Si el archivo o directorio existe en la ruta dada
    return true;
    //Devuelve true, lo que indica que la ruta es válida
  } else {
    // Si el archivo o directorio no existe en la ruta dada
    return false; // Devuelve false, lo que indica que la ruta no es válida
  }
}
//funcion para validad una ruta a ruta absoluta.
// Route es path, segundo route es parametroes otro route.
//path.resolve se usa para pasar de una ruta relativa a una absoluta
export function routeAbsolute(route) {
  if (path.isAbsolute(route)) {
    return route;
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
      arrayFile = [...arrayFile, ...fileDirectory(newRoute)]; // Llamada recursiva si es un directorio
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
export function linkFinder(stringObject) {
  const links = []; // Aquí almacenaremos los enlaces encontrados.
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g; // Expresión regular para buscar enlaces en formato Markdown.

  stringObject.forEach((file) => {
    // Iteramos a través de cada objeto de cadena en la entrada.
    const matches = file.content.match(regex); // Buscamos todas las coincidencias de enlaces en el contenido del archivo.

    if (matches) {
      // Si se encontraron coincidencias de enlaces en el archivo.
      matches.forEach((linkMatch) => {
        // Iteramos a través de cada coincidencia de enlace encontrada.
        const matchParts = linkMatch.match(/\[([^\]]+)\]\(([^)]+)\)/);
        // La expresión regular anterior busca el texto y la URL dentro de una coincidencia de enlace.
        const text = matchParts[1]; // Capturamos el texto del enlace.
        const link = matchParts[2]; // Capturamos la URL del enlace.

        links.push({ file: file.filePath, href: link, text: text });
        // Agregamos un objeto con la información del enlace encontrado (archivo, URL y texto) al arreglo "links".
      });
    }
  });
  return links; // Devolvemos el arreglo de enlaces encontrados.
}

export function validateLinks(link) {
  //La función map se utiliza para iterar sobre cada elemento del arreglo links.
  //En este caso, link es una variable que representa cada elemento (enlace) en el arreglo.
  return (
    fetch(link.href)
      //Aquí se utiliza la función fetch para realizar una solicitud HTTP a la URL (link.href) del enlace.
      .then((response) => {
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          message: response.statusText,
        };
      })
      //Si no es posible obtener el código de estado, se establece en 404 por defecto.

      .catch((error) => {})
  );
}

//Estadisticas de los links
export function statsLinks(arrayTheSameLinks) {
  //arreglo de objetos que representan enlaces.
  const setUniques = new Set(); //es una estructura de datos en JavaScript que solo permite almacenar valores únicos, lo que significa que no puede haber duplicados en él.
  arrayTheSameLinks.forEach((item) => setUniques.add(item.href)); // Esto tiene el efecto de almacenar solo las URLs únicas en setUniques.
  return { total: arrayTheSameLinks.length, unique: setUniques.size };
}
console.log(
  statsLinks([
    "https://github.com/Laboratoria/DEV008-md-links",
    "https://github.com/Laboratoria/DEV008-md-links",
  ]),
  ".href"
);

export function statsBroken(arrayTheSameLinks) {
  const setUniques = new Set();
  // Iterar a través de cada elemento del arreglo 'arrayLinks'.
  arrayTheSameLinks.forEach((item) => {setUniques.add(item.href); // Agregar la propiedad 'href' de cada elemento al conjunto 'setUniques'.
  });

  // Filtrar los elementos en 'arrayLinks' donde la propiedad 'status' no sea igual a 200.
  const broken = arrayTheSameLinks.filter((item) => item.status !== 200);
  // Devolver un objeto que contiene tres propiedades: 'total', 'unique' y 'broken'.
  return {
    total: arrayLinks.length, // El total de elementos en 'arrayLinks'.
    unique: setUniques.size, // La cantidad de valores únicos en 'setUniques'.
    broken: broken.length, // La cantidad de elementos en 'arrayLinks' con 'status' diferente de 200.
  };
}
