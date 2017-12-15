module.exports = {    
    listFilesFromFolder: function listFilesFromFolder(dir){        
        const fs = require('fs');
        var retorno = [];
        fs.readdirSync(dir).forEach(file => {
          retorno.push(dir + file);
        });
        return retorno;
    }
}
