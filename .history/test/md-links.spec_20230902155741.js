import { routeValid, routeAbsolute, isFiles } from "../fuctions";
import path from "path";
import fs from "fs";
import { mdLinks } from "../index";

describe("mdLinks", () => {
  it("should...", () => {
    console.log("FIX ME!");
  });

  it("Deberia rechazar si la ruta es invalidad", () => {
    return mdLinks("./noseque").catch((error) => {
      expect(error).toBe("Route invalid");
    });
  });
});

// routeValid
describe("routeValid", () => {
  // Prueba cuando la ruta existe
  it("debe devolver true si la ruta existe", () => {
    const rutaExistente =
      "C:\\Users\\apaom\\OneDrive\\Escritorio\\MD Links\\DEV008-md-links\\testFile\\file1.md";
    expect(routeValid(rutaExistente)).toBe(true);
  });

  // Prueba cuando la ruta no existe
  it("debe devolver false si la ruta no existe", () => {
    const rutaNoExistente = "filemd";
    expect(routeValid(rutaNoExistente)).toBe(false);
  });
});

// routeAbsolute
//Si una ruta absoluta proporcionada como entrada devuelve la misma ruta.
describe("ruta absoluta", () => {
  const route =
    "C:\\Users\\apaom\\OneDrive\\Escritorio\\MD Links\\DEV008-md-links\\testFile\\file1.md";
  expect(routeAbsolute(route)).toBe(route);
});

//Si una ruta relativa proporcionada como entrada se convierte correctamente en
//una ruta absoluta utilizando path.resolve.
describe('ruta relativa convertida en absoluta', () => {
  const rutaRelativa = "../README.md";
  const rutaAbsoluta = path.resolve(rutaRelativa);
  expect(routeAbsolute(rutaRelativa)).toBe(rutaAbsoluta);
});

// isFiles
describe('isFiles', () => {
  it('deberia ser una funcion', () => {
    expect(typeof isFiles).toBe('function');
  });
  it('debería devolver true cuando se trata de un archivo', async () => {
    expect(isFiles('./README.md')).toBe(true)
  });
  it('debería devolver false cuandose trata de un directorio', async () => {
    expect(isFiles('./testFile')).toBe(false)
  });
})

//fileDirectory
