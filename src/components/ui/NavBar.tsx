import React, { useState } from 'react'
import { Menu, X, Leaf, User, BarChart3, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
}

export interface NavBarProps {
  logo?: React.ReactNode
  items?: NavItem[]
  userMenu?: {
    name: string
    email: string
    avatar?: string
    menuItems: Array<{
      label: string
      icon?: React.ComponentType<{ className?: string }>
      onClick: () => void
    }>
  }
  className?: string
  variant?: 'default' | 'transparent'
}

export const NavBar: React.FC<NavBarProps> = ({
  logo = <Leaf className="h-8 w-8 text-primary-600" />,
  items = [],
  userMenu,
  className,
  variant = 'default'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60',
        variant === 'transparent' && 'bg-transparent border-transparent',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
              aria-label="PaddySense Home"
            >
              {logo}
              <span className="hidden sm:inline-block">PaddySense</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group relative flex items-center space-x-1 text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
                aria-label={item.label}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                    {item.badge}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* User Menu */}
          {userMenu && (
            <div className="hidden md:relative md:block">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 rounded-2xl p-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                {userMenu.avatar ? (
                  <img
                    src={userMenu.avatar}
                    alt={userMenu.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <span className="hidden lg:inline-block">{userMenu.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white py-2 shadow-soft-lg border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userMenu.name}</p>
                    <p className="text-sm text-gray-500">{userMenu.email}</p>
                  </div>
                  {userMenu.menuItems.map((menuItem, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        menuItem.onClick()
                        setIsUserMenuOpen(false)
                      }}
                      className="flex w-full items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      {menuItem.icon && <menuItem.icon className="h-4 w-4" />}
                      <span>{menuItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-2xl p-2 text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-2 rounded-2xl px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Mobile User Menu */}
            {userMenu && (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center space-x-3 px-3 py-2">
                  {userMenu.avatar ? (
                    <img
                      src={userMenu.avatar}
                      alt={userMenu.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{userMenu.name}</p>
                    <p className="text-sm text-gray-500">{userMenu.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {userMenu.menuItems.map((menuItem, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        menuItem.onClick()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex w-full items-center space-x-3 rounded-2xl px-3 py-2 text-base text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      {menuItem.icon && <menuItem.icon className="h-5 w-5" />}
                      <span>{menuItem.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
