import { Router, Request, Response } from 'express';
import FE from '../classes/fe';

const factura_electronica = new FE();

const fe = Router();

fe.get('/', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});

export default fe;
