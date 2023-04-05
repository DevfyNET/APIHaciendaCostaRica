import jwt from 'jwt-simple';
import moment from 'moment';

import { clave_secreta } from '../global/environment';

class JWT {

    public  clave_jwt = clave_secreta;

    /**
     * Crea un token
     * @param {string} id_usuario
     * @param {string} id_rol
     * @param {string} id_tipo_usuario
     */
    public CrearToken(usuario: { codigo_empleado: any; cedula: any; nombre: any; apellidos: any; }){
        let payload = {
            codigo_empleado: usuario.codigo_empleado,
            cedula: usuario.cedula,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            iat: moment().unix(),
            exp: moment().add(30, 'days').unix
        };

        return jwt.encode(payload, this.clave_jwt);
    }
}

export default JWT;