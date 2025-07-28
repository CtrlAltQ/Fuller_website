# Fuller Restoration & Renovation Website Plan

## Overview
This document outlines the plan for customizing the existing website template to create a professional website for Fuller Restoration & Renovation based in Columbia, Tennessee.

## Current Template Analysis
The existing template already has:
- Responsive design with mobile navigation
- Sections for: Hero, Services, About, Portfolio, Contact, and Footer
- Good styling with animations and responsive design
- Form validation and submission handling
- Earthy green color scheme (#2c5530) that works well for a renovation company

## Detailed Implementation Plan

### HTML Changes (index.html)

1. **Metadata Updates**
   - Update title to "Fuller Restoration & Renovation - Columbia, TN"
   - Update meta description to include key services and location

2. **Navigation**
   - Keep existing navigation structure
   - Ensure all links point to correct sections

3. **Hero Section**
   - Change heading to "Fuller Restoration & Renovation"
   - Update tagline to "Bringing Homes Back to Life"
   - Change primary CTA button to "Book a Free Consultation"

4. **Services Section**
   - Replace current services with:
     - Kitchen Remodels
     - Bathroom Renovations
     - Flooring
     - Decks & Patios
     - Full Home Renovations
   - Update service descriptions to match these offerings
   - Update icons to reflect these services

5. **About Section**
   - Add story about Kodi and Kelly Fuller starting the company
   - Focus on their experience and commitment to quality craftsmanship
   - Update stats/features if needed

6. **Portfolio/Gallery Section**
   - Restructure to emphasize before & after transformations
   - Update placeholder text to indicate before/after context
   - Ensure layout works for side-by-side comparison images

7. **Testimonials**
   - Add a "Coming Soon" message to the testimonials area
   - Could be integrated into portfolio section or as a separate section

8. **Contact Section**
   - Update with Columbia, TN information
   - Add service area information
   - Add Google Maps embed for Columbia, TN
   - Keep existing contact form structure

9. **Footer**
   - Update company information
   - Add social media placeholders
   - Update copyright information

### CSS Changes (styles.css)

1. **Color Scheme**
   - Current green (#2c5530) is already an earthy tone and works well
   - Accent color (orange #ff6b35) could be adjusted if needed
   - Consider adding wood textures or neutral backgrounds

2. **Typography**
   - Keep existing font (Inter) as it's clean and professional
   - Adjust sizes/weights as needed for emphasis

3. **Image Placeholders**
   - Update styling for before/after image containers
   - Consider adding overlay or divider for before/after images

### JavaScript Changes (script.js)

1. **Form Handling**
   - Update form validation for any new fields
   - Keep existing animation and interaction code

## Specific Code Changes

### index.html

1. **Title and Meta Tags**
```html
<title>Fuller Restoration & Renovation - Professional Home Renovation in Columbia, TN</title>
<meta name="description" content="Expert kitchen, bathroom, flooring, and full home renovation services in Columbia, TN. Fuller Restoration & Renovation brings homes back to life with quality craftsmanship.">
```

2. **Hero Section**
```html
<h1>Fuller Restoration & Renovation</h1>
<p>Bringing Homes Back to Life</p>
<div class="hero-buttons">
    <a href="#contact" class="btn btn-primary">Book a Free Consultation</a>
    <a href="#portfolio" class="btn btn-secondary">View Our Work</a>
</div>
```

3. **Services Section**
```html
<div class="services-grid">
    <div class="service-card">
        <div class="service-icon">🏠</div>
        <h3>Kitchen Remodels</h3>
        <p>Transform your kitchen with custom cabinetry, premium countertops, and modern appliances.</p>
    </div>
    <div class="service-card">
        <div class="service-icon">🚿</div>
        <h3>Bathroom Renovations</h3>
        <p>Create your dream bathroom with luxury fixtures, custom tile work, and elegant finishes.</p>
    </div>
    <div class="service-card">
        <div class="service-icon">🪑</div>
        <h3>Flooring</h3>
        <p>Quality hardwood, tile, and luxury vinyl flooring installation for any room in your home.</p>
    </div>
    <div class="service-card">
        <div class="service-icon">🏡</div>
        <h3>Decks & Patios</h3>
        <p>Extend your living space outdoors with custom-built decks and beautiful patio designs.</p>
    </div>
    <div class="service-card">
        <div class="service-icon">🔨</div>
        <h3>Full Home Renovations</h3>
        <p>Complete home transformations that modernize your space while preserving its character.</p>
    </div>
</div>
```

4. **About Section**
```html
<div class="about-text">
    <h2>About Fuller Restoration & Renovation</h2>
    <p>Founded by Kodi and Kelly Fuller, our company was born from a passion for bringing homes back to life. With years of experience in the renovation industry, we've built a reputation for honest, high-quality craftsmanship in Columbia, Tennessee and surrounding areas.</p>
    <p>We believe that every home has potential, and we're committed to helping homeowners transform their spaces into beautiful, functional environments that reflect their unique style and needs.</p>
    <div class="about-features">
        <div class="feature">
            <span class="feature-number">Quality</span>
            <span class="feature-text">Craftsmanship</span>
        </div>
        <div class="feature">
            <span class="feature-number">Honest</span>
            <span class="feature-text">Communication</span>
        </div>
        <div class="feature">
            <span class="feature-number">On-Time</span>
            <span class="feature-text">Completion</span>
        </div>
    </div>
</div>
```

5. **Portfolio Section**
```html
<div class="portfolio-grid">
    <div class="portfolio-item">
        <div class="portfolio-image">
            <div class="image-placeholder">
                <div class="before-after">
                    <div class="before">Before</div>
                    <div class="after">After</div>
                </div>
            </div>
        </div>
        <div class="portfolio-info">
            <h3>Kitchen Transformation</h3>
            <p>Complete kitchen renovation with custom cabinetry, quartz countertops, and new appliances.</p>
        </div>
    </div>
    <!-- Additional portfolio items -->
</div>
```

6. **Testimonials Section**
```html
<section id="testimonials" class="testimonials">
    <div class="container">
        <h2>What Our Clients Say</h2>
        <div class="testimonials-content">
            <div class="coming-soon">
                <h3>Testimonials Coming Soon</h3>
                <p>We're collecting feedback from our satisfied clients. Check back soon to read about their experiences!</p>
            </div>
        </div>
    </div>
</section>
```

7. **Contact Section**
```html
<div class="contact-info">
    <h3>Contact Information</h3>
    <div class="contact-item">
        <strong>Phone:</strong> <a href="tel:+1234567890">(123) 456-7890</a>
    </div>
    <div class="contact-item">
        <strong>Email:</strong> <a href="mailto:info@fullerrenovation.com">info@fullerrenovation.com</a>
    </div>
    <div class="contact-item">
        <strong>Address:</strong> Columbia, TN
    </div>
    <div class="contact-item">
        <strong>Service Area:</strong> Columbia, TN and surrounding areas
    </div>
    <div class="contact-item">
        <strong>Hours:</strong> Monday - Friday: 8AM - 6PM<br>
        Saturday: 9AM - 4PM<br>
        Sunday: Closed
    </div>
    <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51873.31042569034!2d-87.08797233343316!3d35.61498022499054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8863f8f5e9b2fd8d%3A0x7a14a71c9d8f9a0f!2sColumbia%2C%20TN!5e0!3m2!1sen!2sus!4v1627308912345!5m2!1sen!2sus" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
</div>
```

### styles.css

1. **Before/After Image Styling**
```css
.before-after {
    display: flex;
    width: 100%;
    height: 100%;
}

.before, .after {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.before {
    background: #e9ecef;
    border-right: 1px solid #ccc;
}

.after {
    background: #f8f9fa;
}

.coming-soon {
    text-align: center;
    padding: 3rem;
    background: #f8f9fa;
    border-radius: 12px;
}

.map-container {
    margin-top: 1.5rem;
    border-radius: 12px;
    overflow: hidden;
}
```

## Implementation Approach

The implementation will follow these steps:

1. Make content changes first (company info, services, about section)
2. Adjust structure where needed (before/after gallery, testimonials)
3. Fine-tune styling to ensure earthy, professional feel
4. Add Google Maps integration
5. Test thoroughly on different devices

## Next Steps

After approval of this plan, we'll proceed with:

1. Implementing HTML changes
2. Adding CSS modifications
3. Testing the site for responsiveness and functionality
4. Making final adjustments based on feedback