const {mdLinks}= require('../src/mdLinks.js');


describe('mdLinks', () => {

  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

it('debería devolver una matriz de objetos con las propiedades de los enlaces como "href", "texto", "file" si las opciones no están validadas', () =>{
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
  //   fetch.mockResolvedValue()
    const result = mdLinks('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md', { validate: false });
    return result
    .then((res) => expect(res).toEqual(output))
    //.catch((err) => console.log(err));      
}); 



it('debe devolver una matriz de objetos con propiedades como "href", "text", "file", "status", "ok" si las opciones no están validadas',() => {
  const output =  [
    {
      href: 'http://www.w3.org/TR/xml/#NT-Name',
      text: 'Name',
      file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'http://www.w3.org/TR/xml-names/#NT-QName',
      text: 'QName',
      file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://dom.spec.whatwg.org/#validate',
      text: 'validate',
      file: 'C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md',
      status: 200,
      ok: 'OK'
    }

  ];
    const result = mdLinks('C:\\Users\\USUARIO\\Documents\\LIM016-md-links\\node_modules\\xml-name-validator\\README.md', { validate: true });
      return result.then((resul) => expect(resul).toEqual(output));
    });

    it('debería devolver un mensaje de advertencia', ()=>{
    const result = mdLinks('src\\text.md')
     return result.catch((e) => expect(e).toBe('La ruta no existe'));
    });
});


