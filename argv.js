console.log(process.argv);

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
}

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