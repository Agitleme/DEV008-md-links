import path from 'path';
import chalk from 'chalk';
// aqui van todas la funciones, validad una ruta, path a absuluto abiri con console log "node espacio y nombre del archivo"
//npm i path es una libreria de node que nos permite trabajar con rutas.
//funcion para validad una ruta a ruta absoluta.
// Route es path, segundo route es parametroes otro route.
export function routeAbsolute (route){
   if (path.isAbsolute(route)){
    console.log(chalk.bgGreen('ruta absoluta', route))
   } else { 
    path.resolve(route)
    
   }
    
}
