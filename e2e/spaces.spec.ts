import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("alan arama", () => {
  test("AVM LED filtresi URL ve sonuç kartlarını günceller", async ({
    page,
  }) => {
    await page.goto("/alanlar");
    const avmLed = page.getByRole("checkbox", {
      name: "AVM LED",
      exact: true,
    });
    await avmLed.check();

    await expect(page).toHaveURL(/(?:\?|&)type=avm_led(?:&|$)/);
    await expect(avmLed).toBeChecked();
    await expect(page.locator("[data-space-id]")).toHaveCount(1);
    await expect(page.locator("[data-space-id]")).toContainText(
      "Kentpark Dev LED",
    );
  });

  test("AVM LED klavye seçimi odağı korur", async ({ page }) => {
    await page.goto("/alanlar");
    const avmLed = page.getByRole("checkbox", {
      name: "AVM LED",
      exact: true,
    });
    await avmLed.focus();
    await avmLed.press("Space");

    await expect(page).toHaveURL(/(?:\?|&)type=avm_led(?:&|$)/);
    expect(
      await avmLed.evaluate((node) => document.activeElement === node),
    ).toBe(true);
  });

  test("harita aktif alan pinlerini ve OSM atfını gösterir", async ({
    page,
  }) => {
    await page.goto("/alanlar");
    await page.getByRole("button", { name: "Harita", exact: true }).click();

    await expect(page.getByText("6 alan haritada")).toBeVisible();
    await expect(page.locator(".leaflet-marker-icon")).toHaveCount(6);
    await expect(page.locator(".leaflet-control-attribution")).toContainText(
      "OpenStreetMap katkıcıları",
    );
  });

  test("360px ekranda filtre açılır ve yatay taşma olmaz", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/alanlar");

    const toggle = page.getByRole("button", { name: "Filtreler" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("group", { name: "Alan tipi" })).toBeVisible();

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(360);
  });

  test("sayfada ciddi veya kritik erişilebilirlik ihlali yoktur", async ({
    page,
  }) => {
    await page.goto("/alanlar");
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      ),
    ).toEqual([]);
  });
});
