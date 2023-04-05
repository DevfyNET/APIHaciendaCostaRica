import { Router, Request, Response } from 'express';
import FE from '../classes/fe';

const _fe = new FE();

const fe = Router();

fe.get('/factura/codigo-seguridad', (req: Request, res: Response) => {
    let codigo = _fe.codigoSeguridad();
    return res.status(200).json({ codigoSeguridad: codigo });
});

fe.post('/factura/clave', (req: Request, res: Response) => {

    let datos = { ...req.body };
    let clave = _fe.claveFE(datos);
    return res.status(200).json({ clave: clave });
});

fe.get('/factura/numero-consecutivo/:sucursal/:punto_venta/:tipo_documento/:usuario', (req: Request, res: Response) => {

    
    let dato = req.params;

    console.log(dato);
    
    _fe.consecutivoFE(dato).then(result => {
        return res.status(200).json({ consecutivo: result });
    }).catch(function (err) {
        return res.status(500).json(err);
    });
});

export default fe;
