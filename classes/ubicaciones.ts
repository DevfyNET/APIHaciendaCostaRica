import mssql from 'mssql';
import { db } from '../global/environment';

export class Ubicaciones {

    public async getProvincia(id:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('id', mssql.TinyInt, (id == 0) ? null : id)
                        .execute('sp_provincia_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getCanton(id_Provincia:any, id_Canton:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('idProvincia', mssql.TinyInt, (id_Provincia == 0) ? null : id_Provincia)
                .input('idCanton', mssql.Char(2), (id_Canton == 0) ? null : id_Canton)
                        .execute('sp_canton_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getDistrito(id_Provincia:any, id_Canton:any, id_Distrito:any)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('idProvincia', mssql.TinyInt, (id_Provincia == 0) ? null : id_Provincia)
                .input('idCanton', mssql.Char(2), (id_Canton == 0) ? null : id_Canton)
                .input('idDistrito', mssql.Char(2), (id_Distrito == 0) ? null : id_Distrito)
                        .execute('sp_distrito_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getBarrio(id_Provincia:any, id_Canton:any, id_Distrito:any, id_Barrio:any)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                .input('idProvincia', mssql.TinyInt, (id_Provincia == 0) ? null : id_Provincia)
                .input('idCanton', mssql.Char(2), (id_Canton == 0) ? null : id_Canton)
                .input('idDistrito', mssql.Char(2), (id_Distrito == 0) ? null : id_Distrito)
                .input('idBarrio', mssql.Char(2), (id_Barrio == 0) ? null : id_Barrio)
                        .execute('sp_barrio_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default Ubicaciones;
