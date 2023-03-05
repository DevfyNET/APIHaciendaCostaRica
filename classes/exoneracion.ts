import mssql from 'mssql';
import { db } from '../global/environment';

export class Exoneracion {

    public async getExoneracion(codigo:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('codigo', mssql.Char(2), (codigo == 0) ? null : codigo)
                        .execute('sp_exoneracion_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default Exoneracion;
