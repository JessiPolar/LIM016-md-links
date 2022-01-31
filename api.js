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

//El archivo existe
const existeRuta = (ruta) => fs.existsSync(ruta);
if(existeRuta(ruta)){
    //console.log('El archivo existe');
}else{
    //console.log('El archivo no existe');
    exit()
}
//Es la ruta absoluta?
let  rutaAbsoluta = (ruta) => {
    if(path.isAbsolute(ruta)){              // si la ruta es absoluta que me la devuelva y me la imprima 
        //console.log('La ruta es absoluta');
        return ruta;
    }else{
        ruta= path.resolve(ruta)            // sino es absoluta, que me la convierta a absoluta, me la retorne y me la imprima
        //console.log(ruta);
        return ruta;
    }
};
 ruta = rutaAbsoluta(ruta);
//console.log(ruta);

//Es la ruta absoluta un directorio?
const rutaDirectorio = (ruta) => fs.statSync(ruta).isDirectory();
if(rutaDirectorio(ruta)){
    //console.log('El directorio existe');
}else{
   // console.log('El directorio no existe');
    
}
   

//Recursividad..... Leer directorios
const rutaArchivo = (ruta) => {
    let archivo = fs.lstatSync(ruta);
    let esArchivo = archivo.isFile();
    return esArchivo;
    
};
//console.log('Este es el fs.lstatSync: ', rutaArchivo('README.md'));


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
//console.log(archivos);


//Extraer archivos md

const filtrarMd = (archivos) => {
    return archivos.filter((ruta) => {
        return path.extname(ruta) === '.md';
    })
    
}

archivos = filtrarMd(archivos)
//console.log(archivos)


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
        //console.log('length = ', linksDeLaRuta.length)
        links.push(linksDeLaRuta);
    })
    links = links.flat()
    //console.log('length = ', links.length)
    //console.log(links = links.flat())
    return links;
}

const linksRutas = extraerLinksRutas(archivos);
//console.log("Los links de las rutas son:", linksRutas);
//console.log("La cantidad de archivos es: ", archivos.length);

// VALIDADE

const validarLinksStatus = (links) =>{
    //console.log('links = ', links)
    let myPromises = links.map(elem=> new Promise((resolve) => {
        return fetch(elem.href)
            .then(response => {
                if(response.status >= 200 && response.status <= 299){
                    elem.status = response.status,
                    elem.ok = "OK"
                    resolve(elem);
                }else{
                    elem.status = response.status,
                    elem.ok = 'FAIL'
                    resolve(elem);
                }
            })
            .catch(() => {
                elem.status = 404,
                elem.ok = 'FAIL'
                resolve(elem);
            });  
    }));
    return Promise.all(myPromises)
    .then((res) => {
        //console.log(res);
        return res;
      })
      .catch((err)=>{
        //console.log(err);
        return err;
      })
};

/*linksRutas.forEach(links => {
    validarLinksStatus(links)
})*/

 module.exports = {
     existeRuta,
    rutaAbsoluta,
    rutaDirectorio, 
    rutaArchivo, 
    listaDirectorios,
    filtrarMd,
    leerContenido,
    extraerLinksUnicaRuta,
    extraerLinksRutas,
    validarLinksStatus 

 };
 
