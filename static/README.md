# LogiTally Static Assets

This folder contains all static assets for the LogiTally landing page including images, icons, and other media files.

## Image Requirements

The following images should be placed in this folder:

### Required Images:
1. **logo.png** (40x40px) - Main LogiTally logo for navbar
2. **logo-white.png** (40x40px) - White version of logo for footer
3. **dashboard-preview.png** (600x400px) - Screenshot/mockup of the LogiTally dashboard
4. **about-illustration.png** (500x400px) - Illustration showing business management concepts
5. **testimonial-1.jpg** (50x50px) - Photo of Sarah Chen (restaurant owner)
6. **testimonial-2.jpg** (50x50px) - Photo of Michael Rodriguez (business consultant)
7. **testimonial-3.jpg** (50x50px) - Photo of Priya Patel (retail store manager)

### Image Specifications:
- **Format**: PNG for logos and illustrations, JPG for photos
- **Quality**: High resolution for sharp display on retina screens
- **Optimization**: Compress images for web to ensure fast loading
- **Alt Text**: All images have descriptive alt text for accessibility

### Placeholder URLs:
Until you add the actual images, you can use these placeholder services:
- Logo: `https://via.placeholder.com/40x40/008080/white?text=LT`
- Dashboard: `https://via.placeholder.com/600x400/f8fafc/008080?text=Dashboard+Preview`
- About: `https://via.placeholder.com/500x400/e0f2fe/27AE60?text=Business+Growth`
- Testimonials: `https://via.placeholder.com/50x50/d1fae5/27AE60?text=User`

### Design Guidelines:
- **Colors**: Use the brand colors (teal blue #008080, emerald green #27AE60, charcoal gray #2C3E50)
- **Style**: Modern, clean, professional business aesthetic
- **Consistency**: Maintain consistent visual style across all assets
- **Accessibility**: Ensure good contrast ratios for visibility

## Usage in HTML:
```html
<img src="static/logo.png" alt="LogiTally Logo" width="40" height="40">
```

## Optimization Tips:
1. Use WebP format for better compression (with PNG/JPG fallbacks)
2. Implement lazy loading for images below the fold
3. Use appropriate sizes and srcset for responsive images
4. Compress images using tools like TinyPNG or ImageOptim
