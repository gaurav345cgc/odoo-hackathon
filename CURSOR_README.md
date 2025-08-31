# TargetCursor Component

A custom React cursor component that provides an interactive, animated cursor experience with corner expansion on hover targets.

## Features

- **Custom Cursor**: Replaces the default browser cursor with a custom animated one
- **Corner Expansion**: Cursor corners expand to frame hover targets
- **Smooth Animations**: Powered by GSAP for fluid animations
- **Click Animations**: Visual feedback on mouse down/up events
- **Responsive**: Works across different screen sizes and devices
- **Customizable**: Configurable spin duration and cursor hiding

## Installation

The component requires GSAP for animations. It's already installed in this project:

```bash
npm install gsap
```

## Usage

### Basic Usage

```tsx
import TargetCursor from './components/TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `targetSelector` | `string` | `".cursor-target"` | CSS selector for elements that trigger cursor expansion |
| `spinDuration` | `number` | `2` | Duration in seconds for one complete rotation |
| `hideDefaultCursor` | `boolean` | `true` | Whether to hide the default browser cursor |

### Target Elements

To make an element interactive with the cursor, add the `cursor-target` class (or your custom selector):

```tsx
// These elements will trigger cursor expansion
<button className="cursor-target">Click me!</button>
<div className="cursor-target">Hover target</div>
<a className="cursor-target">Link</a>
```

## Demo

Visit `/cursor-demo` in your application to see the component in action with various interactive elements.

## How It Works

1. **Initialization**: Creates a custom cursor with a central dot and four corner elements
2. **Mouse Tracking**: Follows mouse movement with smooth animations
3. **Target Detection**: Detects when hovering over elements with the target class
4. **Corner Expansion**: Animates corners to frame the hover target
5. **Click Feedback**: Provides visual feedback on mouse interactions
6. **Cleanup**: Properly handles mouse leave events and restores default state

## Styling

The component uses Tailwind CSS classes and can be customized by modifying the component's JSX. The cursor has a high z-index (`z-[9999]`) to ensure it appears above other content.

## Browser Compatibility

- Modern browsers with ES6+ support
- Requires GSAP animation library
- Responsive design with CSS transforms

## Performance

- Uses `requestAnimationFrame` for smooth animations
- Implements throttling for mouse move events
- Optimized with `willChange: 'transform'` CSS property
- Efficient event cleanup on component unmount

## Troubleshooting

- **Cursor not visible**: Check if GSAP is properly installed
- **Targets not working**: Ensure elements have the correct CSS class
- **Performance issues**: Consider reducing animation complexity or duration
- **Z-index conflicts**: The cursor uses `z-[9999]`, adjust if needed
