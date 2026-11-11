# HisabPro — Smart Percentage Calculator

Hindi-first responsive percentage calculator built with React and Vite.

## Exact calculation and rounding policy

For an original amount:

1. Calculate 13% of the original amount. **Round only this 13% amount** to the nearest whole rupee using half-up rounding (50 paise rounds up).
2. Add that rounded 13% amount to the original amount. Keep the updated total to 2 decimal places.
3. Calculate 10% from the **original amount**, not from the updated total. Keep the 10% amount and the new updated total to 2 decimal places.
4. Calculate 18% from the latest Step 2 total. Keep the 18% amount and final total to 2 decimal places.

No whole-rupee rounding is applied after the first 13% amount. All later values are kept to two decimal places for calculations and display.

## Example

For an original amount of ₹10,000.00:

- 13% = ₹1,300.00 (rounded to a whole rupee); updated total = ₹11,300.00.
- 10% of the original ₹10,000.00 = ₹1,000.00; updated total = ₹12,300.00.
- 18% of ₹12,300.00 = ₹2,214.00; final total = **₹14,514.00**.

## Features

- Live calculation with detailed Hindi instructions.
- Only the first 13% amount is rounded to a whole rupee.
- All subsequent amounts and totals retain two decimal places.
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

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

No environment variables or backend database are required. Pushes to the connected Git repository trigger new deployments.

## History storage

Saved history stays in localStorage on the current browser/device. It is not synchronized between devices. Clearing browser storage removes it.
