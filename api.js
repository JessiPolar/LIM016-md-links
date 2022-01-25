//inicio
const fs = require('fs');
const path = require('path');
const { exit, title } = require('process');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch');
console.log('Este es el md',{md})

//ingreso de ruta
let ruta = process.argv[2];
//console.log( ingresoRuta );
console.log(process.argv[2])
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

if(fs.existsSync(ruta)){
    console.log('El archivo existe');
}else{
    console.log('El archivo no existe');
    exit()
}

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

// const linksRuta = extraerLinksUnicaRuta(ruta);
// console.log(linksRuta);

// rutas: arreglo de rutas
const extraerLinksRutas = (rutas) => {
    let links = [];
    rutas.forEach(ruta => {
        let linksDeLaRuta = extraerLinksUnicaRuta(ruta);
        links.push(linksDeLaRuta);
    })
    return links;
}

const linksRutas = extraerLinksRutas(archivos);
console.log("Los links de las rutas son:", linksRutas);
console.log("La cantidad de archivos es: ", archivos.length);

//Validar Links
/*const validarLinks = (result) => {
    return fetch(result.href)
    .then(res =>{
        const status = (res.status == 200) ? res.status : 'FAIL';
        const objRes = {
            href: result.href,
            title: result.title,
            file: result.file,
            status: res.status,
            message: status
        }
        return objRes
    }).catch(rej => {
        const objRej = {
            href: result.href,
            title: result.title,
            file: result.file,
            status: rej.status,
            message: 'FAIL'

        }
        return objRej
    })
    
}
console.log(validarLinks(linksRutas))*/

//validade

/*const validarLinksStatus = (links) =>{
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
        return response.length;
    })
};
let res = validarLinksStatus(linksRutas[0]);
console.log('res = ', res)

 const totalLinks = (links) => {
    const totalLinks = links.length;
    return `TOTAL: ${totalLinks}`;
  }
  
 const uniqueLinks = (links) => {
    const uniqueLinks = [...new Set(links.map(elem => elem.href))].length;
    return `UNIQUE: ${uniqueLinks}`;
  }*/