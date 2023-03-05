import { Router, Request, Response } from 'express';
import DocumentoReferencia from '../classes/documentoReferencia';

const _dr = new DocumentoReferencia();

const documento_referencia = Router();

documento_referencia.get('/documento-referencia/:codigo', async (req: Request, res: Response) => {

    let codigo = req.params.codigo;

    _dr.getTipoDocumentosReferencia(codigo).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default documento_referencia;
