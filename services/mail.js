const nodemailer = require('nodemailer');
const mail = require('../config/mail');

let transporte = nodemailer.createTransport(mail.config_email);

async function crearTransporte() {
    return await transporte;
}

async function configCorreo(from, to, subject, text,  html) {

    crearTransporte();
    
    await transporte.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    },
    (err) => {
        if (err) {

            console.log('El correo no se envio', err);
            return({
                estado: 0,
                msg: err
            });
        }else {
            
             console.log('Correo enviado');
            return({
                estado: 1,
                msg: `Correo enviado`
            });
        }
    });
    return;
}

async function enviarCorreoNuevoUsuario(datos) {
    console.log(datos);
    try {

        let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <style>
                p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
                h1{ font-size: 30px !important;}
                h2{ font-size: 25px !important;}
                h3{ font-size: 18px !important;}
                h4{ font-size: 16px !important;}
                p, a {font-size: 15px !important;}
                .btn_datos{
                    width: 15%;
                    background-color: #efe3d3;
                    border: 2px solid #efe3d3;
                    border-radius: 5px;
                    color: #5F3B1C; 
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 900;
                    margin: 0px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                }
                .btn_datos:hover{
                    background-color: #DDC4A7;
                    color: #5F3B1C;
                }
                /* Extra small devices (phones, 600px and down) */
                @media only screen and (max-width: 600px) {
                    .btn_datos{
                        width: 80%;
                    }
                }
                /* Small devices (portrait tablets and large phones, 600px and up) */
                @media only screen and (min-width: 600px) {
                    .btn_datos{
                        width: 30%;
                    }
                }
                /* Medium devices (landscape tablets, 768px and up) */
                @media only screen and (min-width: 768px) {
                    .btn_datos{
                        width: 30%;
                    }
                }
                /* Large devices (laptops/desktops, 992px and up) */
                @media only screen and (min-width: 992px) {
                    .btn_datos{
                        width: 25%;
                    }
                }
                /* Extra large devices (large laptops and desktops, 1200px and up) */
                @media only screen and (min-width: 1200px) {
                    .btn_datos{
                        width: 25%;
                    }
                }
                .redes_sociales{
                    margin: 0px 5px 0 5px;
                }
                .afooter{
                    color: #5F3B1C !important; 
                    text-decoration: none;
                    font-size: 13px !important;
                }
                .iconos {
                    width: 20px;
                    text-decoration: none;
                    color: #5F3B1C;
                }
                .footer {
                    background-color: #DDC4A7;
                    color: #5F3B1C;
                    padding: 20px 0px 0px 0px;
                    width: 100%;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div style="width: 100%; background-color: #ffffff;">
                <div style="padding: 20px 10px 20px 10px;">
                    <!-- Imagen inicial -->
                    <div style="padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                        <img src="http://181.78.112.85:801/qr/assets/images/logo.png" alt="" style="width: 300px;">
                    </div>
                    <!-- Imagen inicial -->
        
                    <!-- Contenido principal -->
                    <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                        <h2>Centro de Datos Condovac</h2>
                        <p>Su usuario ha sido creado en el centro de datos de Condovac<br/>
                        Usuario: <code><strong>${datos[0]}</strong></code><br/>
                        Contraseña: <code><strong>${datos[1]}</strong></code><br/></p>
        
                        <!-- Botón -->
                        <a class="btn_datos" href="http://181.78.112.85:801/datos/#/">Ir al Centro de Datos</a>
        
                        <!-- Gracias -->
                        <p>Gracias por tu tiempo.</p>
                        <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Departamento de TI</p>
                    </div>
                    <!-- Contenido principal -->
        
                    <!-- Footer -->
                    <div class="footer">
                        <!-- Redes sociales -->
                        <a href="https://www.facebook.com/condovac" class="redes_sociales" target="_blank"><svg  class="iconos" viewBox="-110 1 511 511.99996" xmlns="http://www.w3.org/2000/svg"><path fill="#5F3B1C" d="m180 512h-81.992188c-13.695312 0-24.835937-11.140625-24.835937-24.835938v-184.9375h-47.835937c-13.695313 0-24.835938-11.144531-24.835938-24.835937v-79.246094c0-13.695312 11.140625-24.835937 24.835938-24.835937h47.835937v-39.683594c0-39.347656 12.355469-72.824219 35.726563-96.804688 23.476562-24.089843 56.285156-36.820312 94.878906-36.820312l62.53125.101562c13.671875.023438 24.792968 11.164063 24.792968 24.835938v73.578125c0 13.695313-11.136718 24.835937-24.828124 24.835937l-42.101563.015626c-12.839844 0-16.109375 2.574218-16.808594 3.363281-1.152343 1.308593-2.523437 5.007812-2.523437 15.222656v31.351563h58.269531c4.386719 0 8.636719 1.082031 12.289063 3.121093 7.878906 4.402344 12.777343 12.726563 12.777343 21.722657l-.03125 79.246093c0 13.6875-11.140625 24.828125-24.835937 24.828125h-58.46875v184.941406c0 13.695313-11.144532 24.835938-24.839844 24.835938zm-76.8125-30.015625h71.632812v-193.195313c0-9.144531 7.441407-16.582031 16.582032-16.582031h66.726562l.027344-68.882812h-66.757812c-9.140626 0-16.578126-7.4375-16.578126-16.582031v-44.789063c0-11.726563 1.191407-25.0625 10.042969-35.085937 10.695313-12.117188 27.550781-13.515626 39.300781-13.515626l36.921876-.015624v-63.226563l-57.332032-.09375c-62.023437 0-100.566406 39.703125-100.566406 103.609375v53.117188c0 9.140624-7.4375 16.582031-16.578125 16.582031h-56.09375v68.882812h56.09375c9.140625 0 16.578125 7.4375 16.578125 16.582031zm163.0625-451.867187h.003906zm0 0"/></svg></a>
                        <a href="https://www.instagram.com/condovac/" class="redes_sociales" target="_blank"><svg class="iconos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#5F3B1C" d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" fill="#5f3b1c"></path></svg></a>
                        <a href="tel:50640011151" class="redes_sociales" target="_blank"><svg class="iconos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> <path fill="#5F3B1C" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg></a>
                        <a href="mailto:soporte@condovac.com" class="redes_sociales" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="iconos" viewBox="0 0 16 16"><path fill="#5F3B1C" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg></a>
                        <!-- Redes sociales -->
                        <h3>Soporte</h3>
                        <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                            Comunícate con nosotros por los siguientes medios:<br>
                            Correo: <a class="afooter" href="mailto:soporte@condovac.com">soporte@condovac.com</a><br>
                            Teléfono: <a class="afooter" href="tel:50640011151">+506 4001 1151</a><br>
                        </p>
                        <p style="background-color: #efe3d3; color:#5F3B1C;padding: 10px 0px 10px 0px; font-size: 12px !important;">
                            © 2023 Condovac, Todos los derechos reservados.
                        </p>
                    </div>
                    <!-- Footer -->
                </div>
            </div>
        </body>
        </html>`;

            configCorreo('webmaster@condovac.com', datos[2], 'Credenciales Centro de Datos Condovac', 'text',  html);

        return;
    } catch (err) {
        throw new Error(`Se presento un error en el procedimiento`);
    }
}

async function enviarCorreoAccidenteHuesped(datos) {
    try {

        let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <style>
                p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
                h1{ font-size: 30px !important;}
                h2{ font-size: 25px !important;}
                h3{ font-size: 18px !important;}
                h4{ font-size: 16px !important;}
                p, a {font-size: 15px !important;}
                .btn_datos{
                    width: 15%;
                    background-color: #efe3d3;
                    border: 2px solid #efe3d3;
                    border-radius: 5px;
                    color: #5F3B1C; 
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 900;
                    margin: 0px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                }
                .btn_datos:hover{
                    background-color: #DDC4A7;
                    color: #5F3B1C;
                }
                /* Extra small devices (phones, 600px and down) */
                @media only screen and (max-width: 600px) {
                    .btn_datos{
                        width: 80%;
                    }
                }
                /* Small devices (portrait tablets and large phones, 600px and up) */
                @media only screen and (min-width: 600px) {
                    .btn_datos{
                        width: 30%;
                    }
                }
                /* Medium devices (landscape tablets, 768px and up) */
                @media only screen and (min-width: 768px) {
                    .btn_datos{
                        width: 30%;
                    }
                }
                /* Large devices (laptops/desktops, 992px and up) */
                @media only screen and (min-width: 992px) {
                    .btn_datos{
                        width: 25%;
                    }
                }
                /* Extra large devices (large laptops and desktops, 1200px and up) */
                @media only screen and (min-width: 1200px) {
                    .btn_datos{
                        width: 25%;
                    }
                }
                .redes_sociales{
                    margin: 0px 5px 0 5px;
                }
                .afooter{
                    color: #5F3B1C !important; 
                    text-decoration: none;
                    font-size: 13px !important;
                }
                .iconos {
                    width: 20px;
                    text-decoration: none;
                    color: #5F3B1C;
                }
                .footer {
                    background-color: #DDC4A7;
                    color: #5F3B1C;
                    padding: 20px 0px 0px 0px;
                    width: 100%;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div style="width: 100%; background-color: #ffffff;">
                <div style="padding: 20px 10px 20px 10px;">
                    <!-- Imagen inicial -->
                    <div style="padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                        <img src="http://181.78.112.85:801/qr/assets/images/logo.png" alt="" style="width: 300px;">
                    </div>
                    <!-- Imagen inicial -->
        
                    <!-- Contenido principal -->
                    <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                        <h2>Salud Ocupacional Condovac</h2>
                        <p>
                            Nombre: <code><strong>${datos.nombre}</strong></code><br/>
                            Villa/Visita: <code><strong>${datos.villa}</strong></code><br/>
                            Fecha: <code><strong>${datos.fecha}</strong></code><br/>
                            Lugar: <code><strong>${datos.lugar}</strong></code><br/>
                            situacion: <code><strong>${datos.situacion}</strong></code><br/>
                            Diagnóstico: <code><strong>${datos.diagnostico}</strong></code><br/>
                        </p>
                        <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Departamento de Salud Ocupacional</p>
                    </div>
                    <!-- Contenido principal -->
        
                    <!-- Footer -->
                    <div class="footer">
                        <!-- Redes sociales
                        <a href="https://www.facebook.com/condovac" class="redes_sociales" target="_blank"><svg  class="iconos" viewBox="-110 1 511 511.99996" xmlns="http://www.w3.org/2000/svg"><path fill="#5F3B1C" d="m180 512h-81.992188c-13.695312 0-24.835937-11.140625-24.835937-24.835938v-184.9375h-47.835937c-13.695313 0-24.835938-11.144531-24.835938-24.835937v-79.246094c0-13.695312 11.140625-24.835937 24.835938-24.835937h47.835937v-39.683594c0-39.347656 12.355469-72.824219 35.726563-96.804688 23.476562-24.089843 56.285156-36.820312 94.878906-36.820312l62.53125.101562c13.671875.023438 24.792968 11.164063 24.792968 24.835938v73.578125c0 13.695313-11.136718 24.835937-24.828124 24.835937l-42.101563.015626c-12.839844 0-16.109375 2.574218-16.808594 3.363281-1.152343 1.308593-2.523437 5.007812-2.523437 15.222656v31.351563h58.269531c4.386719 0 8.636719 1.082031 12.289063 3.121093 7.878906 4.402344 12.777343 12.726563 12.777343 21.722657l-.03125 79.246093c0 13.6875-11.140625 24.828125-24.835937 24.828125h-58.46875v184.941406c0 13.695313-11.144532 24.835938-24.839844 24.835938zm-76.8125-30.015625h71.632812v-193.195313c0-9.144531 7.441407-16.582031 16.582032-16.582031h66.726562l.027344-68.882812h-66.757812c-9.140626 0-16.578126-7.4375-16.578126-16.582031v-44.789063c0-11.726563 1.191407-25.0625 10.042969-35.085937 10.695313-12.117188 27.550781-13.515626 39.300781-13.515626l36.921876-.015624v-63.226563l-57.332032-.09375c-62.023437 0-100.566406 39.703125-100.566406 103.609375v53.117188c0 9.140624-7.4375 16.582031-16.578125 16.582031h-56.09375v68.882812h56.09375c9.140625 0 16.578125 7.4375 16.578125 16.582031zm163.0625-451.867187h.003906zm0 0"/></svg></a>
                        <a href="https://www.instagram.com/condovac/" class="redes_sociales" target="_blank"><svg class="iconos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#5F3B1C" d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" fill="#5f3b1c"></path></svg></a>
                        <a href="tel:50640011151" class="redes_sociales" target="_blank"><svg class="iconos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> <path fill="#5F3B1C" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg></a>
                        <a href="mailto:soporte@condovac.com" class="redes_sociales" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="iconos" viewBox="0 0 16 16"><path fill="#5F3B1C" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg></a>
                        Redes sociales -->
                        <h3>Salud Ocupacional</h3>
                        <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                            Comunícate con nosotros por los siguientes medios:<br>
                            Correo: <a class="afooter" href="mailto:saludocupacional@condovac.com">saludocupacional@condovac.com</a><br>
                            Teléfono: <a class="afooter" href="tel:50640011174">+506 4001 1174</a><br>
                        </p>
                        <p style="background-color: #efe3d3; color:#5F3B1C;padding: 10px 0px 10px 0px; font-size: 12px !important;">
                            © 2023 Condovac, Todos los derechos reservados.
                        </p>
                    </div>
                    <!-- Footer -->
                </div>
            </div>
        </body>
        </html>`;

        console.log(datos.correo);
        configCorreo('webmaster@condovac.com', [datos.correo], 'Reporte Salud Ocupacional Condovac', 'text',  html);

        return;
    } catch (err) {
        throw new Error(`Se presento un error en el procedimiento`);
    }
}


async function enviarCorreoNuevoTicket(datos) {

    try {

        let html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
                    h1{ font-size: 30px !important;}
                    h2{ font-size: 25px !important;}
                    h3{ font-size: 18px !important;}
                    h4{ font-size: 16px !important;}
                    p, a {font-size: 15px !important;}
                    .btn_datos{
                        width: 15%;
                        background-color: #efe3d3;
                        border: 2px solid #efe3d3;
                        border-radius: 5px;
                        color: #5F3B1C; 
                        padding: 16px 32px;
                        text-align: center;
                        text-decoration: none;
                        font-weight: bold;
                        display: inline-block;
                        font-size: 16px;
                        font-weight: 900;
                        margin: 0px 2px;
                        transition-duration: 0.4s;
                        cursor: pointer;
                    }
                    .btn_datos:hover{
                        background-color: #DDC4A7;
                        color: #5F3B1C;
                    }
                    /* Extra small devices (phones, 600px and down) */
                    @media only screen and (max-width: 600px) {
                        .btn_datos{
                            width: 80%;
                        }
                    }
                    /* Small devices (portrait tablets and large phones, 600px and up) */
                    @media only screen and (min-width: 600px) {
                        .btn_datos{
                            width: 30%;
                        }
                    }
                    /* Medium devices (landscape tablets, 768px and up) */
                    @media only screen and (min-width: 768px) {
                        .btn_datos{
                            width: 30%;
                        }
                    }
                    /* Large devices (laptops/desktops, 992px and up) */
                    @media only screen and (min-width: 992px) {
                        .btn_datos{
                            width: 25%;
                        }
                    }
                    /* Extra large devices (large laptops and desktops, 1200px and up) */
                    @media only screen and (min-width: 1200px) {
                        .btn_datos{
                            width: 25%;
                        }
                    }
                    .redes_sociales{
                        margin: 0px 5px 0 5px;
                    }
                    .afooter{
                        color: #5F3B1C !important; 
                        text-decoration: none;
                        font-size: 13px !important;
                    }
                    .iconos {
                        width: 20px;
                        text-decoration: none;
                        color: #5F3B1C;
                    }
                    .footer {
                        background-color: #DDC4A7;
                        color: #5F3B1C;
                        padding: 20px 0px 0px 0px;
                        width: 100%;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div style="width: 100%; background-color: #ffffff;">
                    <div style="padding: 20px 10px 20px 10px;">
                        <!-- Imagen inicial -->
                        <div style="padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                            <img src="http://181.78.112.85:801/qr/assets/images/logo.png" alt="" style="width: 300px;">
                        </div>
                        <!-- Imagen inicial -->
            
                        <!-- Contenido principal -->
                        <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                            <h2>Mesa de servicio #${datos[0]}</h2>
                            <p>Se ha generado una nueva mesa de servicio<br/>
                            Número de Mesa de Servicio: <strong>${datos[0]}</strong><br/>
                            Asunto: <strong>${datos[1]}</strong></code><br/></p>
                            prioridad: <strong>${datos[2]}</strong></code><br/></p>
                            clasificacion: <strong>${datos[3]}</strong></code><br/></p>
                            Descripción: <strong>${datos[4]}</strong></code><br/></p>
            
                            <!-- Gracias -->
                            <p>Gracias por tu tiempo.</p>
                            <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Departamento de TI</p>
                        </div>
                        <!-- Contenido principal -->
            
                        <!-- Footer -->
                        <div class="footer">
                            <!-- Redes sociales -->
                            <a href="https://www.facebook.com/condovac" class="redes_sociales" target="_blank"><svg  class="iconos" viewBox="-110 1 511 511.99996" xmlns="http://www.w3.org/2000/svg"><path fill="#5F3B1C" d="m180 512h-81.992188c-13.695312 0-24.835937-11.140625-24.835937-24.835938v-184.9375h-47.835937c-13.695313 0-24.835938-11.144531-24.835938-24.835937v-79.246094c0-13.695312 11.140625-24.835937 24.835938-24.835937h47.835937v-39.683594c0-39.347656 12.355469-72.824219 35.726563-96.804688 23.476562-24.089843 56.285156-36.820312 94.878906-36.820312l62.53125.101562c13.671875.023438 24.792968 11.164063 24.792968 24.835938v73.578125c0 13.695313-11.136718 24.835937-24.828124 24.835937l-42.101563.015626c-12.839844 0-16.109375 2.574218-16.808594 3.363281-1.152343 1.308593-2.523437 5.007812-2.523437 15.222656v31.351563h58.269531c4.386719 0 8.636719 1.082031 12.289063 3.121093 7.878906 4.402344 12.777343 12.726563 12.777343 21.722657l-.03125 79.246093c0 13.6875-11.140625 24.828125-24.835937 24.828125h-58.46875v184.941406c0 13.695313-11.144532 24.835938-24.839844 24.835938zm-76.8125-30.015625h71.632812v-193.195313c0-9.144531 7.441407-16.582031 16.582032-16.582031h66.726562l.027344-68.882812h-66.757812c-9.140626 0-16.578126-7.4375-16.578126-16.582031v-44.789063c0-11.726563 1.191407-25.0625 10.042969-35.085937 10.695313-12.117188 27.550781-13.515626 39.300781-13.515626l36.921876-.015624v-63.226563l-57.332032-.09375c-62.023437 0-100.566406 39.703125-100.566406 103.609375v53.117188c0 9.140624-7.4375 16.582031-16.578125 16.582031h-56.09375v68.882812h56.09375c9.140625 0 16.578125 7.4375 16.578125 16.582031zm163.0625-451.867187h.003906zm0 0"/></svg></a>
                            <a href="https://www.instagram.com/condovac/" class="redes_sociales" target="_blank"><svg class="iconos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#5F3B1C" d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" fill="#5f3b1c"></path></svg></a>
                            <a href="tel:50640011151" class="redes_sociales" target="_blank"><svg class="iconos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> <path fill="#5F3B1C" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg></a>
                            <a href="mailto:soporte@condovac.com" class="redes_sociales" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="iconos" viewBox="0 0 16 16"><path fill="#5F3B1C" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg></a>
                            <!-- Redes sociales -->
                            <h3>Soporte</h3>
                            <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                                Comunícate con nosotros por los siguientes medios:<br>
                                Correo: <a class="afooter" href="mailto:soporte@condovac.com">soporte@condovac.com</a><br>
                                Teléfono: <a class="afooter" href="tel:50640011151">+506 4001 1151</a><br>
                            </p>
                            <p style="background-color: #efe3d3; color:#5F3B1C;padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                © 2023 Condovac, Todos los derechos reservados.
                            </p>
                        </div>
                        <!-- Footer -->
                    </div>
                </div>
            </body>
            </html>`;

            configCorreo('webmaster@condovac.com', datos[5], 'Nueva Mesa de Servicio', 'text',  html);

        return;
    } catch (err) {
        throw new Error(`Se presento un error en el procedimiento`);
    }
}

module.exports = {
    enviarCorreoNuevoUsuario,
    enviarCorreoAccidenteHuesped,
    enviarCorreoNuevoTicket
}
