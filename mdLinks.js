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
 //---------.catch((err)=> console.log(err));

 //prueba 2
 /*const mdLinks = (path,option ) => new Promise((res,rej)=>{
    const pathValid = api.rutaAbsoluta(path);
    if(api.existeRuta(pathValid)){
        const extraerLinksRutas = api.extraerLinksRutas(pathValid);
        if(extraerLinksRutas.length===0){
           rej('error')
        }else {
            if(option.validate===true){
                const validLinks = extraerLinksRutas.map(obj => api.validarLinksStatus(obj));
                res(Promise.all(validLinks));        
            }else {
                res(api.extraerLinksRutas(pathValid));
            }
        }
    }else {
        rej ('noExist');
  }
}) 

*/



module.exports = { mdLinks };
