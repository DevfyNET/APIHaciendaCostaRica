import nodemailer from 'nodemailer';
import mssql from 'mssql';
import { db } from '../global/environment';

import fse from 'fs-extra';

import Documentos from '../lib/documentos';

export class FE {

    public filePath = `${process.cwd()}/xml/`;

    public doc = new Documentos();

    public async cargarXmlDirectorio() {
        try {

            const files = fse.readdirSync(this.filePath);

            files.forEach(async element => {
                let xml = this.filePath + element;

                let pool = await mssql.connect(db);
                    await pool.request()
                            .input('ruta', mssql.VarChar(mssql.MAX), xml)
                                .execute('sp_insert_documentos');
            });

            return { mjs: '¡XML Leidos!' };
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err}`);
        }
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
