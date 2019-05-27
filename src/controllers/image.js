const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const {Image} = require('../models/index');


const ctrl = {};


ctrl.index = (req,res)=>{
};


//Sube la imagen a travé de muter
ctrl.create = async(req,res)=>{
	const imgUrl= randomNumber();
	console.log(imgUrl);
	const imageTemPath = req.file.path;
	const ext = path.extname(req.file.originalname).toLowerCase();
	const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

	// Validate Extension
	if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
		await fs.rename(imageTemPath, targetPath);
		const newImage = new Image({
			title: req.body.title,
			filename: imgUrl + ext,
			description: req.body.description
		});
		const imageSaved = await newImage.save();
	}
	else{
		await fs.unlink(imageTemPath);
		res.status(500).json({error: 'Solo imagenes permitidas'});
	}
	res.send('works');
	
};

ctrl.like = (req,res)=>{
};

ctrl.comment = (req,res)=>{
};

ctrl.remove = (req,res)=>{
};

module.exports = ctrl;
