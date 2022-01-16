//inicio
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const md = require('markdown-it');
//const jsdom = require('jsdom');

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
const rutaArchivo= (ruta) => {
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
//console.log(filtrarMd());

//extraer archivos md

//listaDirectorios = [];

/*listaMd.forEach(ruta => {
    if(path.extname(ruta) == '.md')
    return ruta;
    console.log(ruta);
});*/

//Leer archivo
/*fs.readFile("data.txt",(err,data)=>{
    if(err){
        console.log("Error : ", err);
    }
    else{
        console.log(data.toString());
    }
})*/


/*
//Leer el directorio .....falta recursividad
 fs.readdir('./',(error, files) => {
    if(error){
        throw error;
    }
    console.log('imprimiendo directorios')
    console.log(files); 

    files.forEach(md => {
        if(path.extname(md)=== '.md')
        console.log('imprime los archivos md')
        console.log(md);
    })
 
});
*/
/* 
// Leer archivo 
//const archivo = fs.readFileSync('./mdLinks.js', 'utf8');
fs.readFile('./index.js', 'UTF-8', (error, archivo) => {
    if(error){
        throw error;
    }
    console.log(archivo); 
    console.log('contenido del archivo...');
});
*/
    

// variable para importar el markdown
//var result = md.render('# markdown-it rulezz!');































/*const procesarArchivo = (archivo) => {
    
} 
fs.stat(rutaAbsoluta, (error, stats) => {
    if(error){
        console.log(error);
        return
    }
    if(stats.isFile()){
        procesarArchivo(rutaAbsoluta)
    }else if(stats.isDirectory()){
        //la ruta es un directorio
    }
    //console.log(stats.isFile())
    //console.log(stats.isDirectory())
    
   
});
*/















/*let  rutaDirectorio = (ruta) => {
    if(rutaAbsoluta == (__filename) ){
        console.log('Es un directorio')
    }else{
        console.log('No es un directorio')
    }
};
console.log('filename = ', __filename)
rutaDirectorio(rutaAbsoluta)*/

























/*fs.readdir('./',(error, files) => {
    if(error){
        throw error;
    }
    console.log(files); 
    
    //const archivo = fs.readFileSync('./mdLinks.js', 'utf8');
    fs.readFile('./mdLink.js', 'UTF-8', (error, archivo) => {
        if(error){
            throw error;
        }
        console.log(archivo); 

    });
    console.log('contenido del archivo...');
    
});*/

/*fs.stat('./prueba.js', (error, stats) => {
    if(error){
        console.log(error);
        return
    }
    console.log(stats.isFile())
    console.log(stats.isDirectory())
   
});


    
console.log(path.isAbsolute('/argv'));

const directorios = ruta => {
    let listaDirectorios = [];

}
*/
