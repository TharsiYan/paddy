import React, { useState } from 'react'
import { 
  NavBar, 
  Hero, 
  FeatureCard, 
  FeatureGrid,
  StatCard, 
  StatGrid,
  Gauge, 
  GaugeGrid,
  KPI, 
  KPIGrid,
  Section, 
  Footer 
} from '@/components/ui'
import { 
  Leaf, 
  BarChart3, 
  Cloud, 
  Droplets, 
  Thermometer, 
  Sun,
  TrendingUp,
  Users,
  DollarSign,
  Target
} from 'lucide-react'

const DemoPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/', icon: Leaf },
    { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { label: 'Features', href: '/features', icon: Cloud },
    { label: 'About', href: '/about', icon: Users }
  ]

  const userMenu = {
    name: 'John Farmer',
    email: 'john@paddysense.com',
    menuItems: [
      { label: 'Profile', icon: Users, onClick: () => console.log('Profile clicked') },
      { label: 'Settings', icon: BarChart3, onClick: () => console.log('Settings clicked') },
      { label: 'Sign Out', icon: Leaf, onClick: () => console.log('Sign out clicked') }
    ]
  }

  const heroStats = [
    { value: '10K+', label: 'Active Farmers', icon: Users },
    { value: '95%', label: 'Success Rate', icon: Target },
    { value: '$2.5M', label: 'Revenue Generated', icon: DollarSign },
    { value: '24/7', label: 'Support Available', icon: Sun }
  ]

  const features = [
    {
      icon: Leaf,
      title: 'Crop Monitoring',
      description: 'Real-time tracking of crop health and growth with AI-powered insights.',
      href: '/features/crop-monitoring',
      badge: 'New'
    },
    {
      icon: Cloud,
      title: 'Weather Intelligence',
      description: 'Accurate weather forecasts and recommendations for optimal farming decisions.',
      href: '/features/weather',
      variant: 'elevated'
    },
    {
      icon: Droplets,
      title: 'Irrigation Management',
      description: 'Smart water scheduling based on soil moisture and weather conditions.',
      href: '/features/irrigation'
    },
    {
      icon: Thermometer,
      title: 'Soil Analytics',
      description: 'Comprehensive soil health monitoring and nutrient recommendations.',
      href: '/features/soil',
      variant: 'outlined'
    }
  ]

  const stats = [
    {
      title: 'Total Crops',
      value: 1,247,
      change: { value: 12, period: 'last month', trend: 'up' as const },
      icon: Leaf,
      description: 'Active crop monitoring'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: { value: 8.2, period: 'last month', trend: 'up' as const },
      icon: DollarSign,
      description: 'Monthly earnings'
    },
    {
      title: 'Efficiency',
      value: '94.2%',
      change: { value: 2.1, period: 'last month', trend: 'up' as const },
      icon: Target,
      description: 'Resource utilization'
    },
    {
      title: 'Water Usage',
      value: '2,340L',
      change: { value: 5.3, period: 'last month', trend: 'down' as const },
      icon: Droplets,
      description: 'Daily consumption'
    }
  ]

  const gauges = [
    { label: 'Crop Health', value: 85, variant: 'success' as const },
    { label: 'Soil Moisture', value: 60, variant: 'warning' as const },
    { label: 'Temperature', value: 72, variant: 'info' as const },
    { label: 'Humidity', value: 45, variant: 'error' as const }
  ]

  const kpis = [
    {
      title: 'Yield Prediction',
      value: '2.4 tons',
      status: 'success' as const,
      icon: Target,
      description: 'Expected harvest this season',
      target: { value: 2.5, label: 'tons' }
    },
    {
      title: 'Disease Risk',
      value: 'Low',
      status: 'success' as const,
      icon: Leaf,
      description: 'Current disease probability'
    },
    {
      title: 'Fertilizer Need',
      value: 'High',
      status: 'warning' as const,
      icon: Droplets,
      description: 'Nitrogen application required'
    },
    {
      title: 'Market Price',
      value: '$0.85',
      status: 'info' as const,
      icon: DollarSign,
      description: 'Current rice price per kg'
    }
  ]

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'API', href: '/api' },
        { label: 'Documentation', href: '/docs' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status' },
        { label: 'Contact Support', href: '/support' }
      ]
    }
  ]

  const footerContact = {
    address: '123 Agriculture Street, Farming District, City 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@paddysense.com'
  }

  const footerSocial = {
    facebook: 'https://facebook.com/paddysense',
    twitter: 'https://twitter.com/paddysense',
    instagram: 'https://instagram.com/paddysense',
    linkedin: 'https://linkedin.com/company/paddysense'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <NavBar
        items={navItems}
        userMenu={userMenu}
        variant="default"
      />

      {/* Hero Section */}
      <Hero
        title="Transform Your Farming with AI-Powered Insights"
        subtitle="Featured Platform"
        description="PaddySense combines cutting-edge technology with traditional farming wisdom to help you make data-driven decisions, optimize resources, and maximize yields."
        primaryAction={{
          label: 'Get Started',
          href: '/signup'
        }}
        secondaryAction={{
          label: 'Watch Demo',
          href: '#'
        }}
        videoAction={{
          label: 'Play Video',
          onClick: () => setIsVideoModalOpen(true)
        }}
        stats={heroStats}
        backgroundGradient={true}
      />

      {/* Features Section */}
      <Section
        title="Powerful Features for Modern Farming"
        subtitle="What We Offer"
        description="Discover the tools and insights that will revolutionize your agricultural practices and boost your productivity."
        background="light"
        variant="centered"
      >
        <FeatureGrid features={features} columns={4} />
      </Section>

      {/* Stats Section */}
      <Section
        title="Real-Time Performance Metrics"
        subtitle="Live Data"
        description="Monitor your farm's performance with comprehensive analytics and real-time insights."
        background="default"
      >
        <StatGrid stats={stats} columns={4} />
      </Section>

      {/* Gauges Section */}
      <Section
        title="Current Farm Status"
        subtitle="Live Monitoring"
        description="Track key metrics with our intuitive gauge displays and get instant insights into your farm's health."
        background="primary"
        variant="centered"
      >
        <GaugeGrid gauges={gauges} columns={4} size="lg" />
      </Section>

      {/* KPI Section */}
      <Section
        title="Key Performance Indicators"
        subtitle="Smart Insights"
        description="Get actionable insights with our AI-powered KPI system that helps you make informed farming decisions."
        background="default"
      >
        <KPIGrid kpis={kpis} columns={4} />
      </Section>

      {/* Component Showcase Section */}
      <Section
        title="Component Library"
        subtitle="Design System"
        description="Explore our comprehensive collection of reusable UI components built with accessibility and performance in mind."
        background="light"
      >
        <div className="space-y-12">
          {/* Individual Components */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Individual Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Sample Stat"
                value="1,234"
                change={{ value: 15, period: 'this month', trend: 'up' }}
                icon={TrendingUp}
                variant="elevated"
              />
              <KPI
                title="Sample KPI"
                value="85%"
                status="success"
                icon={Target}
                description="Performance indicator"
              />
              <Gauge
                value={75}
                label="Sample Gauge"
                variant="success"
                size="md"
              />
            </div>
          </div>

          {/* Feature Cards */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Feature Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                icon={Leaf}
                title="Sample Feature"
                description="This is a sample feature card to demonstrate the component's capabilities and styling."
                variant="elevated"
                size="lg"
              />
              <FeatureCard
                icon={Cloud}
                title="Another Feature"
                description="Another sample feature card with different styling and layout options."
                variant="outlined"
                size="lg"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Footer
        sections={footerSections}
        contact={footerContact}
        social={footerSocial}
        variant="default"
      />

      {/* Video Modal (simplified) */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-2xl mx-4">
            <h3 className="text-xl font-semibold mb-4">Demo Video</h3>
            <p className="text-gray-600 mb-6">
              This would be an embedded video player showing the PaddySense platform in action.
            </p>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DemoPage
