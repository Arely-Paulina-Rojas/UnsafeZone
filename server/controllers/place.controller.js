const placeCtrl = {}

const Place = require('../dao/place.dao.js')
const User = require('../dao/user.dao.js')


placeCtrl.getPlaces = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        const places = await Place.readAll()
        res.status(200).jsonp(places);
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesion para consultar los lugares'});
    };
    
}

placeCtrl.getPlace = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        console.log('id de usuario', req.params.id);
        const place = await Place.read(req.params.id);
        console.log('lugar', place);
        res.status(200).jsonp(place);
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesion para consultar un lugar'});
    };
}

placeCtrl.searchPlace = async(req, res) => {
    console.log('ewwewe', req.query.token)
    let user = await User.auth(req.query.token);
    if(user){
        console.log('Lugar', req.query.fullAddress);
        const place = await Place.findPlace(req.query.fullAddress);
        res.status(200).jsonp(place);
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesion para buscar un lugar'});
    };
}
    
placeCtrl.createPlace = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        let place = req.body;
        place.fullAddress = place.street +" "+ place.number +" "+ place.suburb +" "+ place.town +" "+ place.state;
        const newPlace =  await Place.create(place)
        res.status(200).jsonp(newPlace);
    }else{
        res.status(400).jsonp({message: 'Necesitas iniciar sesion para poder crear lugares'});
    };
}

placeCtrl.updatePlace = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        let place = req.body;
        place.fullAddress = place.street +" "+ place.number +" "+ place.suburb +" "+ place.town +" "+ place.state;
        await Place.update(req.params.id, place);
        res.status(200).jsonp({message: 'Lugar actualizado'})
    }else{
        res.status(400).jsonp({message: 'Necesitas iniciar sesion para poder actualizar un lugar'});
    }
    
}

placeCtrl.deletePlace = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        await Place.delete(req.params.id)
        res.status(200).jsonp({message: 'Lugar eliminado'})
    }else{
        res.status(400).jsonp({message: 'Necesitas iniciar sesion para poder eliminar un lugar'});
    }
    
}

placeCtrl.uploadPicture = async(req, res) => {
    console.log('Archivos', req.file);
    let urlPicture = `/pictures/${req.file.filename}`;
    console.log('Imagen', urlPicture);
    let placeId = req.body.placeId;
    await Place.addPicture(placeId, urlPicture);
    res.status(200).jsonp({message: 'ok'})
};

module.exports = placeCtrl;
