const ctrl = {};

const { Image } = require('../models');

ctrl.index = async (req,res)=>{
		const images = await Image.find().sort({timestamp: -1});
		//Le pasamos las imagenes al index con un objeto
		res.render('index', {images});
};



module.exports = ctrl;
