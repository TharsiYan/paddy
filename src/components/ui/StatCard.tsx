import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    period: string
    trend: 'up' | 'down' | 'neutral'
  }
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  loading?: boolean
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  description,
  variant = 'default',
  size = 'md',
  className,
  loading = false
}) => {
  const variantClasses = {
    default: 'bg-white border-gray-200',
    primary: 'bg-primary-50 border-primary-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  }

  const iconColors = {
    default: 'text-gray-600',
    primary: 'text-primary-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  }

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
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
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-2xl border shadow-soft transition-all duration-200 hover:shadow-soft-lg',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      role="region"
      aria-label={`${title} statistics`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-2" id={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
          
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900" aria-labelledby={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
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
            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            variant === 'default' ? 'bg-gray-100' : 'bg-white/80',
            iconColors[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Grid Component
export interface StatGridProps {
  stats: StatCardProps[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export const StatGrid: React.FC<StatGridProps> = ({
  stats,
  columns = 4,
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
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

// Stat Row Component for horizontal layout
export interface StatRowProps {
  stats: StatCardProps[]
  className?: string
}

export const StatRow: React.FC<StatRowProps> = ({
  stats,
  className
}) => {
  return (
    <div className={cn(
      'flex flex-wrap gap-6',
      className
    )}>
      {stats.map((stat, index) => (
        <div key={index} className="flex-1 min-w-0">
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  )
}
