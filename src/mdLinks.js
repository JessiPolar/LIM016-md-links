const api = require ('./api.js');


const mdLinks = (path, option ={}) => {
    
        return new Promise ((resolve, reject) => {
            if(!api.existeRuta(path)){
            reject('La ruta no existe');
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

        })
   

}

module.exports = { mdLinks };
