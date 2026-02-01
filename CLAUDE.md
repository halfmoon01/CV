# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Developer portfolio/resume website built with vanilla web technologies.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- TailwindCSS (via CDN)

## Development

```bash
# Start local development server (using Python)
python3 -m http.server 8000

# Or using Node.js
npx serve .

# Open in browser
open http://localhost:8000
```

## Project Structure

```
/
├── index.html          # Main resume page
├── css/
│   └── style.css       # Custom styles
├── js/
│   └── main.js         # Interaction scripts
└── assets/
    └── images/         # Profile photos and images
```

## Architecture

Single-page portfolio website with the following sections:
- Header with navigation
- Hero section (name, title, introduction)
- About section
- Skills section
- Experience section
- Projects section
- Contact section
- Footer

TailwindCSS is loaded via CDN for styling. Custom CSS handles animations and additional styling. JavaScript provides interactivity (smooth scroll, mobile menu, scroll animations).
