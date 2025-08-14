import React from 'react'
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  logo?: React.ReactNode
  description?: string
  sections?: FooterSection[]
  contact?: {
    address?: string
    phone?: string
    email?: string
  }
  social?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  copyright?: string
  className?: string
  variant?: 'default' | 'minimal' | 'dark'
}

export const Footer: React.FC<FooterProps> = ({
  logo = <Leaf className="h-8 w-8 text-primary-600" />,
  description = "PaddySense is an intelligent farming decision platform that transforms traditional farming into data-driven agriculture through AI-powered recommendations.",
  sections = [],
  contact,
  social,
  copyright = "© 2025 PaddySense. All rights reserved.",
  className,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-gray-900 text-white',
    minimal: 'bg-white text-gray-900 border-t border-gray-200',
    dark: 'bg-gray-950 text-white'
  }

  const linkColors = {
    default: 'text-gray-300 hover:text-white',
    minimal: 'text-gray-600 hover:text-gray-900',
    dark: 'text-gray-400 hover:text-white'
  }

  const sectionTitleColors = {
    default: 'text-white',
    minimal: 'text-gray-900',
    dark: 'text-white'
  }

  const socialIconColors = {
    default: 'text-gray-400 hover:text-white',
    minimal: 'text-gray-500 hover:text-gray-900',
    dark: 'text-gray-400 hover:text-white'
  }

  const getSocialIcon = (platform: string, href: string) => {
    const iconProps = {
      className: cn('h-5 w-5 transition-colors duration-200', socialIconColors[variant]),
      'aria-label': `${platform} profile`
    }

    switch (platform) {
      case 'facebook':
        return <Facebook {...iconProps} />
      case 'twitter':
        return <Twitter {...iconProps} />
      case 'instagram':
        return <Instagram {...iconProps} />
      case 'linkedin':
        return <Linkedin {...iconProps} />
      case 'youtube':
        return <Youtube {...iconProps} />
      default:
        return null
    }
  }

  return (
    <footer
      className={cn(
        'w-full',
        variantClasses[variant],
        className
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {logo}
              <span className="text-xl font-bold">PaddySense</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              {description}
            </p>
            
            {/* Social Links */}
            {social && Object.keys(social).length > 0 && (
              <div className="flex space-x-4">
                {Object.entries(social).map(([platform, href]) => (
                  href && (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                      aria-label={`Visit our ${platform} page`}
                    >
                      {getSocialIcon(platform, href)}
                    </a>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className={cn(
                'text-sm font-semibold uppercase tracking-wider mb-4',
                sectionTitleColors[variant]
              )}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'text-sm transition-colors duration-200',
                        linkColors[variant]
                      )}
                      aria-label={link.external ? `${link.label} (opens in new tab)` : link.label}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          {contact && (
            <div>
              <h3 className={cn(
                'text-sm font-semibold uppercase tracking-wider mb-4',
                sectionTitleColors[variant]
              )}>
                Contact
              </h3>
              <div className="space-y-3">
                {contact.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-400">{contact.address}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={`Call us at ${contact.phone}`}
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={`Send us an email at ${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              {copyright}
            </p>
            
            {/* Additional Links */}
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Terms of Service"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Cookie Policy"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Simple Footer Component
export interface SimpleFooterProps {
  logo?: React.ReactNode
  copyright?: string
  className?: string
}

export const SimpleFooter: React.FC<SimpleFooterProps> = ({
  logo = <Leaf className="h-6 w-6 text-primary-600" />,
  copyright = "© 2025 PaddySense. All rights reserved.",
  className
}) => {
  return (
    <footer
      className={cn(
        'w-full bg-gray-50 border-t border-gray-200 py-8',
        className
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            {logo}
            <span className="text-lg font-semibold text-gray-900">PaddySense</span>
          </div>
          <p className="text-sm text-gray-600">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
