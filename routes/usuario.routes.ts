import { Router, Request, Response } from 'express';

import bcrypt from 'bcrypt';
import  JWT from '../services/jwt';

import Usuario from '../classes/usuario';

const _u = new Usuario();
const _jwt = new JWT();

const usuario = Router();

usuario.route('/usuario/crear-usuario').post((req, res) => {

    let datos = { ...req.body };

    _u.crearUsuario(datos).then((result) => {
        res.status(200).json({
            'success': true,
            'result': result
        });
    }).catch(function (err) {
        res.status(500).json({
            'success': false,
            'result': err
        });
    });
});


usuario.route('/usuario/iniciar-sesion').post((req, res) => {

    let datos = { ...req.body };
    
    _u.iniciarSesion(datos).then( (result) => {
        bcrypt.compare( datos.pass, result.pass,  function(err, result2) {
            if (result2 != null) {
                
                /**
                 * Comprobar y generar token
                 */
                if (datos.token == 1) {
                    /**
                     * devolver token
                     */
                    return res.status(200).send({
                        token: _jwt.CrearToken(result)
                    });

                } else {
                    /**
                     * Información Usuario
                     */
                     _u.infoUsuario(datos.cedula).then((result) => {
                        return res.status(200).send({
                            info: result
                        });
                    }).catch(function (err) {
                        return res.status(500).send({
                            response: "Error al solicitar información del usuario.",
                            tipo: false
                        });
                    });
                }
            } else {
                console.log({response: 'El usuario no ha podido iniciar sesión correctamente.', tipo: false});
            }
        }); 
          
    }).catch(function (err) {
        res.status(500).json("Errors:" + err);
    });
});

usuario.route('/usuario/info/:cedula').get((req, res) => {
    _u.infoUsuario(req.params.cedula).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

usuario.route('/usuario/todos/:cod').get((req, res) => {
    _u.getTodosUsuarios(req.params.cod).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

usuario.route('/usuario/comprobar-pass/:cedula').get((req, res) => {
    _u.comprobarContrasena(req.params.cedula).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

usuario.route('/usuario/cambiar-contrasena').put((req, res) => {
    let datos = { ...req.body };
    
    _u.cambiarContrasena(datos).then((result) => {
        res.status(200).json(result);
    }).catch(function (err) {
       return res.status(500).json('Error '+err);
    });
});

export default usuario;