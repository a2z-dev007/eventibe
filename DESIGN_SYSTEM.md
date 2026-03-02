# Eventibe Design System 1.0

This document defines the core visual and interactive standards for the Eventibe platform. All team members must follow these guidelines to maintain consistency across venues, vendors, and corporate services.

---

## 🎨 1. Color Palette

Our colors are designed to balance corporate trust (Blues/Navies) with celebration energy (Orange/Yellow).

### Core Brand Colors
| Token | HEX | Usage |
| :--- | :--- | :--- |
| `primary-navy` | `#0B1F3A` | Deep contrast, footers, primary headings, dark mode backgrounds. |
| `corporate-blue` | `#1E3A8A` | Trust-building elements, step indicators, links. |
| `mid-blue` | `#2563EB` | Active states, hover-glow transitions. |
| `accent-orange` | `#F97316` | Action buttons (CTAs), progress highlights, "Celebrate" themes. |
| `soft-slate` | `#334155` | Secondary text, descriptions, body content. |

### Semantic Colors (Tailwind v4 / HSL)
- **Background**: `hsl(0 0% 100%)` (Light) / `hsl(222.2 84% 4.9%)` (Dark)
- **Border**: `hsl(214.3 31.8% 91.4%)` (Light) / `hsl(217.2 32.6% 17.5%)` (Dark)
- **Success**: Emerald Green shades (implied in grid/success tags).
- **Muted**: `hsl(210 40% 96%)`

### Gradients
- **Hero/Header Gradient**: `linear-gradient(135deg, #0B1F3A, #1E3A8A)`
- **Action CTA Gradient**: `linear-gradient(135deg, #F97316, #EA580C)`
- **Blue Action Gradient**: `linear-gradient(90deg, #078ED8 0%, #43C6FF 100%)`

---

## Typography

### Core Font
- **Typeface**: **Inter** (Primary Sans-Serif).
- **Fallbacks**: `ui-sans-serif`, `system-ui`.
- **Properties**: `-webkit-font-smoothing: antialiased`.

### Hierarchy
- **H1 (Hero)**: `5rem` (Desktop), `1.6rem` (Mobile), Weight: 800 (Extrabold).
- **H2 (Section Heading)**: `3.25rem` (Desktop), `2.25rem` (Mobile), Weight: 800, Color: `#000000`.
- **Card Heading**: `1.125rem`, Weight: 600.
- **Body Text**: `1rem`, color: `soft-slate` or `#737373` for secondary content.

---

## 🕹️ Interactive Patterns

Consistency in movement defines our premium "Wow" factor.

### Micro-Interactions
1.  **Tilt Cards (`TiltCard`)**:
    - **Effect**: Subtle 3D rotation (`rotateX/Y`) following the cursor.
    - **Glow**: Radial gradient `#F97316` (Orange) with low opacity (12%) following the mouse inside the card.
    - **Usage**: Venue highlights, Testimonial cards, Service previews.

2.  **Magnetic Buttons (`MagneticButton`)**:
    - **Effect**: Button follows cursor with 15% displacement friction.
    - **Transition**: `cubic-bezier(0.22, 1, 0.36, 1)`.

### Animations
- **Slide Up**: `slideUp 0.3s ease-out` (Used for drawers and sheets).
- **Float**: Continuous vertical hover (3s infinite) for decorative icons/images.
- **Shimmer**: `shimmer 1.8s infinite` (Used for loading states/skeletons).
- **Pulse-Slow**: 2s opacity pulse for "Active" status indicators.

---

## 🍱 Components

### 1. Cards (General Pattern)
- **Radius**: `20px` to `32px` (Large rounded corners for modern luxury feel).
- **Border**: `1px solid #E5E7EB` (Light mode) or Glassmorphism `rgba(255, 255, 255, 0.4)`.
- **Shadow**: `shadow-md` (Standard) to `shadow-2xl` (Active/Featured).

### 2. Buttons
- **Standard Action**: Gradient Orange background, white text.
- **Secondary**: Transparent background, Navy border, Navy text.
- **Active Scaling**: `transform: scale(0.96); brightness(0.92)` on click.

---

## 🌀 4. Loading & Performance

To ensure the platform feels fast and reliable, we use skeleton states and smooth scrolling.

1. **Shimmer Effect (`animate-shimmer`)**: 
   - **Visual**: Linear gradient shifting from `gray-100` to `gray-50`.
   - **Usage**: Mandatory for all skeletal states during data fetching (Venue search, list updates).

2. **Data Consistency (TanStack Query)**:
   - Always use the global `QueryProvider`.
   - Implement `staleTime` and `cacheTime` appropriate for each entity (Venues = High, User Profile = Medium).

3. **Smooth Scrolling (Lenis)**:
   - Standardized easing for a premium feel. Avoid native `scroll-behavior: smooth` where Lenis is active.

---

## 📱 5. Responsive Standards

### Grid System
- **Mobile (Default)**: Horizontal snap carousels for lists (Venues/Vendors) to save vertical space.
- **Desktop**: Multi-column grids (Typically 3 or 4 columns).

### Spacing Constants
- **Section Padding**: `py-20` to `py-32`.
- **Safe Areas**: `env(safe-area-inset-bottom, 0)` applied to body/main for mobile devices.

---

## 💡 Best Practices
1.  **Strict 1→2→3 Logic**: Progressions must always flow forward. Loop resets must be instant (`transition: none`).
2.  **No Placeholders**: Use AI-generated relevant images or brand assets.
3.  **Color Hierarchy**: Use Navy for "Trust/Corporate" and Orange for "Excitement/Call to Action".
4.  **Premium Feedback**: Every interactive element should have a hover/press response (Scale, Glow, or Color Shift).
