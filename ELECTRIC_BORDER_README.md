# ElectricBorder Component

A beautiful, animated glowing border component that creates electric/neon-like effects around any content. Perfect for highlighting important cards, achievements, or interactive elements.

## ✨ Features

- **Animated Glowing Borders**: Dynamic, flowing border animations
- **Customizable Colors**: Any color you want for the border effect
- **Adjustable Speed**: Control how fast the animation flows
- **Chaos Control**: Adjust the randomness and intensity of the effect
- **Thickness Options**: Customize border thickness
- **Responsive**: Automatically adapts to content size changes
- **Performance Optimized**: Uses SVG filters and CSS for smooth animations

## 🚀 Installation

The component is already included in your project at:
```
src/components/ui/ElectricBorder.tsx
src/components/ui/ElectricBorder.css
```

## 📖 Usage

### Basic Usage

```tsx
import ElectricBorder from '@/components/ui/ElectricBorder';

<ElectricBorder>
  <div>Your content here</div>
</ElectricBorder>
```

### With Custom Properties

```tsx
<ElectricBorder
  color="#7df9ff"
  speed={1}
  chaos={0.5}
  thickness={2}
  style={{ borderRadius: 16 }}
>
  <div>Custom styled content</div>
</ElectricBorder>
```

### Integration with Cards

```tsx
<ElectricBorder color="#10b981" speed={1.5} thickness={3}>
  <Card className="your-card-classes">
    <CardContent>
      <h3>Your Card Title</h3>
      <p>Card content here</p>
    </CardContent>
  </Card>
</ElectricBorder>
```

## 🎛️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `"#5227FF"` | Border color (hex, rgb, or any valid CSS color) |
| `speed` | `number` | `1` | Animation speed (0.1 = slow, 3 = fast) |
| `chaos` | `number` | `1` | Randomness intensity (0 = smooth, 2 = chaotic) |
| `thickness` | `number` | `2` | Border thickness in pixels |
| `className` | `string` | `undefined` | Additional CSS classes |
| `style` | `CSSProperties` | `undefined` | Additional inline styles |
| `children` | `ReactNode` | `required` | Content to wrap with the border |

## 🎨 Color Examples

### Study Streak (Cyan)
```tsx
<ElectricBorder color="#7df9ff" speed={1} chaos={0.5}>
  <div>Study Streak Card</div>
</ElectricBorder>
```

### Success (Green)
```tsx
<ElectricBorder color="#10b981" speed={1.5} chaos={0.3}>
  <div>Achievement Card</div>
</ElectricBorder>
```

### Warning (Yellow)
```tsx
<ElectricBorder color="#f59e0b" speed={0.8} chaos={0.7}>
  <div>Alert Card</div>
</ElectricBorder>
```

### Danger (Red)
```tsx
<ElectricBorder color="#ef4444" speed={2} chaos={0.9}>
  <div>Important Notice</div>
</ElectricBorder>
```

### Premium (Purple)
```tsx
<ElectricBorder color="#8b5cf6" speed={1.2} chaos={0.6}>
  <div>VIP Content</div>
</ElectricBorder>
```

## 🔧 Customization Tips

### Speed Values
- `0.1` - Very slow, subtle movement
- `0.5` - Slow, gentle flow
- `1.0` - Normal speed (default)
- `1.5` - Fast, energetic
- `2.0` - Very fast, intense

### Chaos Values
- `0.0` - Smooth, consistent flow
- `0.3` - Slight variation
- `0.5` - Moderate randomness
- `0.7` - High variation
- `1.0` - Maximum chaos

### Thickness Values
- `1` - Thin, subtle border
- `2` - Standard thickness (default)
- `3` - Thick, prominent
- `4` - Very thick, bold

## 🎯 Use Cases

### 1. Achievement Cards
```tsx
<ElectricBorder color="#fbbf24" speed={1.2} chaos={0.4}>
  <Card className="achievement-card">
    <CardContent>
      <Trophy className="h-8 w-8 text-yellow-500" />
      <h3>Streak Master</h3>
      <p>7 days in a row!</p>
    </CardContent>
  </Card>
</ElectricBorder>
```

### 2. Important Notifications
```tsx
<ElectricBorder color="#ef4444" speed={2} chaos={0.8}>
  <div className="alert-notification">
    <h3>🚨 Important Update</h3>
    <p>New features available!</p>
  </div>
</ElectricBorder>
```

### 3. Interactive Elements
```tsx
<ElectricBorder color="#8b5cf6" speed={1} chaos={0.3}>
  <button className="premium-button">
    Upgrade to Pro
  </button>
</ElectricBorder>
```

### 4. Progress Indicators
```tsx
<ElectricBorder color="#10b981" speed={0.8} chaos={0.2}>
  <div className="progress-card">
    <h3>Goal Progress</h3>
    <Progress value={75} />
  </div>
</ElectricBorder>
```

## 🎨 Styling Integration

### With Tailwind CSS
```tsx
<ElectricBorder 
  color="#7df9ff" 
  style={{ borderRadius: '16px' }}
>
  <div className="p-6 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl text-center">
    <h3 className="text-xl font-semibold text-white">Your Content</h3>
  </div>
</ElectricBorder>
```

### With Custom CSS
```tsx
<ElectricBorder color="#10b981">
  <div className="custom-card">
    <h3>Custom Styled Card</h3>
  </div>
</ElectricBorder>
```

## 🚀 Performance Considerations

- The component uses SVG filters which are hardware-accelerated
- Animations are optimized with `requestAnimationFrame`
- ResizeObserver automatically adjusts to content changes
- Minimal DOM manipulation for smooth performance

## 🔍 Demo

Visit `/cursor-demo` to see the ElectricBorder in action with various configurations and examples.

## 📝 Notes

- The component automatically inherits border-radius from its children
- Works best with cards and content that have defined dimensions
- The glowing effect extends slightly beyond the content bounds
- Compatible with all modern browsers that support SVG filters

## 🎉 Result

Your study tracker card now has a beautiful, animated cyan glowing border that:
- **Pulsates with energy** - matching the study streak theme
- **Draws attention** - making achievements more prominent
- **Enhances UX** - creates a premium, engaging feel
- **Maintains functionality** - all existing features work perfectly

The ElectricBorder transforms your streak tracker from a simple card into an **eye-catching, premium component** that users will love to interact with! 🎯✨
