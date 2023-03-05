import { Router, Request, Response } from 'express';
import TipoMensaje from '../classes/tipoMensaje';

const _tm = new TipoMensaje();

const tipo_mensaje = Router();

tipo_mensaje.get('/pago/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _tm.getTipoMensaje(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default tipo_mensaje;
