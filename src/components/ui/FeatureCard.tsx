import React from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FeatureCardProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href?: string
  external?: boolean
  badge?: string
  variant?: 'default' | 'elevated' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  href,
  external = false,
  badge,
  variant = 'default',
  size = 'md',
  className,
  onClick
}) => {
  const isClickable = href || onClick

  const CardWrapper = isClickable ? 'div' : 'div'
  const cardProps = isClickable ? {
    role: 'button',
    tabIndex: 0,
    onClick: onClick || (href ? () => window.open(href, external ? '_blank' : '_self') : undefined),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick?.() || (href ? window.open(href, external ? '_blank' : '_self') : undefined)
      }
    }
  } : {}

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const variantClasses = {
    default: 'bg-white border border-gray-200 hover:border-primary-200',
    elevated: 'bg-white shadow-soft hover:shadow-soft-lg border-0',
    outlined: 'bg-transparent border-2 border-gray-200 hover:border-primary-300'
  }

  return (
    <CardWrapper
      className={cn(
        'group relative rounded-2xl transition-all duration-200 cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        isClickable && 'hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        className
      )}
      {...cardProps}
      aria-label={isClickable ? `${title} - ${description}` : undefined}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-2 -right-2">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
            {badge}
          </span>
        </div>
      )}

      {/* Icon */}
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors duration-200">
          <Icon className="h-6 w-6" />
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-heading-1 font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-body text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Indicator */}
      {isClickable && (
        <div className="mt-6 flex items-center text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
          <span className="text-sm font-medium">
            {external ? 'Learn more' : 'View details'}
          </span>
          {external ? (
            <ExternalLink className="ml-2 h-4 w-4" />
          ) : (
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          )}
        </div>
      )}

      {/* Hover Effect Overlay */}
      {isClickable && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      )}
    </CardWrapper>
  )
}

// Feature Grid Component
export interface FeatureGridProps {
  features: FeatureCardProps[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  className
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={cn(
      'grid gap-6 lg:gap-8',
      gridCols[columns],
      className
    )}>
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  )
}
