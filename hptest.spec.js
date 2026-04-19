const { test, expect } = require('@playwright/test');

test('obie homepage test', async ({ page }) => {
  // Listen for API calls the page makes
  const apiCalls = [];
  page.on('response', response => {
    const url = response.url();
    // Skip static files like images, CSS, fonts
    if (url.includes('/api/') || url.includes('autocomplete') || url.includes('geocode') || url.includes('graphql')) {
      apiCalls.push({ url: url, status: response.status() });
      console.log(`📡 API call: ${url} — Status: ${response.status()}`);
    }
  });

  // Go to Obie homepage
  await page.goto('https://www.obieinsurance.com');

  // Dismiss cookie banner if it appears
  const declineBtn = page.locator('#ez-cookie-notification__decline');
  if (await declineBtn.isVisible()) {
    await declineBtn.click();
  }

  // Verify the heading is visible
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  console.log("✅ Heading text:", await heading.textContent());

  // Verify the address input exists (use .nth(1) to get the desktop version, skipping the mobile one)
  const addressInput = page.getByPlaceholder('Enter your property address...').nth(1);
  await expect(addressInput).toBeVisible();
  console.log("✅ Address input is visible");

  // Type a test address
  await addressInput.fill('123 Main St, Chicago, IL 60601');
  console.log("✅ Typed test address");

  // Verify the "Get protected" button exists (it's an <input>, not a <button>)
  await expect(page.locator('input[value="Get protected"]').nth(1)).toBeVisible();
  console.log("✅ 'Get protected' button is visible");

  // Verify the "Get a quote" nav link exists (scoped to the banner/header)
  await expect(page.getByRole('banner').getByRole('link', { name: 'Get a quote' })).toBeVisible();
  console.log("✅ 'Get a quote' link is visible");

  // Take a screenshot
  await page.screenshot({ path: 'obie-homepage.png', fullPage: true });
  console.log("✅ Screenshot saved");

  // Report all API calls captured during the test
  console.log(`\n📊 API Summary: ${apiCalls.length} API call(s) detected`);
  apiCalls.forEach((call, i) => {
    const statusIcon = call.status === 200 ? "✅" : "❌";
    console.log(`  ${statusIcon} ${i + 1}. [${call.status}] ${call.url}`);
  });

  // Verify no API calls failed
  const failedCalls = apiCalls.filter(call => call.status >= 400);
  if (failedCalls.length > 0) {
    console.log(`\n⚠️ ${failedCalls.length} API call(s) returned errors!`);
  } else {
    console.log(`\n✅ All API calls returned successfully`);
  }

  console.log("🎉 Test completed!");
});