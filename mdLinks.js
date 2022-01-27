const api = require ('./api.js');

const mdLinks = (path, option ={}) => {
    return new Promise ((resolve, reject) => {
        if(!api.existeRuta(path)){
            reject('Path does not exist');
        } else {
            let files = api.listaDirectorios(path)
            files = api.filtrarMd(files)
            const link = api.extraerLinksRutas (files);
            if(!(option.validate)){
                resolve(link);
            } else {
                const statusLink = api.validarLinksStatus(link);
                resolve(statusLink);
            }
        }

    });
}



 //const validarMd = mdLinks('.', { validate: false })
 //validarMd
//.then((resul) => console.log (resul))
 //*---------.catch((err)=> console.log(err));


module.exports = { mdLinks };
