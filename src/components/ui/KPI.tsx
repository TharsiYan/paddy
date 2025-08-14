import React from 'react'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface KPIProps {
  title: string
  value: string | number
  change?: {
    value: number
    period: string
    trend: 'up' | 'down' | 'neutral'
  }
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  target?: {
    value: number
    label: string
  }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'elevated' | 'minimal'
  className?: string
  loading?: boolean
  onClick?: () => void
}

export const KPI: React.FC<KPIProps> = ({
  title,
  value,
  change,
  status = 'neutral',
  icon: Icon,
  description,
  target,
  size = 'md',
  variant = 'default',
  className,
  loading = false,
  onClick
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const textSizes = {
    sm: {
      title: 'text-sm',
      value: 'text-xl',
      description: 'text-xs'
    },
    md: {
      title: 'text-sm',
      value: 'text-2xl',
      description: 'text-sm'
    },
    lg: {
      title: 'text-base',
      value: 'text-3xl',
      description: 'text-base'
    }
  }

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-soft border-0',
    minimal: 'bg-transparent border-0'
  }

  const statusColors = {
    success: {
      icon: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700'
    },
    warning: {
      icon: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700'
    },
    error: {
      icon: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700'
    },
    info: {
      icon: 'text-accent-600',
      bg: 'bg-accent-50',
      border: 'border-accent-200',
      text: 'text-accent-700'
    },
    neutral: {
      icon: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-700'
    }
  }

  const getStatusIcon = (status: KPIProps['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'error':
        return <AlertTriangle className="h-4 w-4" />
      case 'info':
        return <Info className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      case 'neutral':
        return 'text-gray-500'
    }
  }

  if (loading) {
    return (
      <div className={cn(
        'rounded-2xl border shadow-soft animate-pulse',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-40"></div>
      </div>
    )
  }

  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      className={cn(
        'rounded-2xl transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        onClick && 'cursor-pointer hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${title} - ${value}` : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={cn('font-medium text-gray-600 mb-1', textSizes[size].title)}>
            {title}
          </h3>
          
          {status !== 'neutral' && (
            <div className={cn(
              'inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium',
              statusColors[status].bg,
              statusColors[status].border,
              statusColors[status].text
            )}>
              {getStatusIcon(status)}
              <span className="capitalize">{status}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-2xl',
            statusColors[status].bg,
            statusColors[status].icon
          )}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <p className={cn('font-bold text-gray-900', textSizes[size].value)}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {change && (
            <div className="flex items-center space-x-1">
              {getTrendIcon(change.trend)}
              <span className={cn('text-sm font-medium', getTrendColor(change.trend))}>
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-500">vs {change.period}</span>
            </div>
          )}
        </div>

        {description && (
          <p className={cn('text-gray-600', textSizes[size].description)}>
            {description}
          </p>
        )}

        {target && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">Target</span>
            <span className="text-sm font-medium text-gray-700">
              {target.value.toLocaleString()} {target.label}
            </span>
          </div>
        )}
      </div>
    </Component>
  )
}

// KPI Grid Component
export interface KPIGridProps {
  kpis: KPIProps[]
  columns?: 1 | 2 | 3 | 4
  size?: KPIProps['size']
  variant?: KPIProps['variant']
  className?: string
}

export const KPIGrid: React.FC<KPIGridProps> = ({
  kpis,
  columns = 4,
  size = 'md',
  variant = 'default',
  className
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={cn(
      'grid gap-6',
      gridCols[columns],
      className
    )}>
      {kpis.map((kpi, index) => (
        <KPI
          key={index}
          {...kpi}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  )
}

// KPI Row Component for horizontal layout
export interface KPIRowProps {
  kpis: KPIProps[]
  size?: KPIProps['size']
  variant?: KPIProps['variant']
  className?: string
}

export const KPIRow: React.FC<KPIRowProps> = ({
  kpis,
  size = 'md',
  variant = 'default',
  className
}) => {
  return (
    <div className={cn(
      'flex flex-wrap gap-6',
      className
    )}>
      {kpis.map((kpi, index) => (
        <div key={index} className="flex-1 min-w-0">
          <KPI
            {...kpi}
            size={size}
            variant={variant}
          />
        </div>
      ))}
    </div>
  )
}
