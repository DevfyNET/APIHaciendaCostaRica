import { Router, Request, Response } from 'express';
import Exoneracion from '../classes/exoneracion';

const _e = new Exoneracion();

const exoneracion = Router();

exoneracion.get('/exoneracion/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _e.getExoneracion(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default exoneracion;
