import nodemailer from 'nodemailer';
import mssql from 'mssql';
import { db } from '../global/environment';

import fse from 'fs-extra';

import Documentos from '../lib/documentos';
import PDF from '../lib/pdf';

import General from '../classes/general';

import * as xml2js from 'xml2js';

export class FE {

    public filePath = `${process.cwd()}/static/503890553/xml2/`;

    public doc = new Documentos();
    public general = new General();
    public pdf = new PDF();
    
    public options = {
        ignoreAttributes : false,
        allowBooleanAttributes: true,
        suppressBooleanAttributes: true,
        format: true
    }

    public async cargarXmlDirectorio() {
        try {
            // Lee los archivos que estan en el directorio
            const files = fse.readdirSync(this.filePath);

            files.forEach(async element => {
                // Obtiene la ruta por cada archivo
                let xmlPath = this.filePath + element;

                // Lee el contenido de cada archivo
                let xmlString = fse.readFileSync(xmlPath, 'utf8');

                // Crea un objeto para el XML leido
                let xmlObject: any;
    
                xml2js.parseString(xmlString, (err: any, result: any) => {
                    if (err) {
                        throw err;
                    }
                    xmlObject = result;
                });

                // Modifica el encoding del XML
                const builder = new xml2js.Builder({xmldec: {version: '1.0', encoding: 'utf-8'}});
                const updatedXmlString = builder.buildObject(xmlObject);

                // Reemplaza el XML con otro que contiene el nuevo encoding
                fse.writeFileSync(xmlPath, updatedXmlString, 'utf8');

                // Guarda el XML en la base de datos
                let pool = await mssql.connect(db);
                    await pool.request()
                            .input('ruta', mssql.VarChar(mssql.MAX), xmlPath)
                                .execute('sp_insert_documentos');
            });
            return { mjs: '¡XML Leidos!' };
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err}`);

        }
    }

    public codigoSeguridad()
    {
        return this.general.codigoSeguridad();
    }

    public GenerarPDFFE(JSON:any)
    {
        return this.pdf.GenerarPDFFE(JSON);
    }

    public claveFE(datos:any)
    {
        return this.general.clave(datos);
    }

    public async consecutivoFE(datos:any)
    { 

        let consecutivo = await this.general.consecutivo(datos);
        return consecutivo;
    }

    public async crearXMLFE( datos:any)
    {
        return  this.doc.crearXMLFacturaElectronica(datos);
    }

    public async crearXMLFEC( datos:any)
    {
        return  this.doc.crearXMLFacturaElectronicaCompra(datos);
    }

    public async crearXMLFEE( datos:any)
    {
        return  this.doc.crearXMLFacturaElectronicaExportacion(datos);
    }

    public async crearXMLTE( datos:any)
    {
        return  this.doc.crearXMLTiqueteElectronico(datos);
    }

    public async crearXMLNC( datos:any)
    {
        return  this.doc.crearXMLNotaCreditoElectronica(datos);
    }

    public async crearXMLND( datos:any)
    {
        return  this.doc.crearXMLNotaDebitoElectronica(datos);
    }

    public async crearXMLMH( datos:any)
    {
        return  this.doc.crearXMLMensajeHacienda(datos);
    }
}
export default FE;
