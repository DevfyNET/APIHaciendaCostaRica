import fse from 'fs-extra';
const Signer = require('haciendacostarica-signer');

export class Firmador {

    public async firmarXML(xmlpath: any, p12: any, contrasena: string) {
        try {
            // Leer el contenido del archivo XML como una cadena de texto
            const xmlString = fse.readFileSync(xmlpath, { encoding: 'utf8' });
    
            // Leer el contenido del archivo de clave criptográfica en formato P12 y convertirlo a base64
            const Llave64 = fse.readFileSync(p12, { encoding: 'base64' });
    
            // Firmar el XML utilizando la función 'sign' del módulo 'Signer'
            const xml = await Signer.sign(xmlString, Llave64, contrasena.toString())
                .then((response: any) => {
                    return response;
                })
                .catch((err: any) => {
                    console.log(err);
                });
    
            // Convertir el XML firmado de base64 a texto sin formato
            const plain = Buffer.from(xml, 'base64').toString('utf8');
    
            // Sobrescribir el archivo XML original con el contenido firmado
            fse.writeFileSync(xmlpath, plain);
    
            // Retornar el XML firmado en formato base64
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

