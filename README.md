# Obie Playwright Test

A basic end-to-end test for the [Obie Insurance](https://www.obieinsurance.com) homepage using [Playwright](https://playwright.dev).

## What the test does

- Opens the Obie homepage
- Dismisses the cookie banner
- Verifies the main heading is visible
- Finds the address input and types a test address
- Confirms the "Get protected" button exists
- Confirms the "Get a quote" nav link exists
- Takes a full-page screenshot

## Browsers

The test runs across three browsers:

- Chromium (Chrome)
- Firefox
- WebKit (Safari)

## Setup

```bash
npm install
npx playwright install
```

## Run the test

```bash
npx playwright test
```

This opens all three browsers so you can watch the test run. The test also runs automatically on GitHub Actions whenever code is pushed.

## Files

- `hptest.spec.js` — the test file
- `playwright.config.js` — configures the three browsers
- `obie-homepage.png` — screenshot captured during the test run
