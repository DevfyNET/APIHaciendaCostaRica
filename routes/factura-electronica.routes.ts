import { Router, Request, Response } from 'express';
import FacturaElectronica from '../classes/FacturaElectronica';
import { FirmadorHacienda } from '../classes/firmador';
import Autentidicacion from '../middlewares/autentificacion';
import { FE } from '../classes/fe';
import { URL, HEADERS } from '../global/environment';
import axios from 'axios';
import { log } from 'console';

const factura_electronica = Router();
const _factura_electronica = new FacturaElectronica();
const _fe = new FE();
const _a = new Autentidicacion();
const _f = new FirmadorHacienda();

// Obtener lista de documentos de factura por cédula y estado
factura_electronica.get('/factura/documentos/listar/:cedula/:estado', _a.AutentidicacionMiddleware, async (req: Request, res: Response) => {
    const estado = parseInt(req.params.estado);
    try {
        const result = await _factura_electronica.listarDocumentosFe(req.params.cedula, estado);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Actualizar emisor encabezado de factura
factura_electronica.put('/factura/emisor-encabezado/update', async (req: Request, res: Response) => {
    try {
        const datos = { ...req.body };
        await _factura_electronica.updateEmisorEncabezado(datos);
        res.json({ message: '¡La información ha sido actualizada con éxito!' });
    } catch (error) {
        const errorMessage = `_E_ ${error instanceof Error ? error.toString() : 'Unknown error'}`;
        res.status(500).json(errorMessage);
    }
});

// Actualizar receptor de factura
factura_electronica.put('/factura/receptor/update', _a.AutentidicacionMiddleware, async (req: Request, res: Response) => {
    try {
        const datos = { ...req.body };
        await _factura_electronica.updateReceptor(datos);
        res.json({ message: '¡La información ha sido actualizada con éxito!' });
    } catch (error) {
        const errorMessage = `_E_ ${error instanceof Error ? error.toString() : 'Unknown error'}`;
        res.status(500).json(errorMessage);
    }
});

// Actualizar detalle de factura
factura_electronica.put('/factura/detalle/update', _a.AutentidicacionMiddleware, async (req: Request, res: Response) => {
    try {
        const datos = { ...req.body };
        await _factura_electronica.updateDetalle(datos);
        res.json({ message: '¡La información ha sido actualizada con éxito!' });
    } catch (error) {
        const errorMessage = `_E_ ${error instanceof Error ? error.toString() : 'Unknown error'}`;
        res.status(500).json(errorMessage);
    }
});

// Obtener detalle de factura por número de factura
factura_electronica.get('/factura/detalle/:factura', async (req: Request, res: Response) => {
    const factura = parseInt(req.params.factura);
    try {
        const result = await _factura_electronica.listarDetalleFe(factura);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Obtener resumen de factura por número de factura
factura_electronica.get('/factura/resumen/:factura', async (req: Request, res: Response) => {
    const factura = parseInt(req.params.factura);
    try {
        const result = await _factura_electronica.getResumenFactura(factura);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Crear factura
factura_electronica.post('/factura/crear', async (req: Request, res: Response) => {
    try {
        const datos_factura = { ...req.body };
        const JSON_XML = await _factura_electronica.crearJSONXml(datos_factura.id);
        const JSON_PDF = await _factura_electronica.crearJSONPDF(datos_factura.id);
        const json_xml_parse = JSON.parse(JSON_XML[0].json_fe);
        const json_pdf_parse = JSON.parse(JSON_XML[0].json_fe);
        const resp = await _fe.crearXMLFE(json_xml_parse);

        const datos = {
            xml: `C:\\Dev\\Express\\bluespirit\\static\\${datos_factura.emisorCedula}\\xml\\FE_${datos_factura.clave}.xml`,
            llavecriptografica: datos_factura.certificado,
            pin: datos_factura.pin.toString(),
        };

        const factura_firmada = await _f.firmarFE(datos);

        const datos_envio_hacienda = {
            clave: datos_factura.clave,
            fecha: datos_factura.fecha,
            emisor: {
                tipoIdentificacion: datos_factura.emisorTipoCedula,
                numeroIdentificacion: datos_factura.emisorCedula,
            },
            receptor: {
                tipoIdentificacion: datos_factura.receptorTipoCedula,
                numeroIdentificacion: datos_factura.receptorCedula,
            },
            comprobanteXml: factura_firmada
        };

        const { token, clave } = datos_factura;
        const jsondata = JSON.stringify(datos_envio_hacienda);
        console.log(jsondata);
        
        await axios.post(URL.API, jsondata, {
            headers: {
                'Content-Type': HEADERS.ContentTypeAPI,
                Authorization: 'bearer ' + token,
            }
        });
        const mensajeHacienda = await axios.get(URL.API + clave, {
            headers: { Authorization: 'bearer ' + token },
        });

        console.log(mensajeHacienda.data);
        res.status(200).json(mensajeHacienda.data);

        try {
            const result = await _fe.GenerarPDFFE(json_pdf_parse)
                .then(() => {
                    console.log('La conversión a PDF se completó con éxito.');
                })
                .catch((error: any) => {
                    console.error('Ocurrió un error durante la conversión a PDF:', error);
                });
                res.json(result);
        } catch (err) {
            res.status(500).json(err);
        }

    } catch (error) {
        const errorMessage = `_E_ ${error instanceof Error ? error.toString() : 'Unknown error'}`;
        res.status(500).json(errorMessage);
    }
});


// Obtener resumen de factura por número de factura
factura_electronica.post('/factura/pdf', async (req: Request, res: Response) => {
    const datos_factura = { ...req.body };
    try {
        const result = await _fe.GenerarPDFFE(datos_factura)
        .then(() => {
            console.log('La conversión de HTML a PDF se completó con éxito.');
        })
        .catch((error: any) => {
            console.error('Ocurrió un error durante la conversión de HTML a PDF:', error);
        });
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default factura_electronica;
