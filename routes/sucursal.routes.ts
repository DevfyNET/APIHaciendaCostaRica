import { Router, Request, Response } from 'express';
import Sucursal from '../classes/sucursal';
import Autentidicacion from '../middlewares/autentificacion';

const _s = new Sucursal();
const _a = new Autentidicacion();

const sucursal = Router();

sucursal.post('/caja/crear',  _a.AutentidicacionMiddleware, (req: Request, res: Response) => {

    let datos = { ...req.body };
    _s.insertUsuarioCaja(datos).then(result => {
        res.status(200).json({mgs: '¡La información ha sido guardada con éxito!'});
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

sucursal.get('/caja/:id/:usuario',  _a.AutentidicacionMiddleware, (req: Request, res: Response) => {

    _s.getUsuarioCaja(req.params).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

sucursal.put('/caja/update',  _a.AutentidicacionMiddleware, (req: Request, res: Response) => {
    
    let datos = { ...req.body };

    _s.updateUsuarioCajaEstado(datos).then(result => {
        res.status(200).json({mgs: '¡La información ha sido actualizada con éxito!'});
    }).catch(function (err) {
        res.status(500).json({error: err});
    });
});

export default sucursal;

