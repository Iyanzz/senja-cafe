# ☕ Senja & Co. Cafe — Premium Cafe Website

> Good Food. Great Coffee. Beautiful Moments.

A premium, fully responsive static website for **Senja & Co. Cafe** — a modern Indonesian cafe targeting young professionals, students, families, and coffee lovers looking for an aesthetic hangout spot.

---

## 🌐 Live Pages & Navigation

| Path | Description |
|------|-------------|
| `/` (`index.html`) | Main website (single-page) |
| `#home` | Hero section |
| `#about` | About section |
| `#menu` | Signature menu categories |
| `#featured-menu` | Featured menu items (6 items) |
| `#events` | Events & promotions |
| `#gallery` | Photo gallery with lightbox |
| `#testimonials` | Customer reviews |
| `#reservation` | Table reservation CTA |
| `#location` | Location & business hours |
| `#contact` | Contact & reservation (all contact info) |

---

## ✅ Completed Features

### Design & Layout
- [x] Premium warm aesthetic with beige, cream, soft brown, dark charcoal palette
- [x] Elegant typography: Playfair Display + Cormorant Garamond + Inter
- [x] Fully responsive: desktop, tablet, and mobile
- [x] Smooth scroll animations (custom AOS-like IntersectionObserver)
- [x] Parallax hero background effect
- [x] Reading progress bar in navbar
- [x] 3D card tilt hover effects (desktop)

### Header / Navbar
- [x] Sticky navbar that changes style on scroll
- [x] Transparent on hero, solid glass-morphism when scrolled
- [x] Active nav link scroll spy
- [x] Mobile hamburger menu with overlay
- [x] "Reserve a Table" CTA button in navbar

### Hero Section
- [x] Full-viewport hero with animated zoom background
- [x] Headline, subheadline, dual CTA buttons
- [x] Social proof badges (Rating, Customers, Hours)
- [x] Scroll hint indicator

### About Section
- [x] Dual image layout with decorative overlapping cards
- [x] Animated statistics counter (5+ years, 10K+ customers, 4.8★, 7 days)
- [x] "Since 2019" badge overlay

### Menu Sections
- [x] 5 Signature Menu Categories with images and prices
- [x] 6 Featured Menu Items with:
  - Caramel Latte (Rp 38.000)
  - Cappuccino (Rp 32.000)
  - Matcha Latte (Rp 42.000)
  - Beef Rice Bowl (Rp 58.000)
  - Creamy Pasta (Rp 62.000)
  - Chocolate Lava Cake (Rp 48.000)
- [x] WhatsApp order button per item
- [x] Hover card effects with image zoom

### Events & Promotions
- [x] Live Music Night (Every Friday)
- [x] Coffee Workshop (Monthly)
- [x] Student Discount (Special Promo)
- [x] Private Gathering (By Reservation)

### Gallery
- [x] 6-image masonry-style grid
- [x] Full lightbox modal with keyboard navigation (ESC, arrow keys)
- [x] Hover overlay with expand icon and caption

### Why Choose Us
- [x] 6 feature cards with icons on dark background
- [x] Premium Ingredients, Cozy Atmosphere, Friendly Service
- [x] Strategic Location, Fast WiFi, Event Space

### Testimonials
- [x] 3 realistic customer testimonials
- [x] Featured center testimonial (dark card)

### Reservation Section
- [x] Business hours display
- [x] Available seating info
- [x] WhatsApp CTA button
- [x] Elegant info card with real-time Open/Closed status

### Location Section
- [x] Map placeholder with pin animation
- [x] Get Directions button (Google Maps)
- [x] Full location card (address, hours, parking, transport)

### Contact Section (All Contact Info Here)
- [x] WhatsApp channel card
- [x] Email channel card
- [x] Instagram channel card
- [x] Address card
- [x] Business hours card
- [x] Reserve via WhatsApp CTA box

### Footer
- [x] Brand with logo and tagline
- [x] Quick links navigation
- [x] Contact information
- [x] Business hours
- [x] Social media links
- [x] Copyright notice

### Technical Features
- [x] Floating WhatsApp button (all screens)
- [x] Back-to-top button
- [x] **Single WhatsApp number config** — change once in `js/main.js` updates all buttons
- [x] Real-time Open/Closed status badge
- [x] Image lazy loading
- [x] SEO meta tags (description, keywords, OG)
- [x] ARIA labels for accessibility
- [x] Keyboard navigation support
- [x] Reduced motion support

---

## 🔧 Easy Editing Guide

### Update WhatsApp Number
Open `js/main.js` and change line:
```js
whatsAppNumber: '6281234567890',  // ← Change this
```
This updates ALL WhatsApp buttons automatically.

### Update Menu Items
Open `index.html` and find the `<section class="featured-menu">` section.
Each menu card is an `<article class="menu-card">` element.

### Update Contact Information
- **Primary source:** `#contact` section in `index.html`
- **Footer:** `#footer` section in `index.html`
- Look for `<!-- EDITABLE:` comments for quick navigation

### Update Business Hours
Search for `08:00 – 22:00` and `08:00 – 23:00` in `index.html`.
Update the JavaScript `updateOpenStatus()` function in `js/main.js` as well.

### Update Events/Promotions
Find `<section class="events">` in `index.html`.
Each event is an `<article class="event-card">` element.

---

## 📁 Project Structure

```
senja-cafe/
├── index.html           ← Main single-page website
├── css/
│   └── style.css        ← All styles (CSS custom properties at top)
├── js/
│   └── main.js          ← All JS (config object at top for easy editing)
└── README.md
```

---

## 🎨 Design System

### Colors (CSS Variables)
| Variable | Value | Usage |
|----------|-------|-------|
| `--color-cream` | `#FAF6F0` | Page background |
| `--color-beige` | `#F2EBE0` | Section backgrounds |
| `--color-brown` | `#8B5E3C` | Primary brand color |
| `--color-brown-dark` | `#6B4226` | Hover states |
| `--color-charcoal` | `#2C2017` | Text, dark sections |
| `--color-tan` | `#D4B896` | Accent, labels |
| `--color-whatsapp` | `#25D366` | WhatsApp buttons |

### Typography
| Usage | Font |
|-------|------|
| Headings | Playfair Display (serif) |
| Subheadings | Cormorant Garamond |
| Body / UI | Inter (sans-serif) |

---

## 🚀 Recommended Next Steps

1. **Replace placeholder contact info** with real phone number, email, Instagram
2. **Add Google Maps embed** in the location section (replace the placeholder)
3. **Add real food photography** — replace image URLs with actual cafe photos
4. **Online ordering system** — integrate with GrabFood / GoFood / ShopeeFood deep links
5. **Instagram feed widget** — embed real @senjacafe posts
6. **Menu PDF download** — add downloadable full menu PDF
7. **Google Analytics** — add tracking code in `<head>`
8. **WhatsApp Chat Widget** — replace floating button with Tidio or Crisp chat

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Desktop (> 1024px) | Full 2-column layouts |
| Tablet (768px-1024px) | Stacked single column |
| Mobile (480px-768px) | Compact mobile layout |
| Small Mobile (< 480px) | Minimal layout |

---

*© 2026 Senja & Co. Cafe — Made with ♥ in Jakarta*
