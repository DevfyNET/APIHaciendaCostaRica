'use strict';

import mssql from 'mssql';
import { db } from '../global/environment';
import bcrypt from 'bcrypt';

class Usuario {

    public saltRounds = 10;

    public async iniciarSesion(datos: { cedula: any; }) {

        if (!datos.cedula) {
            return{
                response: "¡El contenido no puede estar vacío!",
                tipo: false
            }
        }else {
            try {
                let pool = await mssql.connect(db);
                let result = await pool.request()
                                    .input('cedula', mssql.Char, datos.cedula)
                                        .execute('sp_usuario_iniciar_sesion'); 
                return result.recordset[0];          
            } catch (err:any) {
                throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
            }
        }
    }

    public async crearUsuario(datos: { pass: any; cod_empleado: any; correo: any; admin: any; asignado_por: any; }) {
        try {
            const salt = bcrypt.genSaltSync(this.saltRounds);
            const hash = bcrypt.hashSync(datos.pass, salt);

            let pool = await mssql.connect(db);
            let result = await pool.request()
                                .input('cod_empleado', mssql.VarChar, datos.cod_empleado)
                                .input('pass', mssql.VarChar, hash)
                                .input('correo', mssql.VarChar, datos.correo)
                                .input('admin', mssql.TinyInt, datos.admin)
                                .input('asignado_por', mssql.VarChar, datos.asignado_por)
                                    .execute('sp_dc_usuario_crear');

            //email.enviarCorreoNuevoUsuario(['Su Número de Cédula', datos.pass, datos.correo]);

            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async infoUsuario(cedula: any) {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                                .input('cedula', mssql.Char, cedula)
                                    .execute('sp_usuario_info');
            return result.recordset;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getTodosUsuarios(cod: any) {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                                .input('cod', mssql.VarChar, cod)
                                    .execute('sp_dc_todos_usuarios_select');
            return result.recordset;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async comprobarContrasena(cedula: any) {
        try {
            let pool = await mssql.connect(db);
                let result = await pool.request()
                                    .input('cedula', mssql.Char, cedula)
                                        .execute('sp_dc_usuario_comprobar_pass'); 
                return result.recordset;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async cambiarContrasena(datos: { pass: any; cedula: any; }) {
        try {
            const salt = bcrypt.genSaltSync(this.saltRounds);
            const hash = bcrypt.hashSync(datos.pass, salt);

            let pool = await mssql.connect(db);
            let result = await pool.request()
                                .input('cedula', mssql.Char, datos.cedula)
                                .input('pass', mssql.VarChar, hash)
                                    .execute('sp_dc_usuario_cambiar_contrasena');
            return result.recordset;

        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getJefaturasEmpleados(cod_jefe: any) {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                                .input('cod_jefe', mssql.VarChar, cod_jefe)
                                    .execute('sp_dc_jefaturas_empleados');
            return result.recordset;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }

    public async getJefaturas(codigo: number) {
        try {
            let pool = await mssql.connect(db);
            let result = await pool.request()
                                .input('codigo', mssql.VarChar, (codigo == 0) ? null : codigo)
                                    .execute('sp_dc_jefaturas');
            return result.recordset;
        } catch (err:any) {
            throw new Error(`Se presento un error en el procedimiento ${err.procName}...${err.message}`);
        }
    }
}
export default Usuario;
