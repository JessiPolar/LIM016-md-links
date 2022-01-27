//inicio
const fs = require('fs');
const path = require('path');
const { exit, title } = require('process');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch');


//ingreso de ruta
let ruta = process.argv[2];
//console.log(process.argv[2]);
//Es la ruta absoluta?
let  convertirRuta = (ruta) => {
    if(path.isAbsolute(ruta)){              // si la ruta es absoluta que me la devuelva y me la imprima 
        console.log('La ruta es absoluta');
        return ruta;
    }else{
        ruta= path.resolve(ruta)            // sino es absoluta, que me la convierta a absoluta, me la retorne y me la imprima
        console.log(ruta);
        return ruta;
    }
};
 ruta = convertirRuta(ruta);
//console.log(rutaAbsoluta);

//El archivo existe
const existeRuta = (ruta) => fs.existsSync(ruta);
/*if(fs.existsSync(ruta)){
    console.log('El archivo existe');
}else{
    console.log('El archivo no existe');
    exit()
}*/

//Es la ruta absoluta un directorio?
fs.stat(ruta, (error, stats) => {
    if(error){
        console.log(error);
        return
    }
    //console.log(stats.isFile())
    console.log(stats.isDirectory())
   
});

//Recursividad..... Leer directorios
const rutaArchivo = (ruta) => {
    let archivo = fs.lstatSync(ruta);
    let esArchivo = archivo.isFile();
    return esArchivo;
    //console.log(rutaDirectorio);
};

const listaDirectorios = ruta => {
    let arrayDirectorio = [];
    if(rutaArchivo(ruta)) {
        arrayDirectorio.push(ruta);
    }else {
        const leerDirectorio = fs.readdirSync(ruta);
        leerDirectorio.forEach(file => {
            const rutaDirectorio = path.join(ruta,file);
            arrayDirectorio = arrayDirectorio.concat(listaDirectorios(rutaDirectorio))
        })
    }
    return arrayDirectorio;
    //console.log(arrayDirectorio);  
};


let archivos = listaDirectorios(ruta)
console.log(archivos);


//Extraer archivos md

const filtrarMd = (archivos) => {
    return archivos.filter((ruta) => {
        return path.extname(ruta) === '.md';
    })
    
}

archivos = filtrarMd(archivos)
console.log(archivos)


//console.log(leerContenido(archivos));
const leerContenido = ruta => fs.readFileSync(ruta).toString();

// Extraer los links de los archivos md 1
const extraerLinksUnicaRuta = (ruta) => {
    const mdHtml = md.render(leerContenido(ruta));
    const dom = new JSDOM(mdHtml).window.document.querySelectorAll('a');
    let arrDom = [];
    dom.forEach(elem => {
        arrDom.push({
            href: elem.href,
            text: (elem.textContent).slice(0,50),
            file: ruta
        });
    });
    return arrDom;
}

 //const linksRuta = extraerLinksUnicaRuta(ruta);
 //console.log(linksRuta);

// rutas: arreglo de rutas
const extraerLinksRutas = (rutas) => {
    let links = [];
    rutas.forEach(ruta => {
        let linksDeLaRuta = extraerLinksUnicaRuta(ruta);
        console.log('length = ', linksDeLaRuta.length)
        links.push(linksDeLaRuta);
    })
    //links = links.flat()
    console.log('length = ', links.length)
    return links;
}

const linksRutas = extraerLinksRutas(archivos);
//console.log("Los links de las rutas son:", linksRutas);
console.log("La cantidad de archivos es: ", archivos.length);


// VALIDADE

const validarLinksStatus = (links) =>{
    console.log('links = ', links)
    let myPromises = links.map(link => new Promise((resolve) => {
        return fetch(link.href)
            .then(response => {
                if(response.status >= 200 && response.status <= 299){
                    link.status = response.status,
                    link.statustext = response.statustext,
                    resolve(link);
                }else{
                    link.status = response.status,
                    link.statustext = 'FAIL'
                    resolve(link);
                }
            })
            .catch(() => {
                link.status = 404,
                link.statustext = 'FAIL'
                resolve(link);
            });  
    }));
    return Promise.all(myPromises)
    .then((response) => {
        let ok = 0, rotos = 0;
        let nombreArchivo;
        response.forEach(link => {
            nombreArchivo = link.file;
            if(link.status == 404) {
                rotos += 1
            }else{
                ok += 1
            }
        })
        if(ok + rotos > 0) {
            console.log('archivo: ', nombreArchivo);
            console.log('links correctos = ', ok);
            console.log('links rotos = ', rotos)
        }
        
    })

};


linksRutas.forEach(links => {
    validarLinksStatus(links)
})

 /*const totalLinks = (links) => {
    const totalLinks = links.length;
    return `TOTAL: ${totalLinks}`;
  }
  
 const uniqueLinks = (links) => {
    const uniqueLinks = [...new Set(links.map(elem => elem.href))].length;
    return `UNIQUE: ${uniqueLinks}`
 };*/

 module.exports = {
    convertirRuta,
    existeRuta, 
    rutaArchivo, 
    listaDirectorios,
    filtrarMd,
    extraerLinksUnicaRuta,
    extraerLinksRutas,
    validarLinksStatus, 

 };
 
//Validar Links

/*const getStatusLink = (linksRutas) => {
    const arrayLinks = linksRutas.map((elemento) => 
      fetch(elemento.href)
        .then((res) => {
          const data = {
            href: elemento.href,
            text: elemento.text, // jala el key "text" del objeto anterior 
            file: elemento.file,
            status: res.status, // el método status pertenece a fetch y devuelve un number 
            message: res.status >= 200 && res.status <= 299 ? 'OK' : 'fail', // Normalmente cuando el status de la peticion http da un numero con base 2 significa que la peticion ha tenido éxito
          };
          return data;
        }).catch((error) => {
          const data = {
            href: elemento.href,
            text: elemento.text,
            file: elemento.file,
            status: 'Error ' + error,
            message: 'fail'
          };
          return (data);
        }));
    return Promise.all(arrayLinks);
  };
 console.log( getStatusLink(linksRutas))
*/
