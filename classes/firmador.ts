import Firmador from '../lib/firmador';

export class FirmadorHacienda {

    public _f = new Firmador();

    /**
     * @var filePath
     * @description Es la carpeta por defecto donde se van a guardar los xml generados
     * @return filePath
     */
    public filePath = `${process.cwd()}\\static\\503890553\\xml`;

    public async verificarP12(datos:any)
    {
        return await this._f.verificarP12(datos.llavecriptografica, datos.pin);
    }

    public async firmarFE(datos:any)
    {
        return await this._f.firmarXML(datos.xml, datos.llavecriptografica, datos.pin);
    }
}

export default FirmadorHacienda;
