import mssql from 'mssql';
import { db } from '../global/environment';

export class DocumentoReferencia {

    public async getTipoDocumentosReferencia(codigo:any)
    {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                    .input('codigo', mssql.Char(2), (codigo == 0) ? null : codigo)
                        .execute('sp_tipoDocReferencia_select');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default DocumentoReferencia;
