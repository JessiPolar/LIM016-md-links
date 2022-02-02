#!/usr/bin/env node
const { mdLinks } = require('./mdLinks');
const option = require('./cli-options');
const colors = require('colors');
const figlet = require('figlet');
// Corta hasta el índice 1 y lee desde el indice 2
const [,,...args] = process.argv

 

figlet('Md-Links!!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
setTimeout(()=>{
    // Si el usuario pone un argumento
if (args.length === 1){
    mdLinks(args[0], { validate:false })
    .then(resul=>resul.forEach(e=> console.log(` ${e.href} ${colors.green(e.text)} ${colors.yellow(e.file)}`)))
    .catch(err => console.log(err));
}


// Si el usuario pone 2 argumentos
if(args.length === 2){
    switch (args[1]) {
        case '--validate':
            mdLinks(args[0], { validate: true })
            .then(res => res.forEach(el =>
                console.log(`${el.href} ${colors.green(el.text)} ${colors.yellow(el.file)} ${colors.green(el.status)} ${colors.yellow(el.ok)}`)))
            .catch(err => console.log(err));
        break;

        case '--stats':
            mdLinks(args[0], { validate: false })
            .then(res=> console.log(
              `Total: ${colors.yellow(option.totalLinks(res))} \n` + 
               `Unique: ${colors.yellow(option.uniqueLinks(res))}`
             ))
            .catch(err => console.log(err));
        break;

        case '--help':
            console.log(`${option.help}`);
        break;

        default:console.log(colors.brightRed('Sorry, the command does not exist. Prueba con el comando "--help" '));
        break;
    };

};

// Si el usuario pone 3 argumentos
if(args.length === 3){
    if ( (args[1]=== '--stats' && args[2] === '--validate') || (args[1]=== '--validate' && args[2] === '--stats')  )    {
        mdLinks(args[0], { validate: true })
            .then(res=> console.log(
`Total: ${colors.yellow(option.totalLinks(res))}\n`+ 
`Unique: ${colors.yellow(option.uniqueLinks(res))}\n`+ 
`Broken: ${colors.yellow(option.brokenLinks(res))}`
            ))
            .catch(err => console.log(err));
   
    }else{
        console.log(colors.brightRed('Sorry, the command does not exist. Prueba con el comando "--help"'))
    }
}



},1000);

