import {mdLinks} from '../index';

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Deberia rechazar si la ruta es invalidad', async() => {
    //return  mdLinks ('./noseque').catch((error)=> {
      //expect (error).toBe('ruta invalida')
    //});
    expect( await mdLinks('./noseque')).toBe('ruta invalida');
    //expect a.toBe('ruta invalida')
  });
});
