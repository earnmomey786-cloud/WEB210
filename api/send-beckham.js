const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ 
        success: false, 
        message: 'No se recibieron datos del formulario' 
      });
    }

    // Configurar transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'mail.pgkhiszpania.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@pgkhiszpania.com',
        pass: process.env.SMTP_PASS || 'Kocham647.',
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Generar HTML con todas las respuestas
    let formHtml = '';
    Object.entries(formData).forEach(([key, value]) => {
      if (value && String(value).trim() !== '') {
        formHtml += `
          <div style="margin-bottom: 15px; padding: 12px; background: white; border-left: 3px solid #8e7951;">
            <div style="font-weight: bold; color: #8e7951; margin-bottom: 5px;">${key}</div>
            <div style="color: #333;">${String(value).replace(/\n/g, '<br>')}</div>
          </div>
        `;
      }
    });

    const mailOptions = {
      from: '"PGK Hiszpania - Formulario Beckham" <info@pgkhiszpania.com>',
      to: 'admin@pgkhiszpania.com',
      subject: `✅ Nuevo cuestionario Beckham completado - ${new Date().toLocaleDateString('es-ES')}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #8e7951 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .footer { background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📋 Cuestionario Beckham Completado</h1>
              <p style="margin: 10px 0 0 0;">Fecha: ${new Date().toLocaleString('es-ES')}</p>
            </div>
            <div class="content">
              <h2 style="color: #8e7951;">Respuestas del cliente:</h2>
              ${formHtml}
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Polska Grupa Konsultingowa SL</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Formulario enviado correctamente'
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el formulario',
      error: error.message
    });
  }
}
