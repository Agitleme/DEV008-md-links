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
   
