const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

//Convertir correo en un hash
const md5 = require('md5');

const { Image, Comment } = require('../models');


const ctrl = {};


ctrl.index = async (req,res)=>{
	//$regex, que su nombre coincida
	const image = await Image.findOne({filename: {$regex: req.params.image_id}});
	//TIene una propiedad ._id, el propio id de la imagen
	const comments = await Comment.find({image_id: image._id});
	res.render('image',{image, comments});
};


//Sube la imagen a travé de muter
ctrl.create = async(req,res)=>{
	const saveImage = async ()=>{
		const imgUrl= randomNumber();
		const images = await Image.find({filename: imgUrl});

		if(images.lenght > 0){
			//Recursión
			saveImage();
		} else{
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
				//res.redirect('/images/:image_id');
				res.redirect('images/' + imgUrl);
			}
			else{
				await fs.unlink(imageTemPath);
				res.status(500).json({error: 'Solo imagenes permitidas'});
			}
		}
	}
	saveImage();
};

ctrl.like = (req,res)=>{
};

ctrl.comment = async (req,res)=>{
	const image = await Image.findOne({ filename: { $regex: req.params.image_id}})
	if(image){
			const newComment = new Comment(req.body);
			//Es lo que necesita para funcionar
			newComment.gravatar = md5(newComment.email);
			newComment.image_id = image._id;
			await newComment.save();
			res.redirect('/images/' + image.uniqueId);

	}

};

ctrl.remove = (req,res)=>{
};

module.exports = ctrl;
