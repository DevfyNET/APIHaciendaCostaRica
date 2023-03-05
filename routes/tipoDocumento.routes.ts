import { Router, Request, Response } from 'express';
import TipoDocumento from '../classes/tipoDocumento';

const _td = new TipoDocumento();

const tipo_documento = Router();

tipo_documento.get('/tipo-documento/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _td.getTipoDocumento(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default tipo_documento;
