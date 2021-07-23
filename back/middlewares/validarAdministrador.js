module.exports = (req, res, next) => {
    if(req.user.usuario.perfil === "admin"){
        next();
    } else {
        res.status(401).json('no esta autorizado')
    }
}