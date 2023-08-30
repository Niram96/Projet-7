const sharp = require('sharp');

async function optimizeImg (req, res, next) {
    const name = req.file.originalname.split(' ').join('_');
    const path = `${name}${Date.now()}.webp`;
    await sharp (req.file.buffer)
    .resize(404, 568, {fit:"inside"})
    .toFormat('webp')
    .toFile('./images/' + path);
    req.file.filename = path;
    next();
}

module.exports = optimizeImg;