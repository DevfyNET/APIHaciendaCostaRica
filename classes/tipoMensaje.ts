import mssql from 'mssql';
import { db } from '../global/environment';

export class TipoMensaje {

    public async getTipoMensaje(id:any)
    {
        try {

            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('id', mssql.Char(2), (id == 0) ? null : id)
                        .execute('sp_tipoMensaje_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default TipoMensaje;
