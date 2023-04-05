import jwt from 'jwt-simple';
import moment from'moment';

import { clave_secreta } from '../global/environment';

class Autentidicacion {

    public  clave_jwt = clave_secreta;
    
    /**
     * @method AutentidicacionMiddleware
     * @desc   Middleware de autentificacion
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns string token
     */
    public AutentidicacionMiddleware =  (req: any , res: any, next: any) =>{

        if (!req.headers.authorization) {
            return res.status(403).send({
                message: 'La petición no tiene la cabecera de autentificación.'
            });
        }

        var token = req.headers.authorization.replace(/['"]+/g, '');

        try {
            var payload = jwt.decode(token, this.clave_jwt);

            if(payload.exp <= moment().unix()){
                return res.status(401).send({message: 'El token ha expirado.'});
            }
        } catch (err) {
            return res.status(404).send({message: 'El token no es válido.'});
        }

        req.usuario = payload;

        next();
    }

}

export default Autentidicacion;