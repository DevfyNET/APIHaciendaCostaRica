/**
 * Variables de entorno
 * @author: Luis Cortés
 * @version: 1.0
 * @description: Configuración API MINISTERIO DE HACIENDA
 * @date: 2023-03-01
 */

/**
 * Entorno de trabajo API MINISTERIO DE HACIENDA
 * Producción: prod
 * Desarrollo: stag
 */
export const ENV = 'prod';

/**
 * Puerto de la aplicación (en el entorno de desarrollo) o puerto predeterminado (en el entorno de producción) de la aplicación.
 */
export const SERVER_PORT:number = Number(process.env.SERVER_PORT) || 5000;


// Conexión Base de datos correos.
export const db = {
    user : 'lcortes',
    password : 'Luchy$1210',
    server : '127.0.0.1',
    database : 'fa',
    options : {
        encrypt : false, // Use this if you're on Windows Azure
        trustedConnection : false,
        enableArithAbort : true,
        instancename: 'MSSQLSERVER'
    }
};

/**
 * Enlaces API MINISTERIO DE HACIENDA
 */
export const URL = {
    TOKEN : `https://idp.comprobanteselectronicos.go.cr/auth/realms/${ (ENV == 'prod')? 'rut' : 'rut-stag'}/protocol/openid-connect/token`,
    TOKEN_DESTROY : `https://idp.comprobanteselectronicos.go.cr/auth/realms/${ (ENV == 'prod')? 'rut' : 'rut-stag'}/protocol/openid-connect/logout`,
    API : `https://${ (ENV == 'prod')? 'api': 'api-sandbox'}.comprobanteselectronicos.go.cr/recepcion/v1/${ (ENV == 'prod')? '' : 'recepcion/'}`
}

export const HEADERS = {
    ContentTypeIDP : 'application/x-www-form-urlencoded; charset=utf-8',
    ContentTypeAPI : 'application/json;',
}

/**
 * Clave Secreta
 * Metodo : Fort Knox Passwords
 * Generada desde https://randomkeygen.com/#ft_knox_pw
 */
export const clave_secreta = ',2>vJC-!{]+OQcI?b_@@i0[}/Rx&{_';