//const fetch = require('../mock/mock-fetch.js');

const { existeRuta,
  esRutaAbsoluta,
    rutaAbsoluta,
    rutaDirectorio, 
    rutaArchivo, 
    listaDirectorios,
    filtrarMd,
    leerContenido,
    extraerLinksUnicaRuta,
    validarLinksStatus 
 } = require('../src/api.js');

describe('existeRuta', () => {
  it('is a function', () => {
    expect(typeof existeRuta).toBe('function');
  });
  it('debe devolver verdadero si la ruta existe', () => {
    expect(existeRuta('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md')).toBe(true);
  });
  it('debe devolver falso si la ruta no existe', () => {
    expect(existeRuta('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\src\\READMEE.md')).toBe(false);
  })

});

describe('esRutaAbsoluta', () =>{
    it('is a function', ()=>{
      expect(typeof esRutaAbsoluta).toBe('function');
    });
    it('debería devolver verdadero si la ruta es absoluta', () => {
      expect(esRutaAbsoluta('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\src')).toBe(true);
    });
    it('debe devolver falso si la ruta no es absoluta', () => {
      expect(esRutaAbsoluta('src')).toBe(false);
    });
  })
  
  describe('rutaAbsoluta', () => {
    it('is a function', () => {
      expect(typeof rutaAbsoluta).toBe('function');
    });
    it('debe devolver una ruta o ruta absoluta', () => {
      expect(rutaAbsoluta('README.md')).toBe('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md');
    });
  });

  describe('rutaDirectorio', () => {
    it('debería devolver verdadero si la ruta es un directorio', () => {
      expect(rutaDirectorio('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\src')).toBe(true);
    });
    it('debería devolver falso si la ruta no es un directorio', () => {
      expect(rutaDirectorio('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md')).toBe(false);
    });
  });

  describe('rutaArchivo', () => {
    it('debería devolver verdadero si la ruta es un archivo', () => {
      expect(rutaArchivo('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md')).toBeTruthy;
    });
    it('debería devolver falso si la ruta no es un archivo', () => {
      expect(rutaArchivo('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\src')).toBeFalsy;
    });
  });

  describe('filtrarMd', () => {
    it('debe devolver una extensión .md', () => {
      expect(filtrarMd(['C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
      'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\src\\api.js',
      'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\src\\cli.js']
      )).toEqual(['C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md']);
    })
  })

  describe('leerContenido', () => {
    it('is a function', () => {
      expect(typeof leerContenido).toBe('function')
    });
    
    it('debe devolver una cadena con todo el contenido del archivo', () => {
      const result= leerContenido('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\prueba\\prueba-api2\\pruebaLeerC.js');
      expect(result.trim()).toEqual(`['leerLink']('https://www.marvel.com/404 tiene problemas de funcionamiento')`);
    });
  });

  describe('listaDirectorios', () => {
    it('debe devolver una matriz de rutas absolutas de archivos .md', ()=> {
      expect(listaDirectorios('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\prueba-md')).toEqual([
        'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\prueba-md\\prueba1.md',
        'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\prueba-md\\prueba2.md'
        
      ])
    });
  });
  
  describe('extraerLinksUnicaRuta', () => {
    it('debe devolver una matriz con las propiedades de cada enlace', () => {
      const output =  [
        {
          href: 'http://www.w3.org/TR/xml/#NT-Name',
          text: 'Name',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md'
        },
        {
          href: 'http://www.w3.org/TR/xml-names/#NT-QName',
          text: 'QName',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md'
        },
        {
          href: 'https://dom.spec.whatwg.org/#validate',
          text: 'validate',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md'
        }
    
      ];
      expect(extraerLinksUnicaRuta('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md')).toEqual(output);
    });
  });

  describe('validarLinksStatus', () => {
    it('debe devolver una matriz con objetos de enlaces de propiedades con su estado', async () => {
      const input = [
        {
          href: 'https://github.com/markedjs/marked',
          text: 'marked',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
        }
      ];
  
      const output = [
        {
          href: 'https://github.com/markedjs/marked',
          text: 'marked',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 200,
          ok: 'OK'
        }
      ];
      // fetch.mockResolvedValue(input);
      const e = await validarLinksStatus(input);
      expect(e).toEqual(output);
    });
  
    it('debe devolver una matriz con objetos de enlaces de propiedades con su estado fallido', () => {
      const input =[
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
        }
      ]
  
      const output = [
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 404,
          ok: 'FAIL'
        }
      ];
      // fetch.mockResolvedValue(input);
      return validarLinksStatus(input).then((e)=>{ expect(e).toEqual(output)});
    })
  
    it('debe devolver una matriz con un objeto con propiedades fallidas', ()=>{
      const input2 = [
        {
          href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
          text: 'Linea de comando CLI',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
        }
      ];
  
      const output2 = [
        {
          href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
          text: 'Linea de comando CLI',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 503,
          ok: 'FAIL'
        }
      ];
      const getResult = validarLinksStatus(input2);
      return getResult.then((el)=> expect(el).toEqual(output2));
    });
  });

  
  
