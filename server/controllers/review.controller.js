const reviewCtrl = {}

const Review = require('../dao/review.dao.js')
const User = require('../dao/user.dao.js')

reviewCtrl.getReviews = async(req, res) => {
    let user = await User.auth(req.query.token);
    let reviews;
    if(user){
        if(req.query.palceId){
            reviews = await Review.getPerPlace(req.query.palceId);
        }else{
            reviews = await Review.readAll();
        }   
        res.status(200).jsonp(reviews);
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesión para poder ver reviews'});
    }
    
}

reviewCtrl.getReviewsPerUser = async(req, res) => {
    let user = await User.auth(req.query.token);
    let reviews;
    if(user){
            reviews = await Review.getPerUser(user._id);
        res.status(200).jsonp(reviews);
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesión para poder ver reviews'});
    }
    
}

reviewCtrl.getReview = async(req, res) => {
 let user = await User.auth(req.query.token);
 if(user){
    console.log('id de usuario', req.params.id);
    const review = await Review.read(req.params.id);
    console.log('review', review);
    res.status(200).jsonp(review);
 }else{
    res.status(400).json({message: 'Necesitas iniciar sesión para poder ver la review'});
 }
    
}
    
reviewCtrl.createReview = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        const newReview =  await Review.create(req.body)
        res.status(200).jsonp(newReview)
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesión para poder crear la review'});
    }
}

reviewCtrl.updateReview = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        await Review.update(req.params.id, req.body);
        res.status(200).json({status: 'Review actualizada'})
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesión para poder actualizar la review'});
    }
}

reviewCtrl.deleteReview = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        await Review.delete(req.params.id)
        res.status(200).json({status: 'Review eliminada'})
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesión para poder eliminar la review'});
    }
    
}

reviewCtrl.uploadPicture = async(req, res) => {
    console.log('Archivos', req.file);
    let urlPicture = `/pictures/${req.file.filename}`;
    console.log('Imagen', urlPicture);
    let reviewId = req.body.reviewId;
    await Review.addPicture(reviewId, urlPicture);
    res.status(200).jsonp({message: 'ok'})
};

module.exports = reviewCtrl;