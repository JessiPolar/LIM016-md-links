const colors = require('colors');

const totalLinks = (arrayLinks) => {
  return arrayLinks.length;
} 

// Función para obtener la cantidad de los links unicos(unique) encontrados en la ruta
const uniqueLinks = (arrayLinks) => {
    const linksSet = new Set ([]);  // almacena valores únicos irrepetibles
    arrayLinks.forEach((element) => linksSet.add(element.href));
    return linksSet.size;
};

// Función para obtener la cantidad de los links rotos(broken) encontrados en la ruta
const brokenLinks = (arrayLinks) => {
  const broken = arrayLinks.filter((e)=> e.ok === 'FAIL');
  return broken.length;
};

const help = `
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                    ${colors.cyan('HELP')}                                                            ║
╠═════════════════════════════════════════ ════════════════════════════════════════════════════════════════════════════╣
║ ${colors.cyan('--validate')}                            Muestra el link, el texto, la ruta, el status y el mensaje.  ║
╠═════════════════════════════════════════ ════════════════════════════════════════════════════════════════════════════╣
║ ${colors.cyan('--stats')}                               Muestra el total de links y los links únicos.                ║
╠═════════════════════════════════════════  ═══════════════════════════════════════════════════════════════════════════╣
║ ${colors.cyan('--stats --validate')}                    Muestra los links totales, únicos y rotos.                   ║
╚═════════════════════════════════════════  ═══════════════════════════════════════════════════════════════════════════╝
${colors.yellow(`Utilice esta estructura: md-links <ruta> <comando> para ejecutar el cli.
Pero también puedes escribir solo md-links <ruta> y obtendrás el enlace, su texto y su archivo.`)}` 

module.exports = { 
  totalLinks,
  uniqueLinks,
  brokenLinks,
  help
};















/*console.log(process.argv);

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
  case 'insult':
    console.log(myArgs[1], 'smells quite badly.');
    break;
  case 'compliment':
    console.log(myArgs[1], 'is really cool.');
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}*/

//procesos
/*function param(p) {
    var index = process.argv.indexOf(p);
    //console.log(index);
    return process.argv[index + 1 ]
}
var nombre = param('--nombre');
var edad = param('--edad');
console.log(`Tu nombre es ${nombre} y tienes ${edad} anios`);
*/