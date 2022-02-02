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















