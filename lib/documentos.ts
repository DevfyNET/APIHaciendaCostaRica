import { XMLBuilder } from 'fast-xml-parser';
import fse from 'fs-extra';

export class Documentos {

    /**
     * @var filePath
     * @description Es la carpeta por defecto donde se van a guardar los xml generados
     * @return filePath
     */
    public filePath = `${process.cwd()}/xml/`;

    /**
     * @var options
     * @description Valores por defecto para generar el xml
     * @returns options
     */
    public options = {
        ignoreAttributes : false,
        allowBooleanAttributes: true,
        suppressBooleanAttributes: true,
        format: true
    }

    /**
     * Crear XML Factura Electrónica
     * @param JSONFE
     * @description JSON con la información de la factura electrónica
     * @returns xml
     */
    public async crearXMLFacturaElectronica(JSONFE:any)
    {
        try {

            const builder = new XMLBuilder(this.options);
            let facturaElectronica = '';
                facturaElectronica += '<?xml version="1.0" encoding="utf-8"?>';
                facturaElectronica += '\n';
                facturaElectronica += '<FacturaElectronica xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica.xsd">'
                facturaElectronica += '\n';
                facturaElectronica += builder.build(JSONFE);
                facturaElectronica += '</FacturaElectronica>';
                fse.writeFileSync(`${this.filePath}FE_${JSONFE.Clave}.xml`,  facturaElectronica);

            return facturaElectronica;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err}`);
        }
    }

    /**
     * Crear XML Tiquete Electrónico
     * @param JSONFE
     * @description JSON con la información del tiquete electrónico
     * @returns xml
     */
    public async crearXMLTiqueteElectronico(JSONTE:any)
    {
        try {
            const builder = new XMLBuilder(this.options);
            let tiqueteElectronico = '';
                tiqueteElectronico += '<?xml version="1.0" encoding="utf-8"?>';
                tiqueteElectronico += '\n';
                tiqueteElectronico += '<TiqueteElectronico xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/tiqueteElectronico" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/tiqueteElectronico https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/tiqueteElectronico.xsd">'
                tiqueteElectronico += '\n';
                tiqueteElectronico += builder.build(JSONTE);
                tiqueteElectronico += '</TiqueteElectronico>';

            fse.writeFileSync(`${this.filePath}TE_${JSONTE.Clave}.xml`,  tiqueteElectronico);

            return tiqueteElectronico;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err}`);
        }
    }

    /**
     * Crear XML Nota de Crédito Electrónica
     * @description JSON con la información de la nota de crédito electrónica
     * @returns xml
     */
    public async crearXMLNotaCreditoElectronica(JSONNC:any)
    {
        try {
            const builder = new XMLBuilder(this.options);
            let notaCredito = '';
                notaCredito += '<?xml version="1.0" encoding="utf-8"?>';
                notaCredito += '\n';
                notaCredito += '<NotaCreditoElectronica xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaCreditoElectronica" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaCreditoElectronica https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaCreditoElectronica.xsd">'
                notaCredito += '\n';
                notaCredito += builder.build(JSONNC);
                notaCredito += '</NotaCreditoElectronica>';

            fse.writeFileSync(`${this.filePath}NC_${JSONNC.Clave}.xml`,  notaCredito);

            return notaCredito;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err}`);
        }
    }

    /**
     * Crear XML Nota de Débito Electrónica
     * @description JSON con la información de la nota de débito electrónica
     * @returns xml
     */
    public async crearXMLNotaDebitoElectronica(JSONND:any)
    {
        try {
            const builder = new XMLBuilder(this.options);
            let notaCredito = '';
                notaCredito += '<?xml version="1.0" encoding="utf-8"?>';
                notaCredito += '\n';
                notaCredito += '<NotaDebitoElectronica xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaDebitoElectronica" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaDebitoElectronica https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/notaDebitoElectronica.xsd">'
                notaCredito += '\n';
                notaCredito += builder.build(JSONND);
                notaCredito += '</NotaDebitoElectronica>';

            fse.writeFileSync(`${this.filePath}NC_${JSONND.Clave}.xml`,  notaCredito);

            return notaCredito;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err}`);
        }
    }
}
export default Documentos;
