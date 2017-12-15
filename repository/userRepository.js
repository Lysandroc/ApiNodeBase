var baseRepository      = require('../repository/base');
var conn                = require('../connection/conn');

module.exports = {
    getUserById: function getUserById(id){
        try{          
            let sql = 'SELECT ID,NAME FROM USER ' 
                       + 'WITH (NOLOCK) where ID = :ID';
            let replacements = { replacements: { ID: id }};

            return baseRepository.query(conn, sql, replacements);            
        }catch(error){
            throw error;
        }
    }
  };