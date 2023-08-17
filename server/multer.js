const multer = require('multer');
const path = require('path');

const pictures = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('hola', __dirname);
        console.log(path.join(__dirname, '..', `/server/public/pictures`));
        cb(null, path.join(__dirname, '..', `/server/public/pictures`));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const filter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg") {
        cb(null, true);
    } else {
        cb(null, false);
        return false;
    }
};

exports.uploadImg = multer({ storage: pictures });