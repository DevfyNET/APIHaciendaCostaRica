import mssql from 'mssql';
import { db } from '../global/environment';

export class ActividadesComerciales {

    public async getActividadesEconomicas(usuario:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('usuario', mssql.Char(15), usuario)
                        .execute('sp_actividades_economicas_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async actividadesEconomicasInsert(dato:any, usuario:any)
    {
        try {
            let tipo = (dato.tipo == 'P') ? 1 : 2;
            let estado = (dato.estado == 'A') ? 1 : 2;

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('usuario', mssql.VarChar(15), usuario)
                    .input('actividad_economica', mssql.Char(6), dato.codigo)
                    .input('descripcion', mssql.VarChar(255), dato.descripcion)
                    .input('tipo_actividad', mssql.TinyInt, tipo)
                    .input('estado', mssql.TinyInt, estado)
                        .execute('sp_actividades_economicas_insert');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async actividadesEconomicasDelete(usuario:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('usuario', mssql.Char(15), usuario)
                        .execute('sp_actividades_economicas_delete');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default ActividadesComerciales;
