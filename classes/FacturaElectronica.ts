import mssql from 'mssql';
import { db } from '../global/environment';

export class FacturaElectronica {

    public async listarDocumentosFe(cedula:any, estado:number)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('cedula', mssql.VarChar, cedula)
                    .input('estado', mssql.TinyInt, estado)
                        .execute('sp_documentos_listado_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async updateEmisorEncabezado(dato:any) {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                        .input('id', mssql.Int, dato.id)
                        .input('clave', mssql.VarChar(50), dato.Clave)
                        .input('codigo_actividad', mssql.VarChar(20), dato.CodigoActividad)
                        .input('numero_consecutivo', mssql.VarChar(30), dato.NumeroConsecutivo)
                        .input('fecha_emision', mssql.VarChar(30), dato.FechaEmision)
                        .input('condicion_venta', mssql.VarChar(2), dato.CondicionVenta)
                        .input('plazo_credito', mssql.VarChar(4), dato.PlazoCredito)
                        .input('medio_pago', mssql.VarChar(2), dato.MedioPago)
                        .input('codigo_tipo_moneda', mssql.VarChar(4), dato.CodigoMoneda)
                        .input('tipo_cambio', mssql.Decimal(12, 2), dato.TipoCambio)
                        .input('cedula', mssql.VarChar(15), dato.Numero)
                    .execute('sp_fe_emisor_encabezado_update');
                    
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async updateReceptor(dato:any) {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('id', mssql.VarChar, dato.id)
                .input('tipoDni', mssql.VarChar, dato.Tipo)
                .input('dni', mssql.VarChar, dato.Numero)
                .input('nombre', mssql.VarChar, dato.Nombre)
                .input('nombre_comercial', mssql.VarChar, dato.NombreComercial)
                .input('provincia', mssql.VarChar, dato.Provincia)
                .input('canton', mssql.VarChar, dato.Canton)
                .input('distrito', mssql.VarChar, dato.Distrito)
                .input('barrio', mssql.VarChar, dato.Barrio)
                .input('otrasSenas', mssql.VarChar, dato.OtrasSenas)
                .input('codigoPais', mssql.VarChar, dato.CodigoPais)
                .input('numTelefono', mssql.VarChar, dato.NumTelefono)
                .input('email', mssql.VarChar, dato.CorreoElectronico)
                .execute('sp_fe_receptor_update');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async updateDetalle(dato:any) {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('id', mssql.Int, dato.id)
                .input('linea', mssql.TinyInt, dato.NumeroLinea)
                .input('codigo', mssql.VarChar, dato.Codigo)
                .input('tipo_comercial', mssql.Char, dato.CodigoComercial_Tipo)
                .input('codigo_comercial', mssql.VarChar, dato.CodigoComercial_Codigo)
                .input('cantidad', mssql.Decimal(18, 2), dato.Cantidad)
                .input('unidad_medida', mssql.VarChar, dato.UnidadMedida)
                .input('detalle', mssql.VarChar, dato.Detalle)
                .input('precio_unitario', mssql.Decimal(18, 2), dato.PrecioUnitario)
                .input('monto_total', mssql.Decimal(18, 2), dato.MontoTotal)
                .input('subtotal', mssql.Decimal(18, 2), dato.SubTotal)
                .input('Codigo_impuesto', mssql.Char, dato.Codigo_impuesto)
                .input('CodigoTarifa_impuesto', mssql.Char, dato.CodigoTarifa_impuesto)
                .input('Tarifa_impuesto', mssql.TinyInt, dato.Tarifa_impuesto)
                .input('Monto_impuesto', mssql.Decimal(18, 2), dato.Monto_impuesto)
                .input('monto_total_linea', mssql.Decimal(18, 2), dato.MontoTotalLinea)
                .execute('sp_fe_detalle_update');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getResumenFactura(factura:number)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('id', mssql.Int, factura)
                        .execute('sp_fe_resumen');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async listarDetalleFe(factura:number)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('id', mssql.Int, factura)
                        .execute('sp_buscar_nodo_detalle');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }


    public async crearJSONXml(id_factura:number)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('id_factura', mssql.Int, id_factura)
                        .execute('sp_fe_documento_json');
                        
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async crearJSONPDF(id_factura:number)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('id_factura', mssql.Int, id_factura)
                        .execute('sp_fe_documento_json_pdf');
                        
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}

export default FacturaElectronica;
