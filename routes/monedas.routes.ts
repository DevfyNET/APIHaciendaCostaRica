import { Router, Request, Response } from 'express';
import Monedas from '../classes/monedas';
import Autentidicacion from '../middlewares/autentificacion';

const _m = new Monedas();
const _a = new Autentidicacion();

const monedas = Router();

monedas.get('/monedas',  _a.AutentidicacionMiddleware, (req: Request, res: Response) => {

    _m.getMonedas().then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default monedas;