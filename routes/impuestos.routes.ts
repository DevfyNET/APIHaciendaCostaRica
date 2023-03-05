import { Router, Request, Response } from 'express';
import Impuestos from '../classes/impuestos';

const _i = new Impuestos();

const impuestos = Router();

impuestos.get('/impuestos/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _i.getImpuestos(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

impuestos.get('/impuestos/tarifa/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _i.getTarifaImpuestos(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default impuestos;
