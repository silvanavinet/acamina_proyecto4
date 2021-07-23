module.exports = (req, res, next) => {
    
    if (!req.user)
        res.status(401).json('no esta autorizado')
    
    const rol = req.user.usuario.perfil
    if( rol === "basico" || rol === "admin" ){
        next();
    } else {
        res.status(401).json('No esta autorizado para realizar esta operación')
    }
}