import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
/* aqui van todas la funciones, validad una ruta, path a absuluto abiri con console log "node espacio y nombre del archivo"
npm i path es una libreria de node que nos permite trabajar con rutas.
Crear la función para validar ruta existe  con  File System fs.existSYNC(route).
Retorna True or False. No se mete a directorios.
npm i fs se instala y se importa.*/

export function routeValid(route){
    if(fs.existsSync(route)){
        console.log(chalk.bgBlue('ruta valida'))
        return true;
    } else {
        console.log(chalk.bgYellow('ruta invalida'))
        return false;
    }
};
//funcion para validad una ruta a ruta absoluta.
// Route es path, segundo route es parametroes otro route.
//path.resolve se usa para pasar de una ruta relativa a una absoluta
export function routeAbsolute (route){
   if (path.isAbsolute(route)){
    console.log(chalk.bgGreen('ruta absoluta', route))
   } else { 
    console.log(chalk.bgGrey('ruta absoluta', path.resolve(route)))
    return path.resolve(route)
    }
}