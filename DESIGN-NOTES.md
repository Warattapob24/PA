# PA website redesign

## Changes
- Retained all seven report sections, all 14 detail datasets, original statistics, and original click targets.
- Added the supplied full-resolution report cover without cropping, with a full-image link.
- Added a sticky navigation bar and mobile menu, a skip link, keyboard support, dialog focus management, and reduced-motion styling.
- Introduced navy/teal surfaces, restrained purple/orange accents, consistent cards, readable Thai text, and responsive spacing.
- Removed GSAP dependencies and runtime Tailwind compilation. Report content and counters are visible immediately.
- Improved display of the original short statistical expressions without a math-rendering dependency.

## Files
- `index.html`: original report content and page structure.
- `assets/details.js`: all original detail content.
- `assets/site.js`: navigation and accessible dialog behavior.
- `assets/site.css`: visual design and responsive rules.
- `assets/utilities.css`: generated Tailwind utility stylesheet.
- `assets/pa-cover.png`: supplied original image (unaltered).

## Rebuild utilities after changing utility classes
Run from the repository root:

```sh
npx --yes tailwindcss@3.4.17 -i styles/input.css -o assets/utilities.css --content index.html,assets/details.js --minify
```

## Validation
- Compared the original text, section count, click handlers, and detail data with the updated sources.
- Opened all 14 detail dialogs using the keyboard and closed them with Escape.
- Checked mobile menu behavior and widths 320, 390, 768, and 1440 pixels; no document horizontal overflow or broken cover image.
- Google Fonts and Phosphor icons remain external dependencies. The music-game preview retains the original illustrative behavior.
