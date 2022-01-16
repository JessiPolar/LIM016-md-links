const fs = require('fs');
const path = require('path');

//console.log(process.argv);
//console.log(__dirname);
//console.log(__filename);

/*const filename = path.basename('/Users/Refsnes/demo_path.js', '.js'); // me devuelve el archivo sin la extension
console.log(filename); */ 




//Leer archivos
//const files= fs.readdirSync('./');


const ingresoRuta = './index.js';

fs.readdir('./',(error, files) => {
    if(error){
        throw error;
    }
    console.log(files); 
    
    //const archivo = fs.readFileSync('./mdLinks.js', 'utf8');
    fs.readFile('./mdLinks.js', 'UTF-8', (error, archivo) => {
        if(error){
            throw error;
        }
        console.log(archivo); 

    });
    console.log('contenido del archivo...');
    
});