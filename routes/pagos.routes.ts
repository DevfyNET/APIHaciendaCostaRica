import { Router, Request, Response } from 'express';
import Pagos from '../classes/pagos';

const _p = new Pagos();

const pagos = Router();

pagos.get('/pago/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _p.getPago(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default pagos;
