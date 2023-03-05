import { Router, Request, Response } from 'express';
import UnidadMedida from '../classes/unidadMedida';

const _um = new UnidadMedida();

const unidad_medida = Router();

unidad_medida.get('/unidad-medida/:id', async (req: Request, res: Response) => {

    let id = req.params.id;

    _um.getUnidadMedida(id).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default unidad_medida;
