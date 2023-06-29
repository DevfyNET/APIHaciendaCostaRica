import mssql from 'mssql';
import { db } from '../global/environment';

export class Cabys {

    public async getCabysUsuario(usuario:any)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('usuario', mssql.Char(15), usuario)
                        .execute('sp_usuario_cabys');
            return result.recordset;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default Cabys;
