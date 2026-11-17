import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("influencer arama", () => {
  test("kadın filtresi URL ve yenileme sonrasında korunur", async ({
    page,
  }) => {
    await page.goto("/influencerlar");
    await page.getByRole("button", { name: "Kadın" }).click();

    await expect(page).toHaveURL(/gender=female/);
    await expect(page.getByText("5 içerik üreticisi bulundu")).toBeVisible();
    await expect(page.locator("article")).toHaveCount(5);

    await page.reload();
    await expect(page.getByRole("button", { name: "Kadın" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator("article")).toHaveCount(5);
  });

  test("sonuç yok durumu tüm filtreleri sıfırlar", async ({ page }) => {
    await page.goto(
      "/influencerlar?city=Nev%C5%9Fehir&gender=male&min=1000000",
    );

    await expect(
      page.getByText("Bu filtrelere uyan içerik üreticisi yok"),
    ).toBeVisible();
    await page.getByRole("link", { name: "Filtreleri sıfırla" }).click();
    await expect(page).toHaveURL("/influencerlar");
    await expect(page.locator("article")).toHaveCount(8);
  });

  test("360px'te filtreler kapalı başlar, açılır ve yatay taşma olmaz", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/influencerlar");

    const toggle = page.getByRole("button", { name: "Filtreler" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("group", { name: "Cinsiyet" })).toBeVisible();

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(360);
  });

  test("sayfada ciddi veya kritik erişilebilirlik ihlali yoktur", async ({
    page,
  }) => {
    await page.goto("/influencerlar");

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );

    expect(serious).toEqual([]);
  });
});
