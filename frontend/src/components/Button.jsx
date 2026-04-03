export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const baseClasses = 'font-semibold transition-colors rounded-lg'

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-400',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:bg-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-slate-400',
    success: 'bg-green-600 hover:bg-green-700 text-white disabled:bg-slate-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50',
  }

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  )
}
