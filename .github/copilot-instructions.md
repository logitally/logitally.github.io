# AI Coding Instructions for LogiTally Landing Page

## Project Overview
This is a modern, responsive landing page for LogiTally - a SaaS business & financial management platform. Built with vanilla JavaScript, Bootstrap 5, and custom CSS using a mobile-first approach.

## Architecture & Design Patterns

### Brand Colors (Critical)
Always use these exact brand colors defined in `:root` CSS variables:
- `--primary-color: #008080` (Teal Blue)
- `--secondary-color: #27AE60` (Emerald Green) 
- `--dark-color: #2C3E50` (Charcoal Gray)
- Gradients: `--gradient-primary` combines teal-to-emerald for CTAs and hero sections

### Component Structure
**Landing page follows a 6-section layout:**
1. `hero-section` - Main value prop with animated counters
2. `features-section` - 3 cards with hover animations 
3. `about-section` - Target audience breakdown
4. `testimonials-section` - Social proof with star ratings
5. `cta-section` - Final conversion push
6. `footer` - Contact info and social links

### JavaScript Architecture
**Initialization pattern in `app.js`:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();      // Scroll effects, mobile menu
    initAnimations();  // Intersection Observer for fade-ins
    initCounters();    // Animated statistics
    initSmoothScrolling(); // Anchor link behavior
    initFormHandlers(); // CTA button interactions
});
```

**Key interaction handlers:**
- `handleTryFree()`, `handleBookDemo()`, `handleStartTrial()` - CTA button actions
- Counter animations use `requestAnimationFrame` with easing functions
- Intersection Observer for scroll-triggered animations

### CSS Patterns
**Consistent hover effects:**
- Feature cards: `transform: translateY(-8px)` + box-shadow
- Buttons: `transform: translateY(-2px)` with gradient backgrounds
- All animations use `transition: all 0.3s ease`

**Responsive breakpoints:**
- Mobile: `@media (max-width: 576px)` - Stack buttons, smaller text
- Tablet: `@media (max-width: 768px)` - Reduce padding, adjust hero stats

## Development Workflows

### Asset Management
- All images go in `static/` folder with specific naming conventions
- See `static/README.md` for exact image specs (logo.png 40x40px, testimonial photos 50x50px)
- Use placeholder URLs from `static/README.md` during development

### Styling Updates
- Brand colors are centralized in CSS `:root` variables
- Custom gradients automatically update when primary/secondary colors change
- Bootstrap classes are extended, not overridden (use `!important` sparingly)

### Content Updates
**HTML structure dependencies:**
- CTA buttons require `onclick="handleX()"` attributes for functionality
- Statistics counters need specific IDs: `businessCount`, `invoiceCount`, `savingsCount`
- Feature cards use `.feature-card` class for hover animations
- Testimonial cards need `.testimonial-card` class and star rating structure

## Testing & Debugging
- Check browser console for "LogiTally Landing Page Loaded Successfully! 🚀" message
- CTA buttons show loading states and notifications when clicked
- Animated counters only trigger once per page load (use `.counted` class)
- Mobile menu auto-closes when nav links are clicked

## Integration Points
- Analytics ready: `trackButtonClick()` function prepared for GA4/Facebook Pixel
- Form handlers simulate 2-second processing with loading states
- Error handling includes fallbacks for missing DOM elements
- Accessibility features: skip links, keyboard navigation, screen reader support

## Key Files Reference
- `style.css` - All brand colors and component styles
- `app.js` - Interaction logic and animation controllers  
- `index.html` - Semantic structure with Bootstrap classes
- `static/README.md` - Asset specifications and placeholder URLs
