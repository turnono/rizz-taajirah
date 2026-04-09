import { test, expect } from '@playwright/test';

test('verify landing page', async ({ page }) => {
  await page.goto('https://taajirah.web.app');
  await expect(page).toHaveTitle(/Taajirah Systems/);
  const headline = await page.textContent('h1');
  console.log('Headline found:', headline);
  expect(headline).toContain('Govern AI Spend');
});
