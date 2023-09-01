import { routeValid,  } from '../fuctions';
import path from 'path';
import fs from 'fs';
import {mdLinks} from '../index';

describe('mdLinks', () => {

 it('should...', () => {
    console.log('FIX ME!');
 });
  
 it('Deberia rechazar si la ruta es invalidad', () => {
    return  mdLinks ('./noseque').catch((error)=> {
      expect (error).toBe('Route invalid')
    }); });
});
   
describe('routeValid', () => {
  // Prueba cuando la ruta existe
  it('debe devolver true si la ruta existe', () => {
    const rutaExistente = 'testFile\file1.md';
    expect(routeValid(rutaExistente)).toBe(true);
  });

  // Prueba cuando la ruta no existe
  it('debe devolver false si la ruta no existe', () => {
    const rutaNoExistente = 'filemd';
    expect(routeValid(rutaNoExistente)).toBe(false);
  });
});