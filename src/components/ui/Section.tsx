import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps {
  title?: string
  subtitle?: string
  description?: string
  children: React.ReactNode
  className?: string
  container?: boolean
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'light' | 'dark' | 'primary' | 'accent'
  variant?: 'default' | 'centered' | 'split'
  headerSpacing?: 'none' | 'sm' | 'md' | 'lg'
  footer?: React.ReactNode
  id?: string
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  container = true,
  spacing = 'lg',
  background = 'default',
  variant = 'default',
  headerSpacing = 'md',
  footer,
  id
}) => {
  const spacingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24'
  }

  const headerSpacingClasses = {
    none: '',
    sm: 'mb-6',
    md: 'mb-8',
    lg: 'mb-12',
    xl: 'mb-16'
  }

  const backgroundClasses = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    primary: 'bg-primary-50',
    accent: 'bg-accent-50'
  }

  const textColors = {
    default: 'text-gray-900',
    light: 'text-gray-900',
    dark: 'text-white',
    primary: 'text-gray-900',
    accent: 'text-gray-900'
  }

  const subtitleColors = {
    default: 'text-primary-600',
    light: 'text-primary-600',
    dark: 'text-primary-400',
    primary: 'text-primary-700',
    accent: 'text-accent-700'
  }

  const descriptionColors = {
    default: 'text-gray-600',
    light: 'text-gray-600',
    dark: 'text-gray-300',
    primary: 'text-gray-700',
    accent: 'text-gray-700'
  }

  const ContentWrapper = container ? 'div' : React.Fragment
  const contentProps = container ? { className: 'container mx-auto px-4 sm:px-6 lg:px-8' } : {}

  return (
    <section
      id={id}
      className={cn(
        'w-full',
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      role="region"
      aria-labelledby={title ? `${id || 'section'}-title` : undefined}
    >
      <ContentWrapper {...contentProps}>
        {/* Header */}
        {(title || subtitle || description) && (
          <div className={cn(
            'mb-8',
            headerSpacingClasses[headerSpacing],
            variant === 'centered' && 'text-center max-w-3xl mx-auto',
            variant === 'split' && 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center'
          )}>
            <div className={variant === 'split' ? 'lg:order-1' : ''}>
              {subtitle && (
                <p className={cn(
                  'text-sm font-semibold uppercase tracking-wide mb-2',
                  subtitleColors[background]
                )}>
                  {subtitle}
                </p>
              )}
              
              {title && (
                <h2
                  id={`${id || 'section'}-title`}
                  className={cn(
                    'text-display-2 lg:text-display-1 font-bold mb-4',
                    textColors[background]
                  )}
                >
                  {title}
                </h2>
              )}
              
              {description && (
                <p className={cn(
                  'text-lg lg:text-xl',
                  descriptionColors[background],
                  variant === 'centered' && 'mx-auto'
                )}>
                  {description}
                </p>
              )}
            </div>

            {variant === 'split' && (
              <div className="lg:order-2 mt-8 lg:mt-0">
                {/* Placeholder for split content */}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={variant === 'split' ? 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start' : ''}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            {footer}
          </div>
        )}
      </ContentWrapper>
    </section>
  )
}

// Section Header Component
export interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  action?: React.ReactNode
  variant?: 'default' | 'centered' | 'split'
  className?: string
  id?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  action,
  variant = 'default',
  className,
  id
}) => {
  return (
    <div className={cn(
      'mb-8',
      variant === 'centered' && 'text-center max-w-3xl mx-auto',
      variant === 'split' && 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center',
      className
    )}>
      <div className={variant === 'split' ? 'lg:order-1' : ''}>
        {subtitle && (
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 mb-2">
            {subtitle}
          </p>
        )}
        
        <h2
          id={id || 'section-title'}
          className="text-display-2 lg:text-display-1 font-bold text-gray-900 mb-4"
        >
          {title}
        </h2>
        
        {description && (
          <p className={cn(
            'text-lg lg:text-xl text-gray-600',
            variant === 'centered' && 'mx-auto'
          )}>
            {description}
          </p>
        )}
      </div>

      {action && variant === 'split' && (
        <div className="lg:order-2 mt-8 lg:mt-0 flex justify-end">
          {action}
        </div>
      )}

      {action && variant !== 'split' && (
        <div className="mt-6 flex justify-center sm:justify-start">
          {action}
        </div>
      )}
    </div>
  )
}

// Section Content Component
export interface SectionContentProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'split'
}

export const SectionContent: React.FC<SectionContentProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  return (
    <div className={cn(
      variant === 'split' ? 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start' : '',
      className
    )}>
      {children}
    </div>
  )
}

// Section Footer Component
export interface SectionFooterProps {
  children: React.ReactNode
  className?: string
  border?: boolean
}

export const SectionFooter: React.FC<SectionFooterProps> = ({
  children,
  className,
  border = true
}) => {
  return (
    <div className={cn(
      'mt-12 pt-8',
      border && 'border-t border-gray-200',
      className
    )}>
      {children}
    </div>
  )
}
