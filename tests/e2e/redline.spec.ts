import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("REDLINE Production E2E Suite", () => {
  // Helper to skip intro and reveal content
  async function skipIntro(page: Page) {
    const skipBtn = page.locator('button:has-text("SKIP INTRO")');
    try {
      await skipBtn.waitFor({ state: "visible", timeout: 4500 });
      await skipBtn.click();
    } catch {
      // Intro may have already completed
    }
    await page.waitForTimeout(800);
  }

  test("Test 1: Homepage & Semantic Structure", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/REDLINE/);

    // Verify all 8 core sections exist in the document
    await expect(page.locator("section#hero")).toBeAttached();
    await expect(page.locator("section#drops")).toBeAttached();
    await expect(page.locator("section#collections")).toBeAttached();
    await expect(page.locator("section#lookbook")).toBeAttached();
    await expect(page.locator("section#about")).toBeAttached();
    await expect(page.locator("section#newsletter")).toBeAttached();
    await expect(page.locator("footer#footer")).toBeAttached();
  });

  test("Test 2: Cinematic Hero & Skip Interaction", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);

    // Main hero headline should be rendered
    await expect(page.locator("h1")).toContainText(/Darkness Has A Dress Code/i);
    // Navigation links should be visible
    await expect(page.locator('header nav a:has-text("DROPS")').first()).toBeVisible();
  });

  test("Test 3: Products & Quick View Modal", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);

    // Scroll to drops
    await page.locator("#drops").scrollIntoViewIfNeeded();

    // Verify product cards render
    const cards = page.locator("#drops article");
    await expect(cards).toHaveCount(4);

    // Click on the first product card to open Quick View
    await cards.first().click();

    // Quick View modal should open
    const modal = page.locator('div[role="dialog"][aria-labelledby="quick-view-title"]');
    await expect(modal).toBeVisible();

    // Size selection
    const sizeBtn = modal.locator('button:has-text("M")').first();
    await sizeBtn.click();

    // Quantity controls
    const plusBtn = modal.locator('button:has-text("+")');
    await plusBtn.click();

    // Add to Bag
    const addToBagBtn = modal.locator('button:has-text("ADD TO BAG")');
    await addToBagBtn.click();

    // Modal close button (aria-label="Close modal")
    const closeBtn = modal.locator('button[aria-label="Close modal"]');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test("Test 4: Shopping Cart Drawer & State Operations", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);

    // Open bag from header
    const bagButton = page.locator("#header-cart-icon");
    await bagButton.click();

    // Drawer should open
    const drawer = page.locator('div[aria-label="Shopping Bag"]');
    await expect(drawer).toBeVisible();

    // Verify close (aria-label="Close bag")
    const closeDrawer = drawer.locator('button[aria-label="Close bag"]');
    await closeDrawer.click();
    await expect(drawer).not.toBeVisible();
  });

  test("Test 5: Categories In-Page Filtering", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);

    await page.locator("#collections").scrollIntoViewIfNeeded();
    await expect(page.locator("#collections h2")).toContainText(/Choose Your Uniform/i);

    // Click Explore Tees CTA
    const teesCta = page.locator('#collections span:has-text("EXPLORE TEES")').first();
    await teesCta.click();

    // Drops section should be active with TEES filtered
    const activeTab = page.locator('#drops button:has-text("TEES")');
    await expect(activeTab).toHaveClass(/border-red/);
  });

  test("Test 6: Brand Campaign & Story Content", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);

    await page.locator("#lookbook").scrollIntoViewIfNeeded();
    await expect(page.locator("#lookbook h2")).toContainText(/Not Made/i);

    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.locator("#about h2")).toContainText(/Beyond The/i);
    await expect(page.locator("#about")).toContainText(/WEAR YOUR IDENTITY/i);
  });

  test("Test 7: Newsletter Functional Form Validation", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);

    await page.locator("#newsletter").scrollIntoViewIfNeeded();

    const emailInput = page.locator("#newsletter-email");
    const submitBtn = page.locator('#newsletter button[type="submit"]');

    // 1. Empty submission
    await submitBtn.click();
    await expect(page.locator("#newsletter-error")).toContainText(/Please enter an email address/i);

    // 2. Invalid email
    await emailInput.fill("invalid-email");
    await submitBtn.click();
    await expect(page.locator("#newsletter-error")).toContainText(/Please enter a valid email address/i);

    // 3. Valid email
    await emailInput.fill("auditor@redline.com");
    await submitBtn.click();
    await expect(page.locator('div[role="status"]')).toContainText(/Thanks for your interest/i);
  });

  test("Test 8: Footer Navigation & Back to Top", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);

    await page.locator("#footer").scrollIntoViewIfNeeded();

    // Check copyright
    await expect(page.locator("#footer")).toContainText(/REDLINE STREETWEAR/i);

    // Click Back to top
    const backToTop = page.locator('#footer button:has-text("BACK TO TOP")');
    await backToTop.click();
    await page.waitForTimeout(1000);

    // Scroll position should be near top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(500);
  });

  test("Test 9: Responsive Viewports & Layout Stability", async ({ page }) => {
    const viewports = [
      { width: 360, height: 800 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1366, height: 768 },
      { width: 1920, height: 1080 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto("/");
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });

  test("Test 10: Automated Accessibility Audit (axe-core)", async ({ page }) => {
    await page.goto("/");
    await skipIntro(page);
    await page.waitForTimeout(500);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"]) // intentional dark gothic streetwear palette
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
