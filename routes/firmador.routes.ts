import { Router, Request, Response } from 'express';
import FirmadorHacienda from '../classes/firmador';

const _f = new FirmadorHacienda();
const firmador = Router();

firmador.post('/firmador/verificar/llave', async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _f.verificarP12(datos).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

firmador.post('/firmador/firmar/fe', async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _f.firmarFE(datos).then(result => {
        res.status(200).json({ documento: result });
    }).catch(function (err) {
        res.status(500).json(' E- '+err);
    });
});

export default firmador;
