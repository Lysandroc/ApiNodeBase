var Sequelize       = require ('sequelize')

module.exports = {
    query: function query(connection, command, replacements){
        try{
            let sequelize        = connection.getConection();
            replacements['type'] = sequelize.QueryTypes.SELECT;
            return sequelize.query(command, replacements);
        }catch(error){
            throw error;
        }
    },
    nonQuery: function nonQuery(connection, command,replacements){
        try{
            let sequelize        = connection.getConection();
            replacements['type'] = sequelize.QueryTypes.RAW;
            return sequelize.query(command, replacements);
        }catch(error){
            throw error;
        }
    }
};

