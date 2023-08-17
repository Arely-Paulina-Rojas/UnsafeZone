const userCtrl = {}

const User = require('../dao/user.dao.js')

userCtrl.getUsers = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        const users = await User.readAll()
        res.status(200).jsonp(users);
    }else{
        res.status(400).jsonp({message: 'Necesitas iniciar sesion para poder ver usuarios'});
    };
    
}

userCtrl.getUser = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user && user.role == 'admin'){
        const user = await User.read(req.params.id)
        res.status(200).jsonp(user);
    }else{
        res.status(400).jsonp({message: 'Necesitas iniciar sesion para poder ver al usuario'});
    };  
}

userCtrl.getUserData = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        res.status(200).jsonp(user);
    }else{
        res.status(400).jsonp({message: 'Necesitas iniciar sesion para poder ver al usuario'});
    };  
};
    
userCtrl.createUser = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        const newUser =  await User.create(req.body)
        res.status(200).jsonp({message: 'Usuario creado'});
    }else{
        res.status(400).jsonp({message: 'Necesitas iniciar sesion para poder crear al usuario'});
    };
}

userCtrl.register = async(req, res) => {
        let user = req.body;
        user.role ='user';
        const newUser =  await User.create(user)
        res.status(200).jsonp({message: 'Usuario creado'});
}

userCtrl.updateUser = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        await User.update(req.params.id, req.body)
        res.status(200).jsonp({message: 'Usuario actualizado'});
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesión para poder actualizar al usuario'});
    };
    
}

userCtrl.deleteUser = async(req, res) => {
    let user = await User.auth(req.query.token);
    if(user){
        await User.delete(req.params.id)
        res.status(200).json({message: 'Usuario eliminado'})
    }else{
        res.status(400).json({message: 'Necesitas iniciar sesión para poder eliminar al usuario'});
    }
}

userCtrl.login = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log('Credenciales', email, password);
    let user = await User.getUserPerEmail(email);
    if(user && user.password == password){
        let token = 'TEYWTEY:'+user.email;
        await User.addToken(user._id, token);
        res.status(200).jsonp({token: token, role: user.role});
    }else{
        res.status(400).jsonp({message: 'No se encontro el usuario'});
    };
}



module.exports = userCtrl;
