# Quick Start Guide - Phase 1 Implementation
**Moden Kate Gen Z Brand Experience**

---

## ⚡ Quick Start (3 Steps)

### 1. Update Database
```bash
# Open Supabase Dashboard → SQL Editor
# Copy and paste the entire contents of:
database/FRESH_DATABASE_SETUP.sql
# Click "Run" to create all tables, indexes, and sample data
```

### 2. Start Backend Server
```bash
cd backend
node server.js
# Should see: "✅ Database connection successful"
# Backend running on: http://localhost:5000
```

### 3. Start Frontend
```bash
npm run dev
# Frontend running on: http://localhost:3001 (or 3000)
```

---

## 🎨 What You'll See

### Homepage (`/`)
- **Video Hero** - Full-screen auto-playing video with tagline
- **Trust Bar** - Sticky bar with warranty/shipping info
- **Shop by Vibe** - 4 lifestyle bundles (Study, Weekend, Gym, Chill)
- **UGC Gallery** - "#ModenKateIRL" Instagram-style grid
- **Original sections** - Category grid, products, lifestyle, etc.

### Sustainability Page (`/sustainability`)
- Hero section with brand messaging
- 3 sustainability pillars
- Stats section (90% recycled, 100% carbon neutral)
- Image gallery
- FAQ section
- CTA to shop sustainable

### Admin Portal (`/#/admin`)
- Login: admin@modenkate.com / kate123
- Manage products, orders, promo codes
- Inventory tracking views

---

## 📦 New Components You Can Use

### In Any Page:
```tsx
import { VideoHero } from '../components/VideoHero';
import { TrustBar } from '../components/TrustBar';
import { VibeShop } from '../components/VibeShop';
import { UGCGallery } from '../components/UGCGallery';
import { FAQAccordion } from '../components/FAQAccordion';
import { ImageGallery } from '../components/ImageGallery';
import { CompleteTheLook } from '../components/CompleteTheLook';
```

### Example Usage:
```tsx
// FAQ Accordion
<FAQAccordion items={[
  { question: "How long does battery last?", answer: "5-7 days no cap" },
  { question: "Can I return it?", answer: "30 days, full refund" }
]} />

// Image Gallery
<ImageGallery 
  images={['url1.jpg', 'url2.jpg', 'url3.jpg']}
  productName="Smart Watch"
/>

// Complete the Look
<CompleteTheLook 
  currentProductId="product-123"
  currentCategory="Watches"
/>

// UGC Gallery
<UGCGallery limit={6} />
```

---

## 🎨 Design System (`theme.ts`)

### Colors:
```tsx
import { theme } from './theme';

// Use in components:
color: theme.colors.primary        // Hot Pink #FF0080
color: theme.colors.secondary      // Cyan #00F0FF
color: theme.colors.tertiary       // Electric Yellow #FFD600
color: theme.colors.black          // #0A0A0A
```

### Typography:
```tsx
fontFamily: theme.typography.fontFamily.heading  // Space Grotesk
fontSize: theme.typography.fontSize['5xl']       // 3rem (48px)
fontWeight: theme.typography.fontWeight.black    // 900
```

### Copy Templates:
```tsx
import { copy } from './theme';

<h1>{copy.taglines.hero}</h1>  // "Live Luxury. Don't Overpay."
<button>{copy.cta.primary}</button>  // "Shop the Vibe"
<span>{copy.trust.warranty}</span>   // "1-Year No Cap Warranty"
```

### Placeholder Media:
```tsx
import { placeholderMedia } from './theme';

<video src={placeholderMedia.videos.hero} />
<img src={placeholderMedia.images.watchBlack} />
```

---

## 🗄️ Database Changes

### New Tables:
- `bundles` - Shop by Vibe collections
- `bundle_items` - Products in each bundle

### Sample Data Included:
- 4 bundles (Study Sesh, Weekend Flex, Gym Flow, Chill Beats)
- Each has discount percentage, description, emoji, image

### Query Bundles:
```sql
-- Get all active bundles
SELECT * FROM bundles WHERE is_active = true;

-- Get bundle with products
SELECT b.*, 
       json_agg(json_build_object(
         'product_id', p.id,
         'name', p.name,
         'quantity', bi.quantity
       )) as products
FROM bundles b
LEFT JOIN bundle_items bi ON b.id = bi.bundle_id
LEFT JOIN products p ON bi.product_id = p.id
WHERE b.id = 'bundle-uuid'
GROUP BY b.id;
```

---

## 🔄 Replacing Placeholder Media

### 1. Update Theme File:
```tsx
// theme.ts - line 100+
export const placeholderMedia = {
  videos: {
    hero: 'YOUR_VIDEO_URL.mp4',  // Replace with your video
  },
  images: {
    watchBlack: 'YOUR_IMAGE_URL.jpg',  // Replace with your images
    // ... etc
  }
};
```

### 2. Update Database:
```sql
-- Update bundle images
UPDATE bundles 
SET image = 'https://your-cdn.com/study-bundle.jpg'
WHERE vibe_category = 'study';
```

### 3. Upload Products:
- Go to Admin Portal: `http://localhost:3001/#/admin`
- Create/Edit products
- Upload real product photos
- Multiple images supported (gallery)

---

## 🚀 Testing Checklist

### Basic Functionality:
- [ ] Homepage loads without errors
- [ ] Video hero autoplays
- [ ] Trust bar is sticky on scroll
- [ ] Shop by Vibe section displays 4 bundles
- [ ] UGC gallery shows 6 images
- [ ] Sustainability link in header works
- [ ] Sustainability page renders correctly
- [ ] Admin login works (admin@modenkate.com / kate123)

### Visual Check:
- [ ] Bold pink/cyan colors visible
- [ ] Space Grotesk font loading for headings
- [ ] Neon glow effects on buttons
- [ ] Hover animations working
- [ ] Mobile responsive (test on phone)

### Browser Compatibility:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (video autoplay may require user interaction)
- [ ] Mobile browsers

---

## 🐛 Common Issues & Fixes

### Video Not Autoplaying:
```tsx
// Already implemented, but if issues:
// 1. Check browser autoplay policies
// 2. Ensure video has `muted` attribute
// 3. Add `playsInline` for iOS
// 4. User must interact with page first (some browsers)
```

### Images Not Loading:
```bash
# Check CORS if using external URLs
# Unsplash URLs should work fine
# If blocked, download and host locally:
public/images/hero-video.mp4
public/images/bundles/study.jpg
```

### Framer Motion Errors:
```bash
npm install framer-motion
# Make sure it's in package.json dependencies
```

### Database Errors:
```sql
-- If tables already exist, drop them first:
DROP TABLE IF EXISTS bundle_items CASCADE;
DROP TABLE IF EXISTS bundles CASCADE;
-- Then run FRESH_DATABASE_SETUP.sql
```

### Port Already in Use:
```bash
# Frontend
# Vite will auto-switch ports (3000 → 3001)
# Or manually kill process:
npx kill-port 3000

# Backend
npx kill-port 5000
```

---

## 📱 Mobile Optimization Notes

### Already Implemented:
- Video hero: `playsInline` for iOS
- Responsive font sizes (smaller on mobile)
- Grid layouts: `repeat(auto-fit, minmax(300px, 1fr))`
- Trust bar: wraps on small screens
- Navigation: existing mobile menu

### Test On:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad)

---

## 🎯 Next Steps (Optional)

### Phase 2 Features (Not Yet Built):
1. **Real UGC Integration**
   - Instagram Graph API
   - Auto-fetch #ModenKateIRL posts
   - Admin moderation dashboard

2. **Bundle Purchase Logic**
   - Add bundles to cart
   - Apply bundle discounts automatically
   - Backend API for bundles

3. **Loyalty Program**
   - "The Kate Crew" membership
   - Points system
   - Reward tiers

4. **Product Customization**
   - "Design Your Dial" widget
   - Watch face editor
   - Custom variants

5. **Performance Optimization**
   - Lazy loading
   - Image optimization
   - Code splitting

---

## 📞 Support

### If Something Breaks:
1. Check browser console for errors
2. Verify database setup completed
3. Ensure both servers running
4. Clear browser cache
5. Check file imports (case-sensitive)

### Key Files to Check:
- `theme.ts` - Design system & placeholder media
- `App.tsx` - Routing configuration
- `pages/Home.tsx` - Component imports
- `database/FRESH_DATABASE_SETUP.sql` - Database schema

---

## 📚 Documentation

- **Gap Analysis:** `MODEN_KATE_GAP_ANALYSIS.md`
- **Implementation Summary:** `PHASE_1_IMPLEMENTATION_SUMMARY.md`
- **This Guide:** `QUICK_START_GUIDE.md`
- **Original README:** `README.md`

---

**Phase 1 is production-ready!** 🎉

Replace placeholder media with your actual photos/videos and you're good to launch.

All components are modular - you can add them to any page, customize styling, or extend functionality as needed.
