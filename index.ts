import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';

import actividades_economicas from './routes/actividades-economicas.routes';
import cabys from './routes/cabys.routes';
import codigo_comercial from './routes/codigoComercial.routes';
import condiciones from './routes/condiciones.routes';
import documento_referencia from './routes/documentoReferencia.routes';
import exoneracion from './routes/exoneracion.routes';
import factura_electronica from './routes/factura-electronica.routes';
import fe from './routes/fe.routes';
import firmador from './routes/firmador.routes';
import hacienda from './routes/hacienda.routes';
import identificacion from './routes/identificacion.routes';
import impuestos from './routes/impuestos.routes';
import monedas from "./routes/monedas.routes";
import pagos from './routes/pagos.routes';
import referencia from './routes/referencia.routes';
import sucursal from "./routes/sucursal.routes";
import tipo_documento from './routes/tipoDocumento.routes';
import tipo_mensaje from './routes/tipoMensaje.routes';
import ubicaciones from './routes/ubicaciones.routes';
import unidad_medida from './routes/unidadMedida.routes';
import usuario from "./routes/usuario.routes";

const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({ origin: true, credentials: true  }) );

// Rutas de servicios
server.app.use('/api', [
    actividades_economicas,
    cabys,
    codigo_comercial,
    condiciones,
    documento_referencia,
    exoneracion,
    factura_electronica,
    fe,
    firmador,
    hacienda,
    identificacion,
    impuestos,
    monedas,
    pagos,
    referencia,
    sucursal,
    tipo_documento,
    tipo_mensaje,
    ubicaciones,
    unidad_medida,
    usuario
]);

server.start(() => {
    console.log(`El servidor esta corriendo en el puerto: ${server.port}`);
});
