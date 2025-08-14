import React from 'react'
import { cn } from '@/lib/utils'

export interface GaugeProps {
  value: number
  min?: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  showValue?: boolean
  showLabel?: boolean
  label?: string
  className?: string
  thickness?: number
  animated?: boolean
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = true,
  showLabel = true,
  label,
  className,
  thickness = 8,
  animated = true
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-48 h-48'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  const variantColors = {
    default: {
      track: 'stroke-gray-200',
      fill: 'stroke-primary-600',
      text: 'text-primary-600'
    },
    success: {
      track: 'stroke-gray-200',
      fill: 'stroke-green-600',
      text: 'text-green-600'
    },
    warning: {
      track: 'stroke-gray-200',
      fill: 'stroke-yellow-600',
      text: 'text-yellow-600'
    },
    error: {
      track: 'stroke-gray-200',
      fill: 'stroke-red-600',
      text: 'text-red-600'
    },
    info: {
      track: 'stroke-gray-200',
      fill: 'stroke-accent-600',
      text: 'text-accent-600'
    }
  }

  // Calculate percentage and angle
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1)
  const angle = percentage * 180 - 90 // Start from -90° (top) and go to 90° (bottom)
  
  // Calculate stroke dasharray for the progress arc
  const radius = (size === 'sm' ? 40 : size === 'md' ? 64 : size === 'lg' ? 80 : 96) - thickness / 2
  const circumference = Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage * circumference)

  // Get status color based on percentage
  const getStatusColor = (percent: number) => {
    if (percent >= 0.8) return 'success'
    if (percent >= 0.6) return 'warning'
    if (percent >= 0.4) return 'info'
    return 'error'
  }

  const statusColor = getStatusColor(percentage)
  const colors = variantColors[statusColor]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={label || `Gauge showing ${value} out of ${max}`}
    >
      <div className={cn('relative', sizeClasses[size])}>
        {/* SVG Container */}
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius / 2}
            fill="none"
            strokeWidth={thickness}
            className={cn('stroke-gray-200', colors.track)}
          />
          
          {/* Progress Arc */}
          <circle
            cx="50"
            cy="50"
            r={radius / 2}
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-1000 ease-out',
              colors.fill,
              animated && 'animate-pulse'
            )}
            style={{
              strokeDasharray,
              strokeDashoffset,
              transformOrigin: 'center'
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <div className={cn('font-bold text-gray-900', textSizes[size])}>
              {Math.round(value)}
            </div>
          )}
          
          {showLabel && label && (
            <div className={cn('text-gray-600 font-medium text-center', labelSizes[size])}>
              {label}
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">
          {min} - {max}
        </div>
        {percentage > 0 && (
          <div className={cn('text-sm font-medium mt-1', colors.text)}>
            {Math.round(percentage * 100)}% Complete
          </div>
        )}
      </div>
    </div>
  )
}

// Gauge Grid Component
export interface GaugeGridProps {
  gauges: Array<{
    label: string
    value: number
    min?: number
    max?: number
    variant?: GaugeProps['variant']
  }>
  columns?: 1 | 2 | 3 | 4
  size?: GaugeProps['size']
  className?: string
}

export const GaugeGrid: React.FC<GaugeGridProps> = ({
  gauges,
  columns = 3,
  size = 'md',
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
      'grid gap-8',
      gridCols[columns],
      className
    )}>
      {gauges.map((gauge, index) => (
        <Gauge
          key={index}
          label={gauge.label}
          value={gauge.value}
          min={gauge.min}
          max={gauge.max}
          variant={gauge.variant}
          size={size}
        />
      ))}
    </div>
  )
}

// Mini Gauge Component for inline use
export interface MiniGaugeProps {
  value: number
  min?: number
  max?: number
  variant?: GaugeProps['variant']
  className?: string
}

export const MiniGauge: React.FC<MiniGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  variant = 'default',
  className
}) => {
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1)
  const radius = 16
  const circumference = Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage * circumference)

  const variantColors = {
    default: 'stroke-primary-600',
    success: 'stroke-green-600',
    warning: 'stroke-yellow-600',
    error: 'stroke-red-600',
    info: 'stroke-accent-600'
  }

  return (
    <div className={cn('inline-flex items-center space-x-2', className)}>
      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32" aria-hidden="true">
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-gray-200"
          strokeWidth="2"
        />
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="currentColor"
          className={variantColors[variant]}
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray,
            strokeDashoffset
          }}
        />
      </svg>
      <span className="text-sm font-medium text-gray-700">
        {Math.round(percentage * 100)}%
      </span>
    </div>
  )
}
