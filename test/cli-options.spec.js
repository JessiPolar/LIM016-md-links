const { 
    totalLinks,
    uniqueLinks,
    brokenLinks,
     } = require('../src/cli-options.js');
    
    const prueba = [
        {
          href: 'https://docs.npmjs.com/getting-started/what-is-npm',
          text: 'NPM',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 200,
          message: 'OK'
        },
        {
          href: 'https://nodejs.org/api/path.html',
          text: 'Path',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 200,
          message: 'OK'
        },
        {
          href: 'https://google.',
          text: 'Google',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 'Error FetchError: request to https://google./ failed, reason: getaddrinfo ENOTFOUND google.',
          ok: 'FAIL'
        },
        {
          href: 'https://facebook.',
          text: 'Facebook',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 'Error FetchError: request to https://facebook./ failed, reason: getaddrinfo ENOTFOUND facebook.',
          ok: 'FAIL'
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\README.md',
          status: 404,
          ok: 'FAIL'
        }
      ]
    
    describe('totalLinks', ()=>{
        it('debe devolver el total de links', () => {
            expect(totalLinks(prueba)).toBe(5);
        });
    });
    
    describe('uniqueLinks', ()=>{
        it('debe devolver el total de links únicos', ()=>{
            expect(uniqueLinks(prueba)).toBe(5);
        })
    });
    
    describe('brokenLinks', ()=>{
        it('debe devolver el total de links rotos', ()=>{
            expect(brokenLinks(prueba)).toBe(3);
        });
    });