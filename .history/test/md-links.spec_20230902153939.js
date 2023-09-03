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
describe("ruta relativa convertida en absoluta", () => {
  const rutaRelativa = "../README.md";
  const rutaAbsoluta = path.resolve(rutaRelativa);
  expect(routeAbsolute(rutaRelativa)).toBe(rutaAbsoluta);
});

// isFiles
describe('isFiles', () => {
  it('deberia ser una funcion', () => {
    expect(typeof isFiles).toBe('function');
  });
  it('deberia retornar true cuando es un archivo', async () => {
    expect(isFile('C:\Users\apaom\OneDrive\Escritorio\MD Links\DEV008-md-links\README.md')).toBe(true)
  });
  it('deberia retornar false cuando es un directorio', async () => {
    expect(isFile('C:\Users\apaom\OneDrive\Escritorio\MD Links\DEV008-md-links\testFile')).toBe(false)
  });
})



describe(, () => {
  // Antes de cada prueba, restablecemos el estado de jest.fn()
  beforeEach(() => {
    mockFs.statSync.mockReset();
  });

  it("debería devolver true cuando se pasa una ruta de archivo válida", () => {
    // Configura el comportamiento del mock de fs para esta prueba
    mockFs.statSync.mockReturnValueOnce({ isFile: () => true });

    // Llama a la función isFile con la ruta y el mock de fs
    const route = "./testFile";
    const result = isFiles(route, mockFs);

    // Verifica que la función haya sido llamada con la ruta correcta
    expect(mockFs.statSync);

    // Verifica que el resultado sea true
    //expect(result).toBe(true);
  });
/
