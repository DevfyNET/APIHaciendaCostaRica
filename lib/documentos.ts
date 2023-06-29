import { XMLBuilder } from 'fast-xml-parser';
import fse from 'fs-extra';
import xmlFormat from 'xml-formatter';

import json2xml from 'json2xml';
//const json2xml = require('json2xml');

export class Documentos {

    /**
     * @var filePath
     * @description Es la carpeta por defecto donde se van a guardar los xml generados
     * @return filePath
     */
    public filePath = `${process.cwd()}/static/503890553/xml/`;

    /**
     * @var options
     * @description Valores por defecto para generar el xml0
     * @returns options
     */
    public options = {
        ignoreAttributes : false,
        allowBooleanAttributes: true,
        suppressBooleanAttributes: true,
        format: true,
        cdataPositionChar: '\\c'
    }

    /**
     * Crea un XML de Factura Electrónica a partir de un objeto JSON proporcionado.
     * @param JSONFE - Objeto JSON que contiene los datos de la Factura Electrónica.
     * @returns El XML generado de la Factura Electrónica.
     * @throws Error si se produce un error al generar el XML.
     */
    public async crearXMLFacturaElectronica(JSONFE: any): Promise<string> {
        try {
            // Convertir el objeto JSON a XML utilizando la función json2xml
            const xmlData = json2xml(JSONFE);
            
            // Construir el XML completo con las etiquetas y el contenido generado
            const xml = `<?xml version="1.0" encoding="UTF-8"?>
            <FacturaElectronica
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica"
                xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica.xsd">
            ${xmlData}
            </FacturaElectronica>`;
        
            // Formatear el XML con sangrías y eliminar comentarios
            const formattedXml = xmlFormat(xml, {
                indentation: '    ',
                filter: (node: { type: string }) => node.type !== 'Comment',
                collapseContent: true,
                lineSeparator: '\n'
            });
        
            // Escribir el XML en un archivo
            fse.writeFileSync(`${this.filePath}FE_${JSONFE.Clave}.xml`, formattedXml);
        
            // Devolver el XML formateado
            return formattedXml;
        } catch (err: any) {
            throw new Error(`Se presentó un error al generar el XML: ${err}`);
        }
    }

    /**
     * Crear XML Factura Electrónica Compra
     * @param JSONFEE
     * @description JSON con la información de la factura electrónica compra
     * @returns xml
     */
    public async crearXMLFacturaElectronicaCompra(JSONFEC:any)
    {
        try {

            const builder = new XMLBuilder(this.options);
            let facturaElectronicaCompra = '';
                facturaElectronicaCompra += '<?xml version="1.0" encoding="utf-8"?>';
                facturaElectronicaCompra += '\n';
                facturaElectronicaCompra += '<FacturaElectronicaCompra xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronicaCompra" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronicaCompra https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronicaCompra.xsd">';
                facturaElectronicaCompra += '\n';
                facturaElectronicaCompra += builder.build(JSONFEC);
                facturaElectronicaCompra += '</FacturaElectronicaCompra>';

            fse.writeFileSync(`${this.filePath}FEC_${JSONFEC.Clave}.xml`,  facturaElectronicaCompra);

            return facturaElectronicaCompra;

        } catch (err:any) {
            throw new Error(`Se presento un error al generar el xml: ${err}`);
        }
    }

    /**
     * Crear XML Factura Electrónica Exportacion
     * @param JSONFEE
     * @description JSON con la información de la factura electrónica exportación
     * @returns xml
     */
    public async crearXMLFacturaElectronicaExportacion(JSONFEE:any)
    {
        try {

            const builder = new XMLBuilder(this.options);
            let facturaElectronicaExportacion = '';
                facturaElectronicaExportacion += '<?xml version="1.0" encoding="utf-8"?>';
                facturaElectronicaExportacion += '\n';
                facturaElectronicaExportacion += '<FacturaElectronicaExportacion xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronicaExportacion" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronicaExportacion https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronicaExportacion.xsd">';
                facturaElectronicaExportacion += '\n';
                facturaElectronicaExportacion += builder.build(JSONFEE);
                facturaElectronicaExportacion += '</FacturaElectronicaExportacion>';

            fse.writeFileSync(`${this.filePath}FEE_${JSONFEE.Clave}.xml`,  facturaElectronicaExportacion);

            return facturaElectronicaExportacion;

        } catch (err:any) {
            throw new Error(`Se presento un error al generar el xml: ${err}`);
        }
    }

    /**
     * Crear XML Tiquete Electrónico
     * @param JSONFE
     * @description JSON con la información del tiquete electrónico
     * @returns xml
     */
    public async crearXMLTiqueteElectronico(JSONTE:any)
    {
        try {

            const builder = new XMLBuilder(this.options);
            let tiqueteElectronico = '';
                tiqueteElectronico += '<?xml version="1.0" encoding="utf-8"?>';
                tiqueteElectronico += '\n';
                tiqueteElectronico += '<TiqueteElectronico xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/tiqueteElectronico" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/tiqueteElectronico https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/tiqueteElectronico.xsd">';
                tiqueteElectronico += '\n';
                tiqueteElectronico += builder.build(JSONTE);
                tiqueteElectronico += '</TiqueteElectronico>';

            fse.writeFileSync(`${this.filePath}TE_${JSONTE.Clave}.xml`,  tiqueteElectronico);

            return tiqueteElectronico;

        } catch (err:any) {
            throw new Error(`Se presento un error al generar el xml: ${err}`);
        }
    }

    /**
     * Crear XML Nota de Crédito Electrónica
     * @description JSON con la información de la nota de crédito electrónica
     * @returns xml
     */
    public async crearXMLNotaCreditoElectronica(JSONNC:any)
    {
        try {

            const builder = new XMLBuilder(this.options);
            let notaCredito = '';
                notaCredito += '<?xml version="1.0" encoding="utf-8"?>';
                notaCredito += '\n';
                notaCredito += '<NotaCreditoElectronica xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaCreditoElectronica" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaCreditoElectronica https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaCreditoElectronica.xsd">';
                notaCredito += '\n';
                notaCredito += builder.build(JSONNC);
                notaCredito += '</NotaCreditoElectronica>';

            fse.writeFileSync(`${this.filePath}NC_${JSONNC.Clave}.xml`,  notaCredito);

            return notaCredito;

        } catch (err:any) {
            throw new Error(`Se presento un error al generar el xml: ${err}`);
        }
    }

    /**
     * Crear XML Nota de Débito Electrónica
     * @description JSON con la información de la nota de débito electrónica
     * @returns xml
     */
    public async crearXMLNotaDebitoElectronica(JSONND:any)
    {
        try {

            const builder = new XMLBuilder(this.options);
            let notaCredito = '';
                notaCredito += '<?xml version="1.0" encoding="utf-8"?>';
                notaCredito += '\n';
                notaCredito += '<NotaDebitoElectronica xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaDebitoElectronica" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaDebitoElectronica https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaDebitoElectronica.xsd">';
                notaCredito += '\n';
                notaCredito += builder.build(JSONND);
                notaCredito += '</NotaDebitoElectronica>';

            fse.writeFileSync(`${this.filePath}NC_${JSONND.Clave}.xml`,  notaCredito);

            return notaCredito;

        } catch (err:any) {
            throw new Error(`Se presento un error al generar el xml: ${err}`);
        }
    }

    /**
     * Crear XML Mensaje Hacienda
     * @description JSON con la información del mensaje hacienda
     * @returns xml
     */
    public async crearXMLMensajeHacienda(JSONMH:any)
    {
        try {

            const builder = new XMLBuilder(this.options);
            let mensajeHacienda = '';
                mensajeHacienda += '<?xml version="1.0" encoding="utf-8"?>';
                mensajeHacienda += '\n';
                mensajeHacienda += '<MensajeHacienda xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/mensajeHacienda">';
                mensajeHacienda += '\n';
                mensajeHacienda += builder.build(JSONMH);
                mensajeHacienda += '</MensajeHacienda>';

            fse.writeFileSync(`${this.filePath}NC_${JSONMH.Clave}.xml`,  mensajeHacienda);

            return mensajeHacienda;

        } catch (err:any) {
            throw new Error(`Se presento un error al generar el xml: ${err}`);
        }
    }
}
export default Documentos;
