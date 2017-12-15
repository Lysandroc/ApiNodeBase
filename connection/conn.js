var Sequelize       = require ('sequelize')
var env             = process.env.NODE_ENV || 'DEV';
var configDatabase 	= require('../configDatabase-' + env.toUpperCase());
var util 	        = require('../util');
var sequelize;

sequelize = new Sequelize(
    configDatabase.dataBase,
    configDatabase.user,
    configDatabase.pass,
    {  
        host: configDatabase.server,
        dialect: 'mssql',
        dialectOptions: {
            appName: configDatabase.appName
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
            handleDisconnects: true,
            evict: 10000
        }
    }
);

sequelize
.authenticate()
.then(function(err) {
    console.log('Conection with '+ configDatabase.server +' database: '+ configDatabase.dataBase +' successfully!');
})
.catch(function (err) {
    console.log('Error while trying connect:' + err);
});

module.exports = {
    getConection: function getConection() {
        return sequelize;
    }
}