import moment from 'moment';
import mssql from 'mssql';
import { db } from '../global/environment';

export class General {

    public fecha = new Date();

    public isNumber(val: string | number) : boolean {
        return !isNaN(Number(val));
    }

    public codigoSeguridad() {
        let min = 0,
            max = 99999999;
        return Math.floor((Math.random() * (Math.floor((Math.random() * (max - min))))))
            .toString()
            .padStart(8, '0');
    }

    public clave(datos: any) {

        let fecha = moment().format('DDMMYY'),
            dni = datos.identificacion.padStart(12, '0'),
            consecutivo = datos.consecutivo,
            situacion = datos.situacion;
    
        let claveFE = datos.pais + fecha + dni + consecutivo + situacion + this.codigoSeguridad();
        return claveFE;
    }

    public async consecutivo(datos:any)
    {
        try {
            let sucursal        = datos.sucursal.padStart(3, '0'),
                punto_venta     = datos.punto_venta.padStart(5, '0'),
                tipo_documento  = datos.tipo_documento.padStart(2, '0'),
                consecutivo     = await this.facturaActual(datos.usuario, tipo_documento).then(result => {
                let comprobante = result;
                return sucursal + punto_venta + tipo_documento + comprobante;
            });

            return consecutivo;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async facturaActual(usuario:string, documento:string)
    {
        let pool =  await mssql.connect(db);
        let result =  await pool.request()
            .input('usuario', mssql.VarChar(15), usuario)
            .input('doc_ref', mssql.VarChar(2), documento)
            .execute('sp_numero_consecutivo_actual_select');
    
        let comprobante = '';
        for (const iterator of result.recordset) {
            comprobante += iterator.consecutivo_factura;
        }
        
        return comprobante.padStart(10, '0');
    }

}
export default General;
