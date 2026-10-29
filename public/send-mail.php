<?php
/**
 * Script de envío de cotizaciones por correo para Publicidad Total Q&R
 * Diseñado para hosting tradicional (Apache/cPanel/Plesk con PHP)
 */

header('Content-Type: application/json; charset=utf-8');

// Configuración de cabeceras CORS básicas (para permitir peticiones del mismo origen o desarrollo)
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Solo permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Se requiere petición POST.'
    ]);
    exit;
}

// Destinatario principal
$toEmail = 'ventaspublicidad1@hotmail.com';

// Obtener datos (soporta JSON en php://input o datos enviados por $_POST)
$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Extraer y sanitizar campos
$nombreEmpresa       = trim(strip_tags($data['nombre_empresa'] ?? ''));
$telefonoWhatsApp   = trim(strip_tags($data['telefono_whatsapp'] ?? ''));
$plazaDespliegue    = trim(strip_tags($data['plaza_despliegue'] ?? ''));
$serviciosSolicitados = trim(strip_tags($data['servicios_solicitados'] ?? ''));
$requerimientos     = trim(strip_tags($data['requerimientos_especiales'] ?? 'Sin requerimientos especiales'));
$fechaEnvio         = trim(strip_tags($data['fecha_envio'] ?? date('d/m/Y H:i:s')));

// Validaciones mínimas
if (empty($nombreEmpresa) || empty($telefonoWhatsApp)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Por favor completa el nombre de la empresa y tu teléfono de contacto.'
    ]);
    exit;
}

if (empty($serviciosSolicitados)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Por favor selecciona al menos un servicio.'
    ]);
    exit;
}

// Limpiar teléfono para enlace directo a WhatsApp (quitar espacios, guiones y símbolos)
$phoneDigits = preg_replace('/[^0-9]/', '', $telefonoWhatsApp);
$whatsappUrl = 'https://wa.me/' . (strlen($phoneDigits) === 10 ? '52' . $phoneDigits : $phoneDigits);

// Asunto del correo
$subject = "Nueva Cotización Web: " . ($nombreEmpresa ?: 'Prospecto') . " (" . ($plazaDespliegue ?: 'General') . ")";
// Codificar asunto para UTF-8 en clientes de correo
$subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';

// Determinar el dominio remitente dinámico
$serverName = $_SERVER['SERVER_NAME'] ?? 'publicidadtotalqyr.com';
if ($serverName === 'localhost' || filter_var($serverName, FILTER_VALIDATE_IP)) {
    $fromDomain = 'publicidadtotalqyr.com';
} else {
    $fromDomain = preg_replace('/^www\./i', '', $serverName);
}
$fromEmail = 'notificaciones@' . $fromDomain;

// Plantilla HTML del correo
$htmlBody = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px; color: #1f2937; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
        .header { background: #0A0D14; padding: 28px 24px; text-align: center; border-bottom: 4px solid #e11d48; }
        .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0 0; color: #9ca3af; font-size: 13px; }
        .content { padding: 28px 24px; }
        .intro { font-size: 15px; margin-bottom: 24px; color: #374151; }
        .field-group { margin-bottom: 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 12px; }
        .field-group:last-child { border-bottom: none; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
        .value { font-size: 15px; font-weight: 500; color: #111827; }
        .badge { display: inline-block; background: #fee2e2; color: #be123c; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 13px; }
        .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; margin-top: 6px; }
        .footer { background: #f9fafb; padding: 18px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>PUBLICIDAD TOTAL Q&R</h1>
            <p>Nueva Solicitud de Cotización desde el Sitio Web</p>
        </div>
        <div class="content">
            <div class="intro">
                Has recibido una nueva solicitud de cotización enviada desde el formulario del sitio web:
            </div>

            <div class="field-group">
                <div class="label">Empresa o Cliente</div>
                <div class="value">' . htmlspecialchars($nombreEmpresa) . '</div>
            </div>

            <div class="field-group">
                <div class="label">Teléfono / WhatsApp</div>
                <div class="value">
                    ' . htmlspecialchars($telefonoWhatsApp) . '
                    <br>
                    <a href="' . htmlspecialchars($whatsappUrl) . '" target="_blank" class="btn-wa">Abrir chat en WhatsApp</a>
                </div>
            </div>

            <div class="field-group">
                <div class="label">Plazas / Estados Solicitados</div>
                <div class="value">' . nl2br(htmlspecialchars($plazaDespliegue)) . '</div>
            </div>

            <div class="field-group">
                <div class="label">Servicios Requeridos</div>
                <div class="value"><span class="badge">' . htmlspecialchars($serviciosSolicitados) . '</span></div>
            </div>

            <div class="field-group">
                <div class="label">Requerimientos Especiales / Mensaje</div>
                <div class="value">' . nl2br(htmlspecialchars($requerimientos)) . '</div>
            </div>

            <div class="field-group">
                <div class="label">Fecha y Hora de Recepción</div>
                <div class="value">' . htmlspecialchars($fechaEnvio) . '</div>
            </div>
        </div>
        <div class="footer">
            Mensaje generado automáticamente por el sitio web de Publicidad Total Q&R.<br>
            Para dar seguimiento inmediato, responde al cliente directamente por WhatsApp o llama al número proporcionado.
        </div>
    </div>
</body>
</html>
';

// Cabeceras de correo
$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Publicidad Total Q&R <' . $fromEmail . '>';
$headers[] = 'Reply-To: ' . $fromEmail;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Intentar enviar el correo
$mailSent = @mail($toEmail, $subjectEncoded, $htmlBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => '¡Cotización enviada exitosamente! Nos pondremos en contacto contigo a la brevedad.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo enviar el correo en este momento. Por favor contáctanos directamente por WhatsApp.'
    ]);
}

