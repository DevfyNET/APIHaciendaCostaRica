import { Router, Request, Response } from 'express';
import Ubicaciones from '../classes/ubicaciones';

const _u = new Ubicaciones();

const ubicaciones = Router();

ubicaciones.get('/ubicacion/provincia/:provincia', async (req: Request, res: Response) => {

    let provincia = req.params.provincia;

    _u.getProvincia(provincia).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

ubicaciones.get('/ubicacion/canton/:provincia/:canton', async (req: Request, res: Response) => {

    let provincia = req.params.provincia;
    let canton = req.params.canton;

    _u.getCanton(provincia, canton).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

ubicaciones.get('/ubicacion/distrito/:provincia/:canton/:distrito', async (req: Request, res: Response) => {

    let provincia = req.params.provincia;
    let canton = req.params.canton;
    let distrito = req.params.distrito;

    _u.getDistrito(provincia, canton, distrito).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

ubicaciones.get('/ubicacion/barrio/:provincia/:canton/:distrito/:barrio', async (req: Request, res: Response) => {

    let provincia = req.params.provincia;
    let canton = req.params.canton;
    let distrito = req.params.distrito;
    let barrio = req.params.barrio;

    _u.getBarrio(provincia, canton, distrito, barrio).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

export default ubicaciones;
