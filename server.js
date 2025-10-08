import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar transporter de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.pgkhiszpania.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'info@pgkhiszpania.com',
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Endpoint para enviar emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { full_name, email, phone, num_properties, num_owners, has_garage_storage, additional_notes } = req.body;

    // Email para el admin
    const adminMailOptions = {
      from: process.env.SMTP_FROM || 'info@pgkhiszpania.com',
      to: process.env.ADMIN_EMAIL || 'info@pgkhiszpania.com',
      subject: '📧 Nueva Solicitud de Presupuesto - PGK Hiszpania',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">📧 Nueva Solicitud de Presupuesto</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">www.pgkhiszpania.com</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #8e7951; border-bottom: 2px solid #8e7951; padding-bottom: 10px;">DATOS DEL CLIENTE</h2>
              
              <table style="width: 100%; margin: 20px 0;">
                <tr>
                  <td style="padding: 10px; background: white; border-radius: 5px; margin-bottom: 10px;">
                    <strong>👤 Nombre:</strong><br/>
                    ${full_name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border-radius: 5px; margin-bottom: 10px;">
                    <strong>📧 Email:</strong><br/>
                    <a href="mailto:${email}" style="color: #8e7951;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border-radius: 5px; margin-bottom: 10px;">
                    <strong>📱 Teléfono:</strong><br/>
                    <a href="tel:${phone}" style="color: #8e7951;">${phone}</a>
                  </td>
                </tr>
              </table>

              <h2 style="color: #8e7951; border-bottom: 2px solid #8e7951; padding-bottom: 10px; margin-top: 30px;">INFORMACIÓN DE LA PROPIEDAD</h2>
              
              <table style="width: 100%; margin: 20px 0;">
                <tr>
                  <td style="padding: 10px; background: white; border-radius: 5px;">
                    <strong>🏘️ Propiedades:</strong> ${num_properties}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border-radius: 5px;">
                    <strong>👥 Propietarios:</strong> ${num_owners}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: white; border-radius: 5px;">
                    <strong>🚗 Garaje:</strong> ${has_garage_storage ? 'Sí' : 'No'}
                  </td>
                </tr>
              </table>

              ${additional_notes ? `
                <h2 style="color: #8e7951; border-bottom: 2px solid #8e7951; padding-bottom: 10px; margin-top: 30px;">📝 NOTAS</h2>
                <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  ${additional_notes}
                </div>
              ` : ''}

              <div style="margin-top: 30px; padding: 20px; background: #8e7951; color: white; text-align: center; border-radius: 5px;">
                <p style="margin: 0;">💡 Responde directamente a este email para contactar al cliente</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Email de confirmación para el cliente
    const clientMailOptions = {
      from: process.env.SMTP_FROM || 'info@pgkhiszpania.com',
      to: email,
      subject: 'Potwierdzenie otrzymania zapytania - PGK Hiszpania',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #8e7951 0%, #1a1a1a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">✅ Dziękujemy za Twoje zapytanie!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Polska Grupa Konsultingowa</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin: 0 0 20px 0;">Dzień dobry <strong>${full_name}</strong>,</p>
              
              <p style="font-size: 16px; line-height: 1.8;">
                Dziękujemy za wypełnienie formularza kontaktowego na naszej stronie <strong>www.pgkhiszpania.com</strong>
              </p>

              <div style="background: linear-gradient(135deg, #8e7951 0%, #a08960 100%); color: white; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
                <h2 style="margin: 0 0 15px 0; font-size: 24px;">📧 OTRZYMALIŚMY TWOJE ZAPYTANIE!</h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.95;">
                  Nasi specjaliści skontaktują się z Tobą w ciągu <strong>24 godzin</strong>
                </p>
              </div>

              <h3 style="color: #8e7951; margin: 30px 0 15px 0;">📋 TWOJE DANE:</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8e7951;">
                <p style="margin: 5px 0;"><strong>👤 Imię i nazwisko:</strong> ${full_name}</p>
                <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>📱 Telefon:</strong> ${phone}</p>
                <p style="margin: 5px 0;"><strong>🏘️ Liczba nieruchomości:</strong> ${num_properties}</p>
                <p style="margin: 5px 0;"><strong>👥 Liczba właścicieli:</strong> ${num_owners}</p>
                <p style="margin: 5px 0;"><strong>🚗 Garaż/Komórka:</strong> ${has_garage_storage ? 'Tak' : 'Nie'}</p>
              </div>

              <div style="background: #1a1a1a; color: white; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
                <h3 style="margin: 0 0 15px 0; color: #8e7951;">📞 POTRZEBUJESZ PILNEJ POMOCY?</h3>
                <p style="margin: 10px 0; font-size: 18px;">
                  <strong>📱 Zadzwoń:</strong> <a href="tel:+34644106222" style="color: #8e7951; text-decoration: none;">+34 644 106 222</a>
                </p>
                <p style="margin: 10px 0; font-size: 18px;">
                  <strong>📧 Email:</strong> <a href="mailto:info@pgkhiszpania.com" style="color: #8e7951; text-decoration: none;">info@pgkhiszpania.com</a>
                </p>
              </div>

              <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #666;">
                <p style="margin: 5px 0; font-size: 14px;">© 2025 PGK Hiszpania</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Polska Grupa Konsultingowa SL</strong></p>
                <p style="margin: 5px 0; font-size: 14px;">Calle Matilde Peñaranda, 27</p>
                <p style="margin: 5px 0; font-size: 14px;">03183 Torrevieja (Alicante), España</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Enviar ambos emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    res.json({ success: true, message: 'Emails enviados correctamente' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ success: false, message: 'Error al enviar email', error: error.message });
  }
});

// Servir archivos estáticos desde dist
app.use(express.static(join(__dirname, 'dist')));

// Todas las rutas devuelven index.html (para React Router)
app.use((req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
