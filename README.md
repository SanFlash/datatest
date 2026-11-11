# HisabPro — Smart Percentage Calculator

Hindi-first responsive percentage calculator built with React and Vite.

## Calculation rules

For an original amount:

1. Calculate 13% of the original amount, round to the nearest whole rupee, add it to the original amount, then round the updated total.
2. Calculate 10% of the **original amount**, round it, add it to the Step 1 total, then round the updated total.
3. Calculate 18% of the latest Step 2 total, round it, add it, then round the final total.

Rounding is half-up for non-negative amounts: 50 paise rounds up. Both each percentage amount and each updated total are rounded before proceeding.

## Features

- Live calculation with step-by-step Hindi explanations.
- Whole-rupee rounding after every stage.
- Browser-local calculation history (up to 50 recent calculations).
- Copy result, print/save as PDF, export history as CSV.
- Responsive mobile and desktop design.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Vercel

Import this repository into Vercel. Settings:

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

No environment variables or backend database are required. Pushes to the connected Git repository trigger new deployments.

## History storage

Saved history stays in localStorage on the current browser/device. It is not synchronized between devices. Clearing browser storage removes it.
