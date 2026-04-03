import { X } from 'lucide-react'

export default function Modal({ isOpen, title, children, onClose, size = 'md' }) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} max-h-[90vh] overflow-auto`}>
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="hover:bg-slate-600 p-2 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
