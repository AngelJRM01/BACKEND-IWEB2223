const express = require("express");
const router = express.Router();
const cloudinary = require( 'cloudinary' ).v2;
cloudinary.config( process.env.CLOUDINARY_URL );


//subir imagen a cloudinary
router.post('/uploadImage', async (req, res) => {
    console.log(req.files);
    const { url } = await cloudinary.uploader.upload( req.files.image.path, { folder: 'IWEB2223' });
 
    return res.json({url});
    
})

module.exports = router;