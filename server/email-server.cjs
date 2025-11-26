const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar transporter de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'mail.pgkhiszpania.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@pgkhiszpania.com',
    pass: process.env.EMAIL_PASSWORD || 'Kocham647.',
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Endpoint para enviar emails del formulario Beckham
app.post('/api/send-beckham', async (req, res) => {
  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ 
        success: false, 
        message: 'No se recibieron datos del formulario' 
      });
    }

    // Generar HTML con todas las respuestas
    let formHtml = '';
    const sections = [
      { id: "datos_clave", title: "0. Kluczowe dane i daty przeprowadzki" },
      { id: "ingresos_laborales", title: "A1. Aktualne dochody z pracy (Polska)" },
      { id: "cargos_directivos", title: "A2. Dochody z zarządzania" },
      { id: "dividendos_participaciones", title: "A3. Dywidendy i udziały" },
      { id: "fundacion_ared", title: "A4. Fundacja ARED" },
      { id: "actividad_empresarial", title: "A5. Działalność gospodarcza" },
      { id: "podcasts_colaboraciones", title: "A6. Dochody z podcastów" },
      { id: "contrato_teletrabajo", title: "A7. Umowa z Firmao Polska (praca zdalna)" },
      { id: "ingresos_irregulares", title: "A8. Dochody nieregularne" },
      { id: "patrimonio", title: "B. Sytuacja majątkowa i aktywa" },
      { id: "familia", title: "C. Struktura rodzinna" },
      { id: "antecedentes", title: "D. Historia podatkowa" }
    ];

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

    console.log('📤 Enviando formulario Beckham a admin@pgkhiszpania.com...');
    await transporter.sendMail(mailOptions);
    console.log('✅ Formulario Beckham enviado correctamente');

    res.json({ 
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
});

// Endpoint para enviar emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { full_name, email, phone, num_properties, num_owners, has_garage_storage, additional_notes } = req.body;

    if (!full_name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Faltan datos requeridos' 
      });
    }

    // 1. EMAIL PARA ADMIN
    const adminMailOptions = {
      from: '"PGK Hiszpania - Formulario Web" <info@pgkhiszpania.com>',
      to: 'info@pgkhiszpania.com',
      replyTo: email,
      subject: `Nueva solicitud de presupuesto - ${full_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #8e7951 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .field { margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #8e7951; }
            .label { font-weight: bold; color: #8e7951; margin-bottom: 5px; }
            .value { color: #333; font-size: 16px; }
            .footer { background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📧 Nueva Solicitud de Presupuesto</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nombre</div>
                <div class="value">${full_name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">📱 Teléfono</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">🏘️ Propiedades</div>
                <div class="value">${num_properties}</div>
              </div>
              <div class="field">
                <div class="label">👥 Propietarios</div>
                <div class="value">${num_owners}</div>
              </div>
              <div class="field">
                <div class="label">🚗 Garaje</div>
                <div class="value">${has_garage_storage ? '✅ Sí' : '❌ No'}</div>
              </div>
              ${additional_notes ? `
              <div class="field">
                <div class="label">📝 Notas</div>
                <div class="value">${additional_notes}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Polska Grupa Konsultingowa SL</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // 2. EMAIL PARA CLIENTE (EN POLACO)
    const clientMailOptions = {
      from: '"Polska Grupa Konsultingowa" <info@pgkhiszpania.com>',
      to: email,
      subject: 'Potwierdzenie otrzymania zapytania - PGK Hiszpania',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #8e7951 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .highlight-box { background: #8e7951; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .info-box { background: white; padding: 15px; border-left: 4px solid #8e7951; margin: 15px 0; }
            .footer { background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
            .button { display: inline-block; padding: 15px 30px; background: #8e7951; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">✅ Dziękujemy za Twoje zapytanie!</h1>
              <p style="margin: 10px 0 0 0;">Polska Grupa Konsultingowa</p>
            </div>
            <div class="content">
              <p style="font-size: 18px;">Dzień dobry <strong>${full_name}</strong>,</p>
              <p>Dziękujemy za wypełnienie formularza kontaktowego na naszej stronie <strong>www.pgkhiszpania.com</strong></p>
              <div class="highlight-box">
                <p style="margin: 0; font-size: 18px;">📧 <strong>Otrzymaliśmy Twoje zapytanie!</strong></p>
                <p style="margin: 10px 0 0 0;">Nasi specjaliści skontaktują się z Tobą w ciągu <strong>24 godzin</strong></p>
              </div>
              <h3>📋 Twoje dane:</h3>
              <div class="info-box"><strong>👤 Imię i nazwisko:</strong> ${full_name}</div>
              <div class="info-box"><strong>📧 Email:</strong> ${email}</div>
              <div class="info-box"><strong>📱 Telefon:</strong> ${phone}</div>
              <div class="info-box"><strong>🏘️ Liczba nieruchomości:</strong> ${num_properties}</div>
              <div class="info-box"><strong>👥 Liczba właścicieli:</strong> ${num_owners}</div>
              <div class="info-box"><strong>🚗 Garaż/Komórka:</strong> ${has_garage_storage ? 'Tak' : 'Nie'}</div>
              ${additional_notes ? `<div class="info-box"><strong>📝 Uwagi:</strong><br>${additional_notes}</div>` : ''}
              <hr style="border: none; border-top: 2px solid #ddd; margin: 30px 0;">
              <h3>📞 Potrzebujesz pilnej pomocy?</h3>
              <p>Zadzwoń do nas bezpośrednio:</p>
              <div style="text-align: center;">
                <a href="tel:+34644106222" class="button">📱 +34 644 106 222</a>
              </div>
              <p style="text-align: center; margin-top: 20px;">
                Lub napisz: <a href="mailto:info@pgkhiszpania.com" style="color: #8e7951;">info@pgkhiszpania.com</a>
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0;"><strong>Polska Grupa Konsultingowa SL</strong></p>
              <p style="margin: 5px 0;">Calle Matilde Peñaranda, 27<br>03183 Torrevieja (Alicante), España</p>
              <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} PGK Hiszpania</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
✅ DZIĘKUJEMY ZA TWOJE ZAPYTANIE!

Dzień dobry ${full_name},

Dziękujemy za wypełnienie formularza na www.pgkhiszpania.com

📧 OTRZYMALIŚMY TWOJE ZAPYTANIE!
Nasi specjaliści skontaktują się z Tobą w ciągu 24 godzin.

TWOJE DANE:
👤 ${full_name}
📧 ${email}
📱 ${phone}
🏘️ Liczba nieruchomości: ${num_properties}
👥 Liczba właścicieli: ${num_owners}
🚗 Garaż/Komórka: ${has_garage_storage ? 'Tak' : 'Nie'}
${additional_notes ? `📝 ${additional_notes}` : ''}

KONTAKT:
📱 +34 644 106 222
📧 info@pgkhiszpania.com

© ${new Date().getFullYear()} PGK Hiszpania
      `
    };

    // Enviar ambos emails
    console.log('📤 Enviando email a admin...');
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Email admin enviado');

    console.log('📤 Enviando confirmación al cliente (' + email + ')...');
    await transporter.sendMail(clientMailOptions);
    console.log('✅ Confirmación enviada al cliente');

    res.json({ 
      success: true, 
      message: 'Emails enviados correctamente'
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar emails',
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor de emails corriendo en http://localhost:${PORT}`);
  console.log(`📧 Endpoint: http://localhost:${PORT}/api/send-email`);
  console.log(`✅ Servidor SMTP configurado y listo\n`);
});

// Mantener el servidor vivo indefinidamente
server.keepAliveTimeout = 0;
server.headersTimeout = 0;

// Heartbeat para mantener el proceso vivo
const heartbeat = setInterval(() => {
  // No hacer nada, solo mantener vivo
}, 60000); // Cada minuto

// Manejar cierre graceful
process.on('SIGTERM', () => {
  console.log('\n👋 Servidor cerrándose...');
  clearInterval(heartbeat);
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 Servidor cerrándose...');
  clearInterval(heartbeat);
  server.close(() => {
    process.exit(0);
  });
});
