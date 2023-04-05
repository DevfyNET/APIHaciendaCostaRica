
import mssql from 'mssql';
import { db } from '../global/environment';

export class Monedas {

    public async getMonedas()
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                        .execute('sp_monedas_select_all');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default Monedas;
