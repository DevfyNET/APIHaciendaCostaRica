import { Router, Request, Response } from 'express';
import ActividadesEconomicas from '../classes/actividades-comerciales';
import Autentidicacion from '../middlewares/autentificacion';

const _ac = new ActividadesEconomicas();
const _a = new Autentidicacion();

const actividades_economicas = Router();

actividades_economicas.get('/actividades-economicas/:usuario', async (req: Request, res: Response) => {

    let usuario = req.params.usuario;

    _ac.getActividadesEconomicas(usuario).then(result => {
        res.status(200).json(result);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

actividades_economicas.get('/actividades-economicas/recargar/:usuario',  _a.AutentidicacionMiddleware, async (req: Request, res: Response) => {

    let usuario = req.params.usuario;

    const response = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${usuario}`);
    const data = await response.json();
    
    return _ac.actividadesEconomicasDelete(usuario).then(result => {
        for (let index = 0; index < data.actividades.length; index++) {
            const element = data.actividades[index];

            _ac.actividadesEconomicasInsert(element, usuario).then(result => {
                res.status(200).json(result);
            }).catch(function (err) {
                res.status(500).json('err:'+ err);
            });
        }
    }).catch(function (err) {
        return err;
    });
});
export default actividades_economicas;
