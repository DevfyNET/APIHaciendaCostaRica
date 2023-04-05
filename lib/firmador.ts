import fse from 'fs-extra';

const Signer = require('haciendacostarica-signer');

export class Firmador {

    public async firmarXML(xmlpath: any, p12: any, contrasena: string) {
        try {
            //Enviar a .sign el XML en string, la llave criptografica (.p12) en BASE64, y el pass en string.
            //Se retornara el XML ya firmado en BASE64.
            const xmlString = fse.readFileSync(xmlpath, { encoding: 'utf8'});
            const Llave64 = fse.readFileSync(p12, {encoding: 'base64'});
    
            const xml = await Signer.sign(xmlString, Llave64, contrasena);

            const plain = Buffer.from(xml, 'base64').toString('utf8')   
            fse.writeFileSync('nc_334.xml', plain);

            return xml;

        } catch (err) {
            return err;
        }
    }

    public async verificarP12(p12:any, Pass:string)
    {
        try {
            const Llave64 = fse.readFileSync(p12, {encoding: 'base64'});
            //Tambien está el function verifySignature el cuál verifica que la llave criptografica y el pass de la misma sean correctas, además nos retornara cuando expira la misma.
            //Si es correcto retorna true, caso contrario el error.
            //Ej de uso: antes de guardar los datos del contribuyente y usar el Sign se puede verificar con antelación la llave. Si es true se guarda.
            const verify = await Signer.verifySignature(Llave64, Pass);
            //la function verify nos retorna lo siguiente si es correcta y no ha expirado:

            return verify;

        } catch (err) {
            return err;
        }
    }
}
export default Firmador;

