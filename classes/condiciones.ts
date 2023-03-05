import mssql from 'mssql';
import { db } from '../global/environment';

export class Condiciones {

    public async getCondicionVenta(codigo:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('codigo', mssql.Char(2), (codigo == 0) ? null : codigo)
                        .execute('sp_condicionesVentas_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getCondicionImpuesto(codigo:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('codigo', mssql.Char(2), (codigo == 0) ? null : codigo)
                        .execute('sp_condicionImp_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default Condiciones;
