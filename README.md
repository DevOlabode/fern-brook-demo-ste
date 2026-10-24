# Fernbrook Hair & Barber (demo)

A demo website for a made-up salon and barber shop in Beaumont, Alberta. Built by Samuel Olabode to show local salons and barbers what a simple, mobile-friendly site looks like.

Plain HTML, CSS and JavaScript. No build step. Headings use the Fraunces font from Google Fonts (falls back to Georgia).

## Features

- Services and prices in tabs (Cuts & styling, Barber, Colour, Extras), keyboard accessible
- Live "Open now / Closed now" status in the info strip, calculated in Edmonton time, plus today's row highlighted in the hours table
- Team cards and photo gallery
- Booking request form: validates, blocks closed days (Sunday and Monday), then shows a demo message. Nothing is sent.
- Sticky Call / Book now bar on phones

## Files

- `index.html`: the page
- `styles.css`: all styles (mobile-first, breakpoints at 640px and 960px)
- `script.js`: menu, tabs, open/closed status, booking form

## Deploy on Vercel

1. Push this folder to GitHub (or a repo with one folder per demo).
2. Vercel: Add New > Project > import the repo. Set Root Directory to this folder if needed.
3. Framework preset: Other. No build command. Deploy.

Or from this folder: `npx vercel` then `npx vercel --prod`.

## Before sharing

- Check it on your phone and make sure the photos load.
- Photos are hotlinked from Unsplash (free Unsplash License). For reliability, download them into an `images/` folder and update the `src` paths.
- The address, phone number and team names are made up on purpose. Your real contact details are in the demo bar and footer.
- Keep `<meta name="robots" content="noindex">` so the fake business stays out of Google.

## Photo credits (Unsplash)

Lindsay Cash (hero), Agustin Fernandez, Adam Winger, Nathon Oski, delfina pan, Andrea Donato, Barney Goodman.
