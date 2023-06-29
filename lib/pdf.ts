import fs from 'fs';
import QRCode from 'qrcode';
import { PDFDocument, PDFPageEmbedder, PageSizes, StandardFonts, rgb  } from 'pdf-lib';
import path from 'path';

/**
 * @class PDF
 * @classdesc Clase para convertir HTML a PDF y enviarlo por correo electrónico
 * @version 1.0.0
 */
class PDF {

    public async GenerarPDFFE(JSON:any): Promise<any> {

        // Cargar el archivo JSON de la plantilla
        const json = JSON;
        const basePath = process.cwd();

        // URL de la fuente de Google Fonts
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage(PageSizes.Letter); // Establece el tamaño de la página a carta
        const { width, height } = page.getSize();

        /**
         * Establece el tamaño de la fuente y el color
         */
        const fontSizeHeader = 10;
        const fontSize = 6;
        const fontColorHeader = rgb(19/255, 64/255, 80/255);
        const fontColorTexto = rgb(84/255, 84/255, 84/255);
        const fontColorTextoBlanco = rgb(1, 1, 1);

        // Generar el código QR e insertar el código QR en la página
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.Clave);
        const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);

        // Agrega el logo de la empresa
        const logoImage = await pdfDoc.embedPng(fs.readFileSync(`${basePath}\\static\\img\\${JSON.Emisor.Identificacion.Numero}.png`));

        page.drawImage(logoImage, {
            x: 50,
            y: height - 100,
            width: 150,
            height: 79,
        });

        page.drawImage(qrCodeImage, {
            x: 485,
            y: height - 100,
            width: 79,
            height: 79,
        });

        /**
         * Datos del emisor
         */
        page.drawText('Emisor', {
            x: 50,
            y: height - 150,
            size: fontSizeHeader,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorHeader
        });

        page.drawText(json.Emisor.NombreComercial, {
            x: 50,
            y: height - 165,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Emisor.Nombre, {
            x: 50,
            y: height - 173,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Emisor.Identificacion.Numero, {
            x: 50,
            y: height - 181,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Emisor.CorreoElectronico, {
            x: 50,
            y: height - 189,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('+'+json.Emisor.Telefono.CodigoPais+' '+json.Emisor.Telefono.NumTelefono, {
            x: 50,
            y: height - 197,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Emisor.Ubicacion.OtrasSenas, {
            x: 50,
            y: height - 205,
            maxWidth: 150,
            lineHeight: 6,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        /**
         * Datos del receptor
         */
        page.drawText('Receptor', {
            x: 220,
            y: height - 150,
            size: fontSizeHeader,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorHeader
        });

        page.drawText(json.Emisor.NombreComercial, {
            x: 220,
            y: height - 165,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Receptor.Nombre, {
            x: 220,
            y: height - 173,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Receptor.Identificacion.Numero, {
            x: 220,
            y: height - 181,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Receptor.CorreoElectronico, {
            x: 220,
            y: height - 189,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('+'+json.Receptor.Telefono.CodigoPais+' '+json.Receptor.Telefono.NumTelefono, {
            x: 220,
            y: height - 197,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.Receptor.Ubicacion.OtrasSenas, {
            x: 220,
            y: height - 205,
            maxWidth: 150,
            lineHeight: 6,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        /**
         * Datos de la factura
         */
        page.drawText('Factura Electrónica', {
            x: 380,
            y: height - 150,
            size: fontSizeHeader,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorHeader
        });

        page.drawText(json.Clave, {
            x: 380,
            y: height - 165,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('Consecutivo: '+json.NumeroConsecutivo, {
            x: 380,
            y: height - 173,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('Fecha Emisión: '+json.FechaEmision, {
            x: 380,
            y: height - 181,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('Condicion Venta: '+json.CondicionVenta, {
            x: 380,
            y: height - 189,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('Medio de Pago: '+json.MedioPago, {
            x: 380,
            y: height - 197,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('Moneda y Tipo de Cambio: '+json.ResumenFactura.CodigoTipoMoneda.CodigoMoneda +' - '+ json.ResumenFactura.CodigoTipoMoneda.TipoCambio, {
            x: 380,
            y: height - 205,
            size: fontSize,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.moveDown(1.5);

        /**
         * Detalle de la factura
         */
        // Define las coordenadas y dimensiones del rectángulo
        const x = 40; // Posición x del rectángulo
        const y = 548; // Posición y del rectángulo
        const width_r = 520; // Ancho del rectángulo
        const height_r = 15; // Alto del rectángulo
        const fillColor = fontColorHeader; // Color de relleno gris
        const fontSizeHeaderDetalle = 8;

        // Dibuja el rectángulo con relleno en la página
        page.drawRectangle({
          x,
          y,
          width: width_r,
          height: height_r,
          borderWidth: 0, // Ancho del borde del rectángulo
          borderColor: rgb(0, 0, 0), // Color del borde del rectángulo (negro en este caso)
          color: fillColor, // Color de relleno del rectángulo
        });
        
        page.drawText('Codigo', {
            x: 50,
            y: height - 240,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco
        });

        page.drawText('Detalle', {
            x: 100,
            y: height - 240,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco
        });

        page.drawText('Precio', {
            x: 250,
            y: height - 240,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco
        });

        page.drawText('Cantidad', {
            x: 300,
            y: height - 240,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco,
        });

        page.drawText('SubTotal', {
            x: 350,
            y: height - 240,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco
        });

        page.drawText('Impuesto', {
            x: 420,
            y: height - 240,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco
        });

        page.drawText('Total', {
            x: 490,
            y: height - 240,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco
        });

        page.moveDown(1.5);

        let yDetalle = 0;

        for (let i = 0; i < json.DetalleServicio.length; i++) {
            const element = json.DetalleServicio[i].LineaDetalle;
            yDetalle = height - 260 - (i * 15);
            page.drawText(element.CodigoComercial.Codigo.toString(), {
                x: 50,
                y: yDetalle,
                size: fontSizeHeaderDetalle,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                color: fontColorTexto
            });

            page.drawText(element.Detalle.toString(), {
                x: 100,
                y: yDetalle,
                size: fontSizeHeaderDetalle,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                color: fontColorTexto
            });

            page.drawText(element.PrecioUnitario.toString(), {
                x: 250,
                y: yDetalle,
                size: fontSizeHeaderDetalle,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                color: fontColorTexto
            });

            page.drawText(element.Cantidad.toString(), {
                x: 315,
                y: yDetalle,
                size: fontSizeHeaderDetalle,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                color: fontColorTexto
            });

            page.drawText(element.SubTotal.toString(), {
                x: 350,
                y: yDetalle,
                size: fontSizeHeaderDetalle,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                color: fontColorTexto
            });

            page.drawText(element.Impuesto.Monto.toString(), {
                x: 420,
                y: yDetalle,
                size: fontSizeHeaderDetalle,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                color: fontColorTexto
            });

            page.drawText(element.MontoTotalLinea.toString(), {
                x: 490,
                y: yDetalle,
                size: fontSizeHeaderDetalle,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                color: fontColorTexto
            });
        }
        page.moveDown(1.5);
        /**
         * Totales
         **/

        let yResumen = yDetalle;
        page.drawLine({
            start: { x: 453, y: yResumen-10 },
            end: { x: 555, y: yResumen-10 },
            thickness: 1,
            color: fillColor,
        });
        page.drawText('Sub Total: ', {
            x: 460,
            y: yResumen-25,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });
        page.drawText(json.ResumenFactura.TotalVenta, {
            x: 510,
            y: yResumen-25,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });
        
        page.drawText('Descuento: ', {
            x: 456,
            y: yResumen-37,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });
        
        page.drawText(json.ResumenFactura.TotalDescuentos, {
            x: 510,
            y: yResumen-37,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('Impuestos: ', {
            x: 457,
            y: yResumen-50,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText(json.ResumenFactura.TotalImpuesto, {
            x: 510,
            y: yResumen-50,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        /**
         * Detalle de la factura
         */
        // Define las coordenadas y dimensiones del rectángulo
        const xt = 455; // Posición x del rectángulo
        const yt = yResumen-75; // Posición y del rectángulo
        const width_t = 105; // Ancho del rectángulo
        const height_t = 15; // Alto del rectángulo
        const fillColorT = fontColorHeader; // Color de relleno gris

        // Dibuja el rectángulo con relleno en la página
        page.drawRectangle({
            x: xt,
            y: yt,
            width: width_t,
            height: height_t,
            borderWidth: 0, // Ancho del borde del rectángulo
            borderColor: rgb(0, 0, 0), // Color del borde del rectángulo (negro en este caso)
            color: fillColorT, // Color de relleno del rectángulo
        });

        page.drawText('Total: '+json.ResumenFactura.TotalComprobante, {
            x: 470,
            y: yResumen-70,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
            color: fontColorTextoBlanco
        });


        /**
         * Fin Totales
         * */
        page.moveDown(1.5);
        console.log(json.ResumenFactura.TotalComprobanteLetras);
        
        const monto = this.convertirNumeroALetras(json.ResumenFactura.TotalComprobanteLetras).toUpperCase();

        page.drawText(monto, {
            x: 50,
            y: yResumen-75,
            size: fontSizeHeaderDetalle,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            color: fontColorTexto
        });

        page.drawText('Autorizada mediante resolución N° DGT-R-033-2019 del 20 de Junio del 2019', {
            x: 165,
            y: 20,
            size: 8,
            color: fillColorT,
            font: await pdfDoc.embedFont(StandardFonts.HelveticaBold)
        });

        console.log(height, page.getHeight());
        
        // Guarda el PDF en el sistema de archivos
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(`${basePath}\\static\\${json.Receptor.Identificacion.Numero}\\pdf\\FE_${JSON.Clave}.pdf`, pdfBytes);
    }

    public convertirNumeroALetras(monto: any) {

        const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        const especiales = ['', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
        const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
        const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
        const miles = ['', 'mil', 'millón', 'mil millones', 'billón'];

        if (monto === 0) {
            return 'cero';
        }

        let montoAbsoluto = Math.abs(monto);
        const montoEnLetras = [];

        const obtenerUnidad = (monto: number) => {
            return unidades[monto];
        };

        const obtenerEspecial = (monto: number) => {
            return especiales[monto - 10];
        };

        const obtenerDecena = (monto: number) => {
            if (monto < 10) {
                return obtenerUnidad(monto);
            } else if (monto < 20) {
                return obtenerEspecial(monto);
            } else {
                const unidad = monto % 10;
                const decena = Math.floor(monto / 10);
                let resultado = decenas[decena];
                if (unidad > 0) {
                    resultado += ' y ' + obtenerUnidad(unidad);
                }
                return resultado;
            }
        };

        const obtenerCentena = (monto: number) => {
            if (monto === 100) {
                return 'cien';
            } else {
                const centena = Math.floor(monto / 100);
                const resto = monto % 100;
                let resultado = centenas[centena];
                if (resto > 0) {
                    resultado += ' ' + obtenerDecena(resto);
                }
                return resultado;
            }
        };

        const obtenerMiles = (monto: number, indice: number) => {
            const milesTexto = miles[indice];
            const centenasTexto = obtenerCentena(monto);
            if (monto === 1) {
                return milesTexto;
            } else if (monto > 1 && centenasTexto === 'uno') {
                return 'un ' + milesTexto;
            } else if (centenasTexto) {
                return centenasTexto + ' ' + milesTexto;
            } else {
                return milesTexto;
            }
        };

        let indice = 0;

        while (montoAbsoluto > 0) {
            const grupo = montoAbsoluto % 1000;
            const milesTexto = obtenerMiles(grupo, indice);
            if (grupo > 0) {
                montoEnLetras.unshift(milesTexto);
            }
            montoAbsoluto = Math.floor(montoAbsoluto / 1000);
            indice++;
        }

        let resultado = montoEnLetras.join(' ');
        if (monto < 0) {
          resultado = 'menos ' + resultado;
        }
        return resultado;
    }
}
export default PDF;
