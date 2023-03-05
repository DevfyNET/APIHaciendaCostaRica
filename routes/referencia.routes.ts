import { Router, Request, Response } from 'express';
import Referencia from '../classes/referencia';

const _r = new Referencia();

const referencia = Router();

referencia.get('/referencia/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _r.getReferecia(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default referencia;
