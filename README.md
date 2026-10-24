# Fernbrook Hair & Barber (demo)

A demo website for a made-up salon and barber shop in Beaumont, Alberta. Built by Samuel Olabode to show local salons and barbers what a simple, mobile-friendly site looks like.

Plain HTML, CSS and JavaScript. No build step. Headings use Bodoni Moda and body text uses Figtree, both from Google Fonts.

## Features

- Prices in tabs (Cuts & styling, Barber, Colour, Extras), with a hair-length switch (short, shoulder, long) that updates the length-based prices
- Walk-in status in Edmonton time (walk-ins Tuesday to Thursday), shown under the hero and in the phone bar, plus today highlighted in the weekly hours
- Team list with "Book with" links that fill in the stylist on the booking form
- Booking request form: validates, blocks closed days, only allows evening slots on Thursday and Friday, shows the chosen service's time and price, then shows a demo message. Nothing is sent.
- Sticky walk-in status and Book bar on phones

## Files

- `index.html`: the page
- `styles.css`: all styles (mobile-first, breakpoints at 640px and 960px)
- `script.js`: menu, price tabs and hair length, walk-in status, booking form

## Deploy on Vercel

1. Push this folder to GitHub (or a repo with one folder per demo).
2. Vercel: Add New > Project > import the repo. Set Root Directory to this folder if needed.
3. Framework preset: Other. No build command. Deploy.

Or from this folder: `npx vercel` then `npx vercel --prod`.

## Before sharing

- Check it on your phone and make sure the photos load.
- Photos are hotlinked from Unsplash (free Unsplash License). For reliability, download them into an `images/` folder and update the `src` paths.
- The address and team names are made up on purpose. Every phone number on the site is your real one (825-461-1264).
- Keep `<meta name="robots" content="noindex">` so the fake business stays out of Google.

## Photo credits (Unsplash)

Lindsay Cash (hero), Agustin Fernandez, Adam Winger, Nathon Oski, delfina pan, Andrea Donato, Barney Goodman.
