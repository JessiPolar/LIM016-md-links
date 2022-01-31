//#! / usr / bin / env nodo
const { mdLinks } = require('./mdLinks');
const option = require('./cli-options');
const colors = require('colors');

// Corta hasta el índice 2 y lee desde el indice 3 
const arguments = process.argv.slice(2);

// Si el usuario pone un argumento
if (arguments.length === 1){
    mdLinks(arguments[0], { validate:false })
    .then(resul=>resul.forEach(e=> console.log(` ${e.href} ${colors.green(e.text)} ${colors.yellow(e.file)}`)))
    .catch(err => console.log(err));
}


// Si el usuario pone 2 argumentos
if(arguments.length === 2){
    switch (arguments[1]) {
        case '--validate':
            mdLinks(arguments[0], { validate: true })
            .then(res => res.forEach(el =>
                console.log(`${el.href} ${colors.green(el.text)} ${colors.yellow(el.file)} ${colors.green(el.status)} ${colors.yellow(el.ok)}`)))
            .catch(err => console.log(err));
        break;

        case '--stats':
            mdLinks(arguments[0], { validate: false })
            .then(res=> console.log(
              `Total: ${colors.yellow(option.totalLinks(res))} \n` + 
               `Unique: ${colors.yellow(option.uniqueLinks(res))}`
             ))
            .catch(err => console.log(err));
        break;

        default:console.log(colors.brightRed('Sorry, the command does not exist. " '));
        break;
    };

};

// Si el usuario pone 3 argumentos
if(arguments.length === 3){
    if ( arguments[1]=== '--stats' && arguments[2] === '--validate')   {
        mdLinks(arguments[0], { validate: true })
            .then(res=> console.log(
`Total: ${colors.yellow(option.totalLinks(res))} 
Unique: ${colors.yellow(option.uniqueLinks(res))} 
Broken: ${colors.yellow(option.brokenLinks(res))}`
            ))
            .catch(err => console.log(err));
    }
    else if(arguments[1]=== '--validate' && arguments[2] === '--stats') {
        
        mdLinks(arguments[0], { validate: true })
        .then(res=> console.log(
`Total: ${colors.yellow(option.totalLinks(res))} 
Unique: ${colors.yellow(option.uniqueLinks(res))} 
Broken: ${colors.yellow(option.brokenLinks(res))}`
        ))
        .catch(err => console.log(err));
        
    }else{
        console.log(colors.brightRed('Sorry, the command does not exist. "'))
    }
}


