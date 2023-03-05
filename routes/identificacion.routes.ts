import { Router, Request, Response } from 'express';
import Identificacion from '../classes/identificacion';

const _i = new Identificacion();

const identificacion = Router();

identificacion.get('/identificacion/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _i.getIdentificacion(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default identificacion;
