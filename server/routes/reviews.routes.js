const { Router } = require('express');
const router = Router();
const { uploadImg } = require('../multer');

const reviewCtrl = require('../controllers/review.controller.js') 

router.get('/', reviewCtrl.getReviews);

router.get('/user', reviewCtrl.getReviewsPerUser);

router.post('/addPicture', uploadImg.single('picture'), reviewCtrl.uploadPicture)

router.post('/', reviewCtrl.createReview);

router.get('/:id', reviewCtrl.getReview);

router.put('/:id', reviewCtrl.updateReview);

router.delete('/:id', reviewCtrl.deleteReview);

module.exports = router