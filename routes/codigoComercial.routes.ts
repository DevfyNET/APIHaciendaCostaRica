import { Router, Request, Response } from 'express';
import CodigoComercial from '../classes/codigoComercial';
import Autentidicacion from '../middlewares/autentificacion';

const _c = new CodigoComercial();

const codigoComercial = Router();
const _a = new Autentidicacion();

codigoComercial.get('/codigo-comercial/:codigo', _a.AutentidicacionMiddleware, async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _c.getCodigoComercial(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});
export default codigoComercial;
