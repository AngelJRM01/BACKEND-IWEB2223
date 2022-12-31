const express = require("express");
const router = express.Router();
const cloudinary = require( 'cloudinary' ).v2;
const { validateAccessToken } = require("../middleware/auth0.js");
cloudinary.config( process.env.CLOUDINARY_URL );


//subir imagen a cloudinary
router.post('/uploadImage', validateAccessToken, async (req, res) => {
    const { url } = await cloudinary.uploader.upload( req.files.image.path, { folder: 'IWEB2223' });
 
    return res.json({url});
    
})

module.exports = router;