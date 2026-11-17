import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("ana sayfa", () => {
  test("hero sloganı görünür ve nasıl çalışıyor bağlantısı bölüme kaydırır", async ({
    page,
  }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Göz");
    await expect(heading).toContainText("orada");

    await page.getByRole("button", { name: /Nasıl\s*çalışıyor\?/ }).click();
    await expect(page.locator("#nasil-calisiyor")).toBeInViewport();
  });

  test("Influencer çipiyle arama influencer listesine yönlendirir", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Influencer", exact: true }).click();
    await page.getByRole("searchbox", { name: "Ara" }).fill("kahve");
    await page.getByRole("button", { name: "Ara" }).click();

    await expect(page).toHaveURL(/\/influencerlar\?q=kahve$/);
  });

  test("ciddi ya da kritik erişilebilirlik ihlali yoktur", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );

    expect(serious).toEqual([]);
  });
});

test.describe("ana sayfa mobil görünüm", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  test("360px'te yatay taşmaz", async ({ page }) => {
    await page.goto("/");

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );

    expect(scrollWidth).toBeLessThanOrEqual(360);
  });
});
