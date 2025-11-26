import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar transporter de Nodemailer con tu servidor SMTP
const transporter = nodemailer.createTransport({
  host: 'mail.pgkhiszpania.com',
  port: 465,
  secure: true, // true para puerto 465
  auth: {
    user: 'info@pgkhiszpania.com',
    pass: process.env.EMAIL_PASSWORD || 'Kocham647.',
  },
  tls: {
    rejectUnauthorized: false // Acepta certificados autofirmados
  },
  connectionTimeout: 10000, // 10 segundos
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verificar conexión SMTP al iniciar (no bloqueante)
transporter.verify((error, success) => {
  if (error) {
    console.error('⚠️  Advertencia: No se pudo verificar la conexión SMTP:', error.message);
    console.log('💡 El servidor continuará ejecutándose. Verifica tu configuración SMTP.');
  } else {
    console.log('✅ Servidor SMTP listo para enviar emails');
  }
});

// Endpoint para enviar emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { full_name, email, phone, num_properties, num_owners, has_garage_storage, additional_notes } = req.body;

    console.log('📥 Solicitud recibida:', { full_name, email, phone });

    // Validar datos requeridos
    if (!full_name || !email || !phone) {
      console.error('❌ Faltan datos requeridos');
      return res.status(400).json({ 
        success: false, 
        message: 'Faltan datos requeridos' 
      });
    }

    // 1. EMAIL PARA TI (Notificación en español)
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
            .divider { height: 2px; background: linear-gradient(90deg, #8e7951, transparent); margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📧 Nueva Solicitud de Presupuesto</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">www.pgkhiszpania.com</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1a1a1a; margin-top: 0;">Datos del Cliente</h2>
              
              <div class="field">
                <div class="label">👤 Nombre Completo</div>
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
              
              <div class="divider"></div>
              
              <h2 style="color: #1a1a1a;">Información de la Propiedad</h2>
              
              <div class="field">
                <div class="label">🏘️ Número de Propiedades</div>
                <div class="value">${num_properties}</div>
              </div>
              
              <div class="field">
                <div class="label">👥 Número de Propietarios</div>
                <div class="value">${num_owners}</div>
              </div>
              
              <div class="field">
                <div class="label">🚗 ¿Tiene Garaje/Trastero?</div>
                <div class="value">${has_garage_storage ? '✅ Sí' : '❌ No'}</div>
              </div>
              
              ${additional_notes ? `
              <div class="divider"></div>
              <div class="field">
                <div class="label">📝 Notas Adicionales</div>
                <div class="value">${additional_notes}</div>
              </div>
              ` : ''}
              
              <div class="divider"></div>
              
              <p style="text-align: center; color: #666; margin-top: 30px;">
                <strong>💡 Responde directamente a este email para contactar al cliente</strong>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">© ${new Date().getFullYear()} Polska Grupa Konsultingowa SL</p>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">Este email fue generado automáticamente desde el formulario de contacto</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nueva Solicitud de Presupuesto

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre: ${full_name}
Email: ${email}
Teléfono: ${phone}

INFORMACIÓN DE LA PROPIEDAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Número de propiedades: ${num_properties}
Número de propietarios: ${num_owners}
¿Tiene garaje/trastero?: ${has_garage_storage ? 'Sí' : 'No'}

${additional_notes ? `NOTAS ADICIONALES:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${additional_notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© ${new Date().getFullYear()} Polska Grupa Konsultingowa SL
www.pgkhiszpania.com
      `
    };

    // 2. EMAIL PARA EL CLIENTE (Confirmación en polaco)
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
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Polska Grupa Konsultingowa</p>
            </div>
            
            <div class="content">
              <p style="font-size: 18px; margin-top: 0;">Dzień dobry <strong>${full_name}</strong>,</p>
              
              <p style="font-size: 16px; line-height: 1.8;">
                Dziękujemy za wypełnienie formularza kontaktowego na naszej stronie <strong>www.pgkhiszpania.com</strong>
              </p>
              
              <div class="highlight-box">
                <p style="margin: 0; font-size: 18px;">
                  📧 <strong>Otrzymaliśmy Twoje zapytanie!</strong>
                </p>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">
                  Nasi specjaliści skontaktują się z Tobą w ciągu <strong>24 godzin</strong>
                </p>
              </div>
              
              <h3 style="color: #1a1a1a; margin-top: 30px;">📋 Twoje dane:</h3>
              
              <div class="info-box">
                <strong>👤 Imię i nazwisko:</strong> ${full_name}
              </div>
              
              <div class="info-box">
                <strong>📧 Email:</strong> ${email}
              </div>
              
              <div class="info-box">
                <strong>📱 Telefon:</strong> ${phone}
              </div>
              
              <div class="info-box">
                <strong>🏘️ Liczba nieruchomości:</strong> ${num_properties}
              </div>
              
              <div class="info-box">
                <strong>👥 Liczba właścicieli:</strong> ${num_owners}
              </div>
              
              <div class="info-box">
                <strong>🚗 Garaż/Komórka:</strong> ${has_garage_storage ? 'Tak' : 'Nie'}
              </div>
              
              ${additional_notes ? `
              <div class="info-box">
                <strong>📝 Uwagi:</strong><br>${additional_notes}
              </div>
              ` : ''}
              
              <hr style="border: none; border-top: 2px solid #ddd; margin: 30px 0;">
              
              <h3 style="color: #1a1a1a;">📞 Potrzebujesz pilnej pomocy?</h3>
              <p>Zadzwoń do nas bezpośrednio:</p>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="tel:+34644106222" class="button">
                  📱 +34 644 106 222
                </a>
              </div>
              
              <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
                Lub napisz do nas: <a href="mailto:info@pgkhiszpania.com" style="color: #8e7951;">info@pgkhiszpania.com</a>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0; font-weight: bold;">Polska Grupa Konsultingowa SL</p>
              <p style="margin: 5px 0;">Calle Matilde Peñaranda, 27</p>
              <p style="margin: 5px 0;">03183 Torrevieja (Alicante), España</p>
              <p style="margin: 10px 0 0 0; opacity: 0.8;">© ${new Date().getFullYear()} PGK Hiszpania - Wszelkie prawa zastrzeżone</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
✅ DZIĘKUJEMY ZA TWOJE ZAPYTANIE!

Dzień dobry ${full_name},

Dziękujemy za wypełnienie formularza kontaktowego na naszej stronie www.pgkhiszpania.com

📧 OTRZYMALIŚMY TWOJE ZAPYTANIE!
Nasi specjaliści skontaktują się z Tobą w ciągu 24 godzin.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TWOJE DANE:
👤 Imię i nazwisko: ${full_name}
📧 Email: ${email}
📱 Telefon: ${phone}
🏘️ Liczba nieruchomości: ${num_properties}
👥 Liczba właścicieli: ${num_owners}
🚗 Garaż/Komórka: ${has_garage_storage ? 'Tak' : 'Nie'}
${additional_notes ? `📝 Uwagi: ${additional_notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

POTRZEBUJESZ PILNEJ POMOCY?
📱 Zadzwoń: +34 644 106 222
📧 Email: info@pgkhiszpania.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Polska Grupa Konsultingowa SL
Calle Matilde Peñaranda, 27
03183 Torrevieja (Alicante), España
www.pgkhiszpania.com

© ${new Date().getFullYear()} PGK Hiszpania - Wszelkie prawa zastrzeżone
      `
    };

    // Enviar AMBOS emails
    console.log('📤 Enviando email a admin (info@pgkhiszpania.com)...');
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Email admin enviado');

    console.log('📤 Enviando confirmación al cliente (' + email + ')...');
    await transporter.sendMail(clientMailOptions);
    console.log('✅ Email confirmación enviado al cliente');

    res.json({ 
      success: true, 
      message: 'Emails enviados correctamente'
    });

  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    
    // Log detallado del error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el email',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    });
  }
});

// Endpoint para enviar formulario Beckham
app.post('/api/send-beckham', async (req, res) => {
  try {
    const { formData } = req.body;

    console.log('📥 Formulario Beckham recibido');

    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Formulario vacío' 
      });
    }

    // Organizar datos por secciones
    const sections = [
      { id: "datos_clave", title: "0. Kluczowe dane i daty przeprowadzki" },
      { id: "ingresos_laborales", title: "A1. Aktualne dochody z pracy (Polska)" },
      { id: "cargos_directivos", title: "A2. Dochody z zarządzania" },
      { id: "dividendos_participaciones", title: "A3. Dywidendy i udziały" },
      { id: "fundacion_ared", title: "A4. Fundacja ARED" },
      { id: "actividad_empresarial", title: "A5. Działalność gospodarcza" },
      { id: "podcasts_colaboraciones", title: "A6. Dochody z podcastów" },
      { id: "contrato_teletrabajo", title: "A7. Umowa z Firmao Polska" },
      { id: "ingresos_irregulares", title: "A8. Dochody nieregularne" },
      { id: "patrimonio", title: "B. Sytuacja majątkowa i aktywa" },
      { id: "familia", title: "C. Struktura rodzinna" },
      { id: "antecedentes", title: "D. Historia podatkowa" },
    ];

    // Construir HTML
    let htmlContent = '';
    let textContent = '';

    sections.forEach(section => {
      const sectionData = Object.entries(formData).filter(([key]) => 
        key.includes(section.id.split('_')[0]) || 
        Object.keys(formData).some(k => k === key)
      );

      if (sectionData.length > 0) {
        htmlContent += `
          <div style="margin-bottom: 30px;">
            <h2 style="color: #8e7951; border-bottom: 2px solid #8e7951; padding-bottom: 10px; margin-bottom: 15px;">
              ${section.title}
            </h2>
        `;
        
        textContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${section.title}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
      }
    });

    Object.entries(formData).forEach(([key, value]) => {
      if (value && String(value).trim() !== '') {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        htmlContent += `
          <div style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-left: 3px solid #8e7951;">
            <strong style="color: #1a1a1a;">${label}:</strong><br>
            <span style="color: #333;">${String(value)}</span>
          </div>
        `;
        textContent += `${label}: ${value}\n\n`;
      }
    });

    htmlContent += `</div>`;

    const mailOptions = {
      from: '"PGK Hiszpania - Formulario Beckham" <info@pgkhiszpania.com>',
      to: 'admin@pgkhiszpania.com',
      subject: `📋 Nuevo Cuestionario Beckham - ${new Date().toLocaleDateString('es-ES')}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #8e7951 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #ddd; }
            .footer { background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📋 Cuestionario Beckham Completado</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">${new Date().toLocaleString('es-ES')}</p>
            </div>
            
            <div class="content">
              ${htmlContent}
            </div>
            
            <div class="footer">
              <p style="margin: 0;">© ${new Date().getFullYear()} Polska Grupa Konsultingowa SL</p>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">Formulario generado desde www.pgkhiszpania.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
CUESTIONARIO BECKHAM - ${new Date().toLocaleString('es-ES')}

${textContent}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© ${new Date().getFullYear()} Polska Grupa Konsultingowa SL
www.pgkhiszpania.com
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
    console.error('❌ Error al enviar formulario Beckham:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el formulario',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor de emails corriendo en http://localhost:${PORT}`);
  console.log(`📧 Endpoint: http://localhost:${PORT}/api/send-email\n`);
});

// Mantener el proceso vivo
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('👋 HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('👋 HTTP server closed');
    process.exit(0);
  });
});

// Capturar errores no manejados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
