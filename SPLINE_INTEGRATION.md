# Spline Integration Guide

This document explains how to use Spline 3D elements in the SkillLink application.

## What is Spline?

[Spline](https://spline.design) is a 3D design tool that makes it easy to create interactive 3D experiences for the web. It provides a visual editor where you can create 3D scenes and export them for use in React applications.

## Components Available

### 1. SplineScene (Base Component)

Location: `components/3d/spline-scene.tsx`

A reusable wrapper component that handles:
- Loading states with spinner
- Error handling with fallback UI
- Suspense boundaries
- Custom callbacks

**Usage:**
```tsx
import { SplineScene } from "@/components/3d/spline-scene"

<SplineScene 
  sceneUrl="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode"
  className="w-full h-96"
  onLoad={() => console.log("Scene loaded")}
/>
```

### 2. SplineHero

Location: `components/3d/spline-hero.tsx`

A hero section component with Spline 3D background.

**Features:**
- Gradient overlays for text readability
- Animated glow effects
- Full-screen background scene

**How to use on homepage:**
1. Open `app/page.tsx`
2. Find the hero section (around line 27)
3. Comment out `<HeroScene />` 
4. Uncomment `<SplineHero />`

### 3. SplineProductShowcase

Location: `components/3d/spline-product-showcase.tsx`

An interactive product showcase with 3D preview.

**Features:**
- Card-based layout with glass morphism
- Interactive hints for users
- Feature badges
- Customizable title and description

**How to use on products page:**
1. Open `app/products/page.tsx`
2. Find the commented section (around line 57)
3. Uncomment the `<SplineProductShowcase />` block

## Getting Your Spline Scene URL

### Step 1: Create Your Scene

1. Go to [spline.design](https://spline.design)
2. Sign up or log in
3. Create a new project or use an existing one
4. Design your 3D scene

### Step 2: Export Your Scene

1. Click the **Export** button (top right)
2. Select **Code Export**
3. Choose **React** as the framework
4. Copy the scene URL (it will look like: `https://prod.spline.design/XXXXX/scene.splinecode`)

### Step 3: Update the Component

Replace the placeholder URL in the component:

**For Hero Scene:**
```tsx
// In components/3d/spline-hero.tsx
const SPLINE_SCENE_URL = "YOUR_SCENE_URL_HERE"
```

**For Product Showcase:**
```tsx
// In components/3d/spline-product-showcase.tsx
const SPLINE_PRODUCT_SCENE_URL = "YOUR_SCENE_URL_HERE"
```

Or pass it as a prop:
```tsx
<SplineProductShowcase sceneUrl="YOUR_SCENE_URL_HERE" />
```

## Best Practices

### Performance

1. **Optimize Your Scene:**
   - Keep polygon count reasonable (< 100k triangles)
   - Use compressed textures
   - Limit the number of lights
   - Avoid complex physics simulations

2. **Lazy Loading:**
   - All Spline components use Suspense for lazy loading
   - Scenes load asynchronously to prevent blocking the page

3. **Mobile Considerations:**
   - Test on mobile devices
   - Consider simpler scenes for mobile viewports
   - Use the `className` prop to adjust sizing

### Design Tips

1. **Hero Scenes:**
   - Use abstract shapes or subtle animations
   - Ensure good contrast with text
   - Keep animations smooth (30-60 fps)

2. **Product Showcases:**
   - Center the product in the scene
   - Add good lighting (3-point lighting works well)
   - Enable camera controls for user interaction
   - Add subtle rotation or hover effects

3. **Color Palette:**
   - Match your Spline scene colors to the app theme
   - The app uses cyan/blue tones (#22d3ee, #06b6d4)
   - Dark background works best with the dark theme

## Troubleshooting

### Scene Not Loading

**Problem:** Spline scene shows loading spinner indefinitely

**Solutions:**
1. Check that the scene URL is correct
2. Verify the scene is published in Spline
3. Check browser console for CORS errors
4. Ensure you have a stable internet connection

### Performance Issues

**Problem:** Page is slow or laggy with Spline scene

**Solutions:**
1. Reduce polygon count in Spline editor
2. Optimize textures (use smaller sizes)
3. Disable shadows or reduce quality
4. Consider using the React Three Fiber version instead

### Scene Appears Broken

**Problem:** Scene loads but looks wrong

**Solutions:**
1. Re-export from Spline
2. Clear browser cache
3. Check Spline version compatibility
4. Verify all assets are included in export

## Switching Between React Three Fiber and Spline

The app supports both React Three Fiber (custom 3D code) and Spline (visual editor).

**React Three Fiber:**
- ✅ More control over performance
- ✅ Smaller bundle size
- ✅ Fully customizable with code
- ❌ Requires coding 3D scenes

**Spline:**
- ✅ Visual editor (no coding required)
- ✅ Faster to create complex scenes
- ✅ Great for designers
- ❌ Larger file sizes
- ❌ Less control over optimization

Choose based on your needs and team skills!

## Examples

### Simple Hero Background
```tsx
<SplineHero />
```

### Custom Product Showcase
```tsx
<SplineProductShowcase 
  title="MacBook Pro 3D Preview"
  description="Rotate and zoom to explore"
  sceneUrl="https://prod.spline.design/abc123/scene.splinecode"
  className="max-w-4xl mx-auto"
/>
```

### Basic Scene with Custom Styling
```tsx
<SplineScene 
  sceneUrl="https://prod.spline.design/xyz789/scene.splinecode"
  className="w-full h-screen rounded-lg"
  onLoad={() => console.log("Ready!")}
/>
```

## Resources

- [Spline Official Website](https://spline.design)
- [Spline Documentation](https://docs.spline.design)
- [Spline Community](https://community.spline.design)
- [React Spline Package](https://www.npmjs.com/package/@splinetool/react-spline)

## Support

If you encounter issues:
1. Check this documentation
2. Review the Spline documentation
3. Check browser console for errors
4. Verify your scene URL is correct and published
