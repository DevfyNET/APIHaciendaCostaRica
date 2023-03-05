import { Router, Request, Response } from 'express';
import Condiciones from '../classes/condiciones';

const _c = new Condiciones();

const condiciones = Router();

condiciones.get('/condicion/venta/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _c.getCondicionVenta(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

condiciones.get('/condicion/impuesto/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _c.getCondicionImpuesto(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});
export default condiciones;
