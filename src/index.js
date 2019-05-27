const express = require('express');

const config = require('./server/config');

//Database
require('./database');

//Sirve para configurar express
const app = config(express());


app.listen(app.get('port'), ()=>{
	console.log('Server on port', app.get('port'));
});