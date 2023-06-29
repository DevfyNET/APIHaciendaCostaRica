import { Router, Request, Response } from 'express';
import Cabys from '../classes/cabys';
import Autentidicacion from '../middlewares/autentificacion';

const _c = new Cabys();

const cabys = Router();
const _a = new Autentidicacion();

cabys.get('/cabys/usuario/:usuario', _a.AutentidicacionMiddleware, async (req: Request, res: Response) => {

    let usuario = req.params.usuario;

    _c.getCabysUsuario(usuario).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});
export default cabys;
