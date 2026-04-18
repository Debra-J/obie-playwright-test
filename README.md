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

## Setup

```bash
npm install
npx playwright install
```

## Run the test

```bash
npx playwright test --headed
```

## Files

- `hptest.spec.js` — the test file
- `obie-homepage.png` — screenshot captured during the test run
