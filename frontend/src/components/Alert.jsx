import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

export default function Alert({ type = 'info', title, message, onClose }) {
  const baseClasses = 'p-4 rounded-lg flex gap-4 items-start'
  const typeClasses = {
    info: 'bg-blue-50 border border-blue-200',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    error: 'bg-red-50 border border-red-200',
  }

  const iconClasses = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  }

  const textClasses = {
    info: 'text-blue-800',
    success: 'text-green-800',
    warning: 'text-yellow-800',
    error: 'text-red-800',
  }

  const icons = {
    info: <Info size={20} />,
    success: <CheckCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    error: <AlertCircle size={20} />,
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className={iconClasses[type]}>{icons[type]}</div>
      <div className="flex-1">
        {title && <h4 className={`font-semibold ${textClasses[type]}`}>{title}</h4>}
        {message && <p className={textClasses[type]}>{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      )}
    </div>
  )
}
