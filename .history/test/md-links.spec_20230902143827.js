import { routeValid, routeAbsolute, isFiles, } from '../fuctions';
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

// routeValid
describe('routeValid', () => {
  // Prueba cuando la ruta existe
  it('debe devolver true si la ruta existe', () => {
    const rutaExistente = 'C:\\Users\\apaom\\OneDrive\\Escritorio\\MD Links\\DEV008-md-links\\testFile\\file1.md';
    expect(routeValid(rutaExistente)).toBe(true);
  });

  // Prueba cuando la ruta no existe
  it('debe devolver false si la ruta no existe', () => {
    const rutaNoExistente = 'filemd';
    expect(routeValid(rutaNoExistente)).toBe(false);
  });
});

// routeAbsolute
//Si una ruta absoluta proporcionada como entrada devuelve la misma ruta.
describe('ruta absoluta', () => {
  const route = 'C:\\Users\\apaom\\OneDrive\\Escritorio\\MD Links\\DEV008-md-links\\testFile\\file1.md';
  expect(routeAbsolute(route)).toBe(route);
});

//Si una ruta relativa proporcionada como entrada se convierte correctamente en 
//una ruta absoluta utilizando path.resolve.
describe('ruta relativa convertida en absoluta', () => {
  const rutaRelativa = '../README.md';
  const rutaAbsoluta = path.resolve(rutaRelativa);
  expect(routeAbsolute(rutaRelativa)).toBe(rutaAbsoluta);
});

// isFiles
// Simula una versión mock de fs para las pruebas
const mockFs = {
  statSync: jest.fn(), // Usaremos jest.fn() para crear una función mock
};

describe('isFile', () => {
  // Antes de cada prueba, restablecemos el estado de jest.fn()
  beforeEach(() => {
    mockFs.statSync.mockReset();
  });

  it('debería devolver true cuando se pasa una ruta de archivo válida', () => {
    // Configura el comportamiento del mock de fs para esta prueba
    mockFs.statSync.mockReturnValueOnce({ isFile: () => true });

    // Llama a la función isFile con la ruta y el mock de fs
    const route = '/ruta/a/mi/archivo.txt';
    const result = isFile(route, mockFs);

    // Verifica que la función haya sido llamada con la ruta correcta
    expect(mockFs.statSync).toHaveBeenCalledWith(route);

    // Verifica que el resultado sea true
    expect(result).toBe(true);
  });

  it('debería devolver false cuando se pasa una ruta de directorio', () => {
    // Configura el comportamiento del mock de fs para esta prueba
    mockFs.statSync.mockReturnValueOnce({ isFile: () => false });

    // Llama a la función isFile con la ruta y el mock de fs
    const route = '/ruta/a/mi/directorio';
    const result = isFile(route, mockFs);

    // Verifica que la función haya sido llamada con la ruta correcta
    expect(mockFs.statSync).toHaveBeenCalledWith(route);

    // Verifica que el resultado sea false
    expect(result).toBe(false);
  });

  // Puedes agregar más pruebas según tus necesidades
});