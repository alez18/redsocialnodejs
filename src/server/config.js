//Permite unir directorios
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index');
const errorHandler = require('errorhandler');

module.exports = app=>{

	//Settings
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, '../views'));

	//**Motor de plantillas
	app.engine('.hbs', exphbs({
		defaultLayout: 'main',
		partialsDir: path.join(app.get('views'), 'partials'),
		layoutsDir: path.join(app.get('views'), 'layouts'),
		//La extensión de los archivos
		extname: '.hbs',
		helpers: require('./helpers')
	}));
	app.set('view engine', '.hbs');

	//middlewares
	app.use(morgan('dev'));

	//Subir la imagen, con el single, esta definido el nombre del input origen
	app.use(multer({
		dest: path.join(__dirname,'../public/upload/temp')
		}).single('image')
	);

	//Para recibir los datos que vengan del formulario
	app.use(express.urlencoded({extended: false}));
	//Manejo de likes para AJAX
	app.use(express.json());


	//routes
	routes(app);

	//static files
	app.use('/public',express.static(path.join(__dirname,'../public')));



	//errorhandlers
	if ('development' === app.get('env')){
		app.use(errorHandler);
	}



	return app;

}