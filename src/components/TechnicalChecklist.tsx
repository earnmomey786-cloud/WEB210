import { CheckCircle, Circle, AlertTriangle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export function TechnicalChecklist() {
  const checklistItems: ChecklistItem[] = [
    {
      id: 'cmp-integration',
      title: 'CMP con registro de consentimientos',
      description: 'Implementar timestamp, versión, país, IP truncada',
      completed: false,
      priority: 'high'
    },
    {
      id: 'cookie-blocking',
      title: 'Bloqueo previo de cookies no necesarias',
      description: 'Evitar carga de cookies hasta aceptar consentimiento',
      completed: false,
      priority: 'high'
    },
    {
      id: 'reject-button',
      title: 'Botón "Rechazar" en 1ª capa',
      description: 'Visible y equivalente al botón "Aceptar"',
      completed: true,
      priority: 'high'
    },
    {
      id: 'settings-panel',
      title: 'Panel "Configurar" granular',
      description: 'Permitir selección por categorías de cookies',
      completed: true,
      priority: 'high'
    },
    {
      id: 'permanent-layer',
      title: 'Segunda capa permanente en footer',
      description: 'Acceso "Gestionar consentimiento" siempre visible',
      completed: true,
      priority: 'high'
    },
    {
      id: 'cookie-table',
      title: 'Tabla de cookies autogenerada',
      description: 'Desde CMP o mantenida en CMS',
      completed: false,
      priority: 'medium'
    },
    {
      id: 'policy-versioning',
      title: 'Logs de versiones de políticas',
      description: 'Control de cambios en privacidad/cookies',
      completed: false,
      priority: 'medium'
    },
    {
      id: 'consent-logging',
      title: 'Registro de consentimientos',
      description: 'Historial de decisiones del usuario',
      completed: false,
      priority: 'medium'
    },
    {
      id: 'gdpr-form',
      title: 'Formulario RGPD completo',
      description: 'Campos obligatorios y opcionales según normativa',
      completed: false,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Checklist Técnico - Cumplimiento AEPD
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {completedCount}/{totalCount} ({completionPercentage}%)
          </span>
        </div>
        <p className="text-gray-600">
          Lista de verificación para asegurar el cumplimiento con la normativa AEPD 2024/25
        </p>
      </div>

      <div className="space-y-4">
        {checklistItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`font-semibold ${item.completed ? 'text-green-700' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
              
              {item.priority === 'high' && !item.completed && (
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">Referencias AEPD:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Guía sobre el uso de cookies (AEPD 2024)</li>
          <li>• Requisitos para banners de consentimiento</li>
          <li>• Mecanismos de granularidad y revocación</li>
          <li>• Implementación conforme RGPD</li>
        </ul>
      </div>
    </div>
  );
}