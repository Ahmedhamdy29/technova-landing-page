# TechNova Landing Page

A modern, fully responsive landing page for **TechNova** — a digital solutions agency.

## Project Structure

```
├── index.html              # Main HTML file
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # Navigation & interactions
├── assets/
│   ├── icons/              # SVG icons (logo, services, contact)
│   └── images/             # Hero artwork, background graphics & avatars
│       ├── hero-illustration.svg       # Dark-theme animated hero artwork
│       └── hero-illustration-light.svg # Light-theme animated hero artwork
└── README.md
```

## How to Run

No build tools or dependencies required. Open the project directly in a browser:

### Option 1: Double-click
Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

### Option 2: Local server (recommended)
Using Python:

```bash
# Python 3
python -m http.server 8080
```

Using Node.js (npx):

```bash
npx serve .
```

Then visit: **http://localhost:8080**

### Option 3: VS Code / Cursor Live Server
Install the "Live Server" extension and click "Go Live" from the status bar.

## Features

- Fully responsive (Desktop / Tablet / Mobile)
- CSS Grid & Flexbox layout
- CSS custom properties for easy theming
- Smooth scroll navigation
- Mobile hamburger menu
- Animated SVG hero illustration with dark/light theme variants
- Direct WhatsApp contact CTA
- Accessible markup (semantic HTML, ARIA labels)

## Sections

| Section       | Description                          |
|---------------|--------------------------------------|
| Hero          | Main headline with CTA buttons       |
| Statistics    | Key company metrics                  |
| Services      | Web, UI/UX, Mobile development       |
| Testimonials  | Client reviews                       |
| Contact       | Contact info + direct WhatsApp chat  |
| Footer        | Copyright & quick links              |

## Customization

Edit `css/variables.css` to change colors, fonts, spacing, and other design tokens globally.

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions).
