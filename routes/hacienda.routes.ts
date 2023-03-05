import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { URL, HEADERS } from '../global/environment';

import { General } from '../classes/general';
import { FE } from '../classes/fe';

// Ruta
const hacienda = Router();

// Clases
const _general = new General();
const _fe = new FE();

/**
 * Cargar los xml del directorio
 */
hacienda.get('/hacienda/directorio/xml', async (req: Request, res:Response)=> {
    return _fe.cargarXmlDirectorio();
});

/**
 * Genera Consecutivo Factura Electrónica
 * Ministerio de Hacienda
 */
hacienda.get('hacienda/consecutivo/');

/**
 * Genera XML Factura Electrónica
 * Ministerio de Hacienda
 */
hacienda.post('/hacienda/fe/xml',  async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _fe.crearXMLFE(datos).then((response) => {
        console.log(response);
    });
    return res.status(200).json({ mjs: "XML Creado"});
});

/**
 * Genera XML Factura Electrónica Compras
 * Ministerio de Hacienda
 */
hacienda.post('/hacienda/fec/xml',  async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _fe.crearXMLFEC(datos).then((response) => {
        console.log(response);
    });
    return res.status(200).json({ mjs: "XML Creado"});
});

/**
 * Genera XML Factura Electrónica Exportación
 * Ministerio de Hacienda
 */
hacienda.post('/hacienda/fee/xml',  async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _fe.crearXMLFEE(datos).then((response) => {
        console.log(response);
    });
    return res.status(200).json({ mjs: "XML Creado"});
});

/**
 * Genera XML Tiquete Electrónico
 * Ministerio de Hacienda
 */
hacienda.post('/hacienda/te/xml',  async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _fe.crearXMLTE(datos).then((response) => {
        console.log(response);
    });
    return res.status(200).json({ mjs: "XML Creado"});
});

/**
 * Genera XML Nota de Crédito Electrónica
 * Ministerio de Hacienda
 */
hacienda.post('/hacienda/nc/xml',  async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _fe.crearXMLNC(datos).then((response) => {
        console.log(response);
    });
    return res.status(200).json({ mjs: "XML Creado"});
});

/**
 * Genera XML Nota de Débito Electrónica
 * Ministerio de Hacienda
 */
hacienda.post('/hacienda/nd/xml',  async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _fe.crearXMLND(datos).then((response) => {
        console.log(response);
    });
    return res.status(200).json({ mjs: "XML Creado"});
});

/**
 * Genera XML Mensaje Hacienda
 * Ministerio de Hacienda
 */
hacienda.post('/hacienda/mh/xml',  async (req: Request, res: Response) => {

    let datos = { ...req.body };

    _fe.crearXMLMH(datos).then((response) => {
        console.log(response);
    });
    return res.status(200).json({ mjs: "XML Creado"});
});

/**
 * Estado Api Ministerio de Hacienda
 */
hacienda.get('/hacienda/status', async (req: Request, res: Response) => {

    const response = await fetch('https://apis.gometa.org/status/status.json');
    const data = await response.json();

    return res.status(200).json(data);
});

/**
 * Tipo de Cambio Dolar/Euro Ministerio de Hacienda
 */
hacienda.get('/hacienda/tipo-cambio', async (req: Request, res: Response) => {

    const response = await fetch('https://api.hacienda.go.cr/indicadores/tc');
    const data = await response.json();

    return res.status(200).json(data);
});

/**
 * Información Receptor Ministerio de Hacienda
 */
hacienda.get('/hacienda/info-receptor/:identificacion', async (req: Request, res: Response, next) => {

    let identificacion = req.params.identificacion;

    const response = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${identificacion}`);
    const data = await response.json();

    return res.status(200).json(data);
});

/**
 * Catálogo de bienes y servicios para uso tributario y de Cuentas Nacionales Ministerio de Hacienda
 * Se consulta por descripción o por código del catálogo
 */
hacienda.get('/hacienda/cabys/:dato', async (req: Request, res: Response) => {

    let dato = req.params.dato;
    let tipo = _general.isNumber(dato);

    const response = await fetch(`https://api.hacienda.go.cr/fe/cabys?${( tipo === true ) ? 'codigo' : 'q'}=${dato}`);
    const data = await response.json();
    return res.status(200).json(data);
});

/**
 * Token Ministerio de Hacienda
 */
hacienda.post('/hacienda/token', async (req:Request, res:Response) => {

    let datos = { ...req.body };

    const body = {
        "client_id": datos.client_id,
        "grant_type": 'password',
        "username": datos.username,
        "password": datos.password
    };

    const response:any = await fetch(URL.TOKEN, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': HEADERS.ContentTypeIDP }
    });

    const data:any = await response.json();

    return res.status(200).json(data);
});

/**
 * Refrescar Token Ministerio de Hacienda
 * Cierra sesión
 */
hacienda.post('/hacienda/token/refrescar', async (req:Request, res:Response) => {

    let datos = { ...req.body };

    const body = {
        "client_id": datos.client_id,
        "grant_type": 'refresh_token',
        "refresh_token": datos.refresh_token
    };

    const response:any = await fetch(URL.TOKEN_DESTROY, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': HEADERS.ContentTypeIDP }
    });
    const data:any = await response.json();
    return res.status(200).json(data);
});

/**
 * Destruye Token Ministerio de Hacienda
 * Cierra sesión
 */
hacienda.post('/hacienda/token/eliminar', async (req:Request, res:Response) => {

    let datos = { ...req.body };

    const body = {
        "client_id": datos.client_id,
        "refresh_token": datos.refresh_token
    };

    const response:any = await fetch(URL.TOKEN_DESTROY, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': HEADERS.ContentTypeIDP }
    });
    const data:any = await response.json();
    return res.status(200).json(data);
});

export default hacienda;
