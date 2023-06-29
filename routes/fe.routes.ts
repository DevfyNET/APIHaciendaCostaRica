import { Router, Request, Response } from 'express';
import FE from '../classes/fe';

const fe = Router();
const _fe = new FE();

// Generar código de seguridad
fe.get('/factura/codigo-seguridad', (req: Request, res: Response) => {
    const codigo = _fe.codigoSeguridad();
    res.status(200).json({ codigoSeguridad: codigo });
});

// Generar clave de factura electrónica
fe.post('/factura/clave', (req: Request, res: Response) => {
    const datos = { ...req.body };
    const clave = _fe.claveFE(datos);
    res.status(200).json({ clave: clave });
});

// Obtener número consecutivo de factura electrónica
fe.get('/factura/numero-consecutivo/:sucursal/:punto_venta/:tipo_documento/:usuario', async (req: Request, res: Response) => {

    let dato = req.params;
    try {
        const consecutivo = await _fe.consecutivoFE(dato);
        res.status(200).json({ consecutivo: consecutivo });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default fe;
