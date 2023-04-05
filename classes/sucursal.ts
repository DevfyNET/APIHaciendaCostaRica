import mssql from 'mssql';
import { db } from '../global/environment';

export class Sucursal {

    public async insertUsuarioCaja(dato:any)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('usuario', mssql.VarChar, dato.usuario)
                .input('nombre_sucursal', mssql.VarChar, dato.nombre_sucursal)
                .input('numero_sucursal', mssql.TinyInt, dato.sucursal)
                .input('numero_caja', mssql.TinyInt, dato.caja)
                .input('cabys', mssql.VarChar, dato.cabys)
                        .execute('sp_usuarioCaja_insert');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getUsuarioCaja(dato:any)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('id', mssql.Int, (dato.id == 0) ? null : dato.id)
                .input('usuario', mssql.Char, (dato.usuario == 0) ? null : dato.usuario)
                        .execute('sp_usuarioCaja_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async updateUsuarioCajaEstado(dato:any)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('id', mssql.Int, dato.id)
                .input('usuario', mssql.VarChar, dato.usuario)
                .input('estado', mssql.TinyInt, dato.estado)
                        .execute('sp_usuarioCaja_update');
            return result.recordset;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default Sucursal;
