export const resetPasswordTemplate = (link) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Recuperar contraseña</title>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; background: #f6f7fb; padding: 0; margin: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f6f7fb; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <tr>
              <td style="background: #4A6CF7; padding: 20px; text-align: center; color: #ffffff;">
                <h2 style="margin: 0; font-size: 22px;">Recuperación de contraseña</h2>
              </td>
            </tr>

            <tr>
              <td style="padding: 30px 25px; color: #333333; font-size: 16px; line-height: 1.6;">
                <p style="margin-top: 0;">Hola,</p>
                <p>
                  Recibimos una solicitud para restablecer la contraseña de tu cuenta.
                  Si fuiste vos, hacé clic en el botón de abajo para continuar.
                </p>

                <p style="font-weight: bold; margin: 25px 0 10px;">⚠️ Este enlace es válido por 1 hora.</p>

                <center>
                  <a href="${link}" 
                     style="display: inline-block; background: #4A6CF7; color: #ffffff; text-decoration: none; padding: 14px 24px; font-size: 16px; border-radius: 6px;">
                    Restablecer contraseña
                  </a>
                </center>

                <p style="margin-top: 30px;">
                  Si no solicitaste este cambio, simplemente ignorá este correo. Tu cuenta sigue estando segura.
                </p>

                <p style="margin-top: 25px;">Saludos,<br><b>Equipo de Soporte</b></p>
              </td>
            </tr>

            <tr>
              <td style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                Este es un mensaje automático, por favor no respondas este correo.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
