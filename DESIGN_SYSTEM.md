# 🎨 PaddySense Design System

A comprehensive design system built with **Tailwind CSS**, **shadcn/ui patterns**, and **Lucide React icons** for the PaddySense AI-powered farming platform.

## 🚀 Features

- **Modern Design**: Clean, professional interface optimized for farming applications
- **Accessibility First**: Built with ARIA labels and semantic HTML
- **Responsive**: Mobile-first design that works on all devices
- **TypeScript**: Fully typed components with comprehensive interfaces
- **Customizable**: Flexible props and variants for different use cases
- **Performance**: Optimized components with minimal bundle impact

## 🎯 Design Tokens

### Colors
- **Primary**: Emerald/Green (`#10b981`) - Farming, growth, success
- **Neutral**: Gray scale (`#f9fafb` to `#111827`) - Text, backgrounds, borders
- **Accent**: Sky Blue (`#0ea5e9`) - Information, links, highlights

### Typography
- **Display 1**: 30px - Main headlines
- **Display 2**: 24px - Section headers
- **Heading 1**: 18px - Subsection titles
- **Heading 2**: 16px - Card titles
- **Body**: 14px - Regular text

### Spacing & Layout
- **Border Radius**: `rounded-2xl` (1rem) - Soft, modern corners
- **Shadows**: Soft shadows with subtle depth
- **Spacing**: Consistent 4px grid system
- **Container**: Responsive max-width with padding

## 🧩 Component Library

### Core Components

#### 1. **NavBar** - Navigation Component
```tsx
<NavBar
  items={navigationItems}
  userMenu={userProfile}
  variant="default"
/>
```

**Props:**
- `items`: Navigation menu items with icons and badges
- `userMenu`: User profile dropdown with actions
- `variant`: `default` | `transparent`
- `className`: Custom styling

**Features:**
- Responsive mobile menu
- User authentication dropdown
- Badge support for notifications
- Smooth hover animations

#### 2. **Hero** - Landing Section
```tsx
<Hero
  title="Transform Your Farming"
  subtitle="AI-Powered Platform"
  description="Smart agriculture solutions"
  primaryAction={{ label: "Get Started", href: "/signup" }}
  stats={performanceMetrics}
  variant="centered"
/>
```

**Props:**
- `title`: Main headline
- `subtitle`: Secondary text
- `description`: Detailed explanation
- `primaryAction`/`secondaryAction`: Call-to-action buttons
- `videoAction`: Video player trigger
- `stats`: Key metrics display
- `variant`: `default` | `centered` | `split`

**Features:**
- Multiple layout variants
- Background image support
- Statistics display
- Video integration
- Rating system

#### 3. **FeatureCard** - Feature Showcase
```tsx
<FeatureCard
  icon={Leaf}
  title="Crop Monitoring"
  description="Real-time insights"
  href="/features/monitoring"
  badge="New"
  variant="elevated"
  size="lg"
/>
```

**Props:**
- `icon`: Lucide React icon component
- `title`: Feature name
- `description`: Feature explanation
- `href`: Link destination
- `badge`: Optional status badge
- `variant`: `default` | `elevated` | `outlined`
- `size`: `sm` | `md` | `lg`

**Features:**
- Interactive hover effects
- Badge system
- Multiple visual variants
- Responsive sizing

#### 4. **StatCard** - Data Display
```tsx
<StatCard
  title="Total Crops"
  value="1,247"
  change={{ value: 12, period: "last month", trend: "up" }}
  icon={TrendingUp}
  variant="elevated"
/>
```

**Props:**
- `title`: Metric name
- `value`: Current value
- `change`: Trend information
- `icon`: Visual indicator
- `variant`: `default` | `primary` | `success` | `warning` | `error`
- `size`: `sm` | `md` | `lg`

**Features:**
- Trend indicators (up/down/neutral)
- Color-coded variants
- Loading states
- Responsive layouts

#### 5. **Gauge** - Progress Visualization
```tsx
<Gauge
  value={85}
  label="Crop Health"
  variant="success"
  size="lg"
  animated={true}
/>
```

**Props:**
- `value`: Current value (0-100)
- `min`/`max`: Value range
- `label`: Display text
- `variant`: `default` | `success` | `warning` | `error` | `info`
- `size`: `sm` | `md` | `lg` | `xl`
- `animated`: Smooth transitions

**Features:**
- Circular progress visualization
- Multiple size options
- Color-coded status
- Smooth animations
- Mini gauge variant

#### 6. **KPI** - Key Performance Indicator
```tsx
<KPI
  title="Yield Prediction"
  value="2.4 tons"
  status="success"
  icon={Target}
  description="Expected harvest"
  target={{ value: 2.5, label: "tons" }}
/>
```

**Props:**
- `title`: KPI name
- `value`: Current value
- `status`: `success` | `warning` | `error` | `info` | `neutral`
- `icon`: Visual representation
- `description`: Additional context
- `target`: Goal comparison
- `onClick`: Interactive behavior

**Features:**
- Status-based styling
- Target comparison
- Interactive variants
- Loading states

#### 7. **Section** - Content Container
```tsx
<Section
  title="Features"
  subtitle="What We Offer"
  description="Discover our tools"
  background="light"
  variant="centered"
  spacing="lg"
>
  <FeatureGrid features={features} />
</Section>
```

**Props:**
- `title`: Section headline
- `subtitle`: Section category
- `description`: Section explanation
- `background`: `default` | `light` | `dark` | `primary` | `accent`
- `variant`: `default` | `centered` | `split`
- `spacing`: `none` | `sm` | `md` | `lg` | `xl`

**Features:**
- Multiple background options
- Layout variants
- Flexible spacing
- Semantic structure

#### 8. **Footer** - Site Footer
```tsx
<Footer
  sections={navigationSections}
  contact={contactInfo}
  social={socialLinks}
  variant="default"
/>
```

**Props:**
- `sections`: Navigation groupings
- `contact`: Contact information
- `social`: Social media links
- `variant`: `default` | `minimal` | `dark`

**Features:**
- Multiple footer styles
- Social media integration
- Contact information
- Legal links

### Grid Components

#### **FeatureGrid** - Feature Layout
```tsx
<FeatureGrid
  features={featureList}
  columns={3}
  className="custom-styling"
/>
```

#### **StatGrid** - Statistics Layout
```tsx
<StatGrid
  stats={statistics}
  columns={4}
  size="md"
/>
```

#### **GaugeGrid** - Gauge Layout
```tsx
<GaugeGrid
  gauges={gaugeData}
  columns={3}
  size="lg"
/>
```

#### **KPIGrid** - KPI Layout
```tsx
<KPIGrid
  kpis={kpiData}
  columns={4}
  variant="elevated"
/>
```

## 🎨 Usage Examples

### Basic Page Structure
```tsx
import { NavBar, Hero, Section, Footer } from '@/components/ui'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar items={navItems} userMenu={userProfile} />
      
      <Hero
        title="Welcome to PaddySense"
        description="AI-powered farming solutions"
        primaryAction={{ label: "Get Started", href: "/signup" }}
      />
      
      <Section title="Features" background="light">
        <FeatureGrid features={features} columns={3} />
      </Section>
      
      <Footer sections={footerSections} />
    </div>
  )
}
```

### Dashboard Layout
```tsx
import { StatGrid, GaugeGrid, KPIGrid } from '@/components/ui'

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <StatGrid stats={overviewStats} columns={4} />
      <GaugeGrid gauges={healthMetrics} columns={4} />
      <KPIGrid kpis={performanceIndicators} columns={3} />
    </div>
  )
}
```

### Custom Styling
```tsx
<FeatureCard
  className="custom-card-styles"
  variant="elevated"
  size="lg"
  icon={CustomIcon}
  title="Custom Feature"
  description="With custom styling"
/>
```

## 🔧 Customization

### Theme Overrides
```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Custom primary colors
          500: '#custom-green',
          600: '#custom-green-dark',
        }
      }
    }
  }
}
```

### Component Variants
```tsx
// Add new variants to components
const customVariants = {
  custom: 'bg-custom-color border-custom-border',
  // ... more variants
}
```

### CSS Custom Properties
```css
:root {
  --primary: 160 84% 39%;
  --accent: 199 89% 48%;
  --radius: 0.5rem;
}
```

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive screen reader support
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG AA compliant color combinations
- **Screen Reader**: Optimized for assistive technologies

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Standard Tailwind breakpoints
- **Flexible Layouts**: Adaptive grid systems
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Optimized for mobile performance

## 🚀 Performance

- **Tree Shaking**: Only import what you need
- **Lazy Loading**: Components load when needed
- **Optimized Bundles**: Minimal JavaScript overhead
- **CSS Optimization**: Efficient Tailwind classes
- **Icon Optimization**: Lucide React icon system

## 🧪 Testing

### Component Testing
```tsx
import { render, screen } from '@testing-library/react'
import { NavBar } from '@/components/ui'

test('NavBar renders navigation items', () => {
  const items = [{ label: 'Home', href: '/' }]
  render(<NavBar items={items} />)
  
  expect(screen.getByText('Home')).toBeInTheDocument()
})
```

### Accessibility Testing
```tsx
import { axe, toHaveNoViolations } from 'jest-axe'

test('NavBar meets accessibility standards', async () => {
  const { container } = render(<NavBar items={items} />)
  const results = await axe(container)
  
  expect(results).toHaveNoViolations()
})
```

## 📚 Storybook Integration

```bash
# Install Storybook
npm install -D @storybook/react @storybook/addon-essentials

# Run Storybook
npm run storybook
```

### Story Example
```tsx
// stories/NavBar.stories.tsx
import { NavBar } from '@/components/ui'

export default {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = () => (
  <NavBar
    items={[
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' }
    ]}
  />
)
```

## 🔄 Migration Guide

### From Bootstrap
```tsx
// Old Bootstrap
<div className="card">
  <div className="card-body">
    <h5 className="card-title">Title</h5>
  </div>
</div>

// New Design System
<FeatureCard
  title="Title"
  description="Description"
  variant="default"
/>
```

### From Custom CSS
```tsx
// Old custom styling
<div className="custom-button custom-primary">
  Click me
</div>

// New Design System
<button className="btn-primary">
  Click me
</button>
```

## 🤝 Contributing

### Component Development
1. Follow TypeScript interfaces
2. Include accessibility features
3. Add comprehensive props
4. Write unit tests
5. Document with examples

### Design Tokens
1. Use established color palette
2. Follow typography scale
3. Maintain spacing consistency
4. Update design system docs

## 📖 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/icons)
- [shadcn/ui Patterns](https://ui.shadcn.com)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design System Best Practices](https://www.designsystems.com/)

## 📄 License

This design system is part of the PaddySense project and follows the same licensing terms.

---

**Built with ❤️ for the farming community**

*PaddySense Design System - Transforming Agriculture Through Design*
