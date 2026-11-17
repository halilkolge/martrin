import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("bileşen önizleme erişilebilirliği", () => {
  test("ciddi ya da kritik erişilebilirlik ihlali yoktur", async ({ page }) => {
    await page.goto("/ui");

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );

    expect(serious).toEqual([]);
  });

  test("sayfa noindex meta etiketi taşır", async ({ page }) => {
    await page.goto("/ui");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  });
});

test.describe("mobil görünüm", () => {
  test.use({ viewport: { width: 360, height: 800 } });

  for (const path of ["/", "/ui"]) {
    test(`${path} sayfası 360px'te yatay taşmaz`, async ({ page }) => {
      await page.goto(path);

      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );

      expect(scrollWidth).toBeLessThanOrEqual(360);
    });
  }
});

test.describe("masaüstü görünüm", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("header logosu ve en az dört menü bağlantısı görünür", async ({
    page,
  }) => {
    await page.goto("/");

    const header = page.getByRole("banner");

    await expect(
      header.getByRole("link", { name: "Martrin ana sayfa" }),
    ).toBeVisible();

    const menuLinks = header
      .getByRole("navigation", { name: "Ana menü" })
      .getByRole("link");
    const count = await menuLinks.count();

    expect(count).toBeGreaterThanOrEqual(4);

    for (let index = 0; index < count; index += 1) {
      await expect(menuLinks.nth(index)).toBeVisible();
    }
  });
});
