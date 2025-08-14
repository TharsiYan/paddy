import React from 'react'
import { ArrowRight, Play, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  primaryAction?: {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }
  secondaryAction?: {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }
  videoAction?: {
    label: string
    onClick: () => void
  }
  stats?: Array<{
    value: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
  }>
  rating?: {
    score: number
    count: number
    label?: string
  }
  backgroundImage?: string
  backgroundGradient?: boolean
  className?: string
  variant?: 'default' | 'centered' | 'split'
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  videoAction,
  stats,
  rating,
  backgroundImage,
  backgroundGradient = true,
  className,
  variant = 'default'
}) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        backgroundImage && 'bg-cover bg-center bg-no-repeat',
        className
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Background Overlay */}
      {backgroundGradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-primary-800/10 to-transparent" />
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'py-20 lg:py-32',
          variant === 'centered' && 'text-center',
          variant === 'split' && 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center'
        )}>
          {/* Content */}
          <div className={cn(
            'max-w-4xl',
            variant === 'centered' && 'mx-auto',
            variant === 'split' && 'lg:order-1'
          )}>
            {subtitle && (
              <p className="inline-flex items-center rounded-2xl bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 mb-6">
                <Star className="h-4 w-4 mr-2" />
                {subtitle}
              </p>
            )}
            
            <h1
              id="hero-title"
              className={cn(
                'text-display-1 lg:text-display-1 xl:text-5xl font-bold text-gray-900 mb-6',
                variant === 'centered' && 'mx-auto',
                backgroundImage && 'text-white'
              )}
            >
              {title}
            </h1>
            
            {description && (
              <p className={cn(
                'text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl',
                variant === 'centered' && 'mx-auto',
                backgroundImage && 'text-gray-100'
              )}>
                {description}
              </p>
            )}

            {/* Actions */}
            <div className={cn(
              'flex flex-col sm:flex-row gap-4',
              variant === 'centered' && 'justify-center'
            )}>
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-soft-lg transition-all duration-200 hover:bg-primary-700 hover:shadow-soft-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={primaryAction.label}
                >
                  {primaryAction.label}
                  {primaryAction.icon ? (
                    <primaryAction.icon className="ml-2 h-5 w-5" />
                  ) : (
                    <ArrowRight className="ml-2 h-5 w-5" />
                  )}
                </a>
              )}

              {secondaryAction && (
                <a
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-soft transition-all duration-200 hover:bg-gray-50 hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={secondaryAction.label}
                >
                  {secondaryAction.label}
                  {secondaryAction.icon && <secondaryAction.icon className="ml-2 h-5 w-5" />}
                </a>
              )}

              {videoAction && (
                <button
                  onClick={videoAction.onClick}
                  className="inline-flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm px-8 py-4 text-base font-semibold text-gray-700 shadow-soft transition-all duration-200 hover:bg-white hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={videoAction.label}
                >
                  <Play className="mr-2 h-5 w-5" />
                  {videoAction.label}
                </button>
              )}
            </div>

            {/* Rating */}
            {rating && (
              <div className="mt-8 flex items-center justify-center sm:justify-start">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(rating.score) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-gray-600">
                  <span className="font-semibold">{rating.score}</span>
                  <span className="text-gray-500">/5</span>
                  <span className="text-gray-500 ml-1">({rating.count} reviews)</span>
                </span>
                {rating.label && (
                  <span className="ml-3 text-sm font-medium text-primary-600">{rating.label}</span>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className={cn(
              'mt-12 lg:mt-0',
              variant === 'split' && 'lg:order-2',
              variant === 'centered' && 'grid grid-cols-2 lg:grid-cols-4 gap-6'
            )}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    'text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft border border-white/20',
                    variant === 'split' && 'mb-6'
                  )}
                >
                  {stat.icon && (
                    <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                  )}
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
