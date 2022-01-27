const totalLinks = (arrayLinks) => {
  arrayLinks.map((el) => el.href).length;
  return `Total  : ${totalLinks.length}`

} 

// Función para obtener la cantidad de los links unicos(unique) encontrados en la ruta
const uniqueLinks = (arrayLinks) => {
    const linksSet = new Set ([]);  // almacena valores únicos irrepetibles
    arrayLinks.forEach((element) => linksSet.add(element.href));
    return `Unique : ${linksSet.size}`
};

// Función para obtener la cantidad de los links rotos(broken) encontrados en la ruta
const brokenLinks = (arrayLinks) => {
  const broken = arrayLinks.filter((e)=> e.message=== 'fail');
  return `Broken : ${broken.length}`;
};

/*const statsLinks = (array)=>{
  const totalLinks = array.map( link => link.href)
  const uniqueLinks = new Set(totalLinks)
  return `Total  : ${totalLinks.length}\nUnique : ${uniqueLinks.size}`
}*/
/*const brokenLinks =(array)=>{
    const msgLinks = array.map( link => link.message)
    const broken= msgLinks.filter( link => link.message ==='FAIL')
    return `Broken : ${broken.length}`
}
*/
//dafne


//console.log(statsLinks ('.'))
//console.log(brokenLinks('.'))
//comparar

/*const totalLinks = (links) => {
  const totalLinks = links.length;
  return `TOTAL: ${totalLinks}`;
}

const uniqueLinks = (links) => {
  const uniqueLinks = [...new Set(links.map(elem => elem.href))].length;
  return `UNIQUE: ${uniqueLinks}`
};
*/

module.exports = { 
  totalLinks,
  uniqueLinks,
  brokenLinks
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