const { Router } = require('express')
const router = Router()
const { uploadImg } = require('../multer');

const placeCtrl = require('../controllers/place.controller.js') 

router.get('/', placeCtrl.getPlaces);

router.post('/', placeCtrl.createPlace);

router.get('/search', placeCtrl.searchPlace);

router.post('/addPicture', uploadImg.single('picture'), placeCtrl.uploadPicture)

router.get('/:id', placeCtrl.getPlace);

router.put('/:id', placeCtrl.updatePlace);

router.delete('/:id', placeCtrl.deletePlace);

module.exports = router