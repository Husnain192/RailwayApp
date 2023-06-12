const msql = require('mysql');

const connection = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'metroDB'
});

connection.connect(function(error){
    if(error){
        console.log('Error');
    }
    else{
        console.log('Connected');
    }
});

module.exports = connection;