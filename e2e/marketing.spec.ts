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

test.describe("bilgi sayfaları", () => {
  test("ücretlerde yıllık Pro fiyatını ve faturalamayı gösterir", async ({
    page,
  }) => {
    await page.goto("/ucretler");
    await page.getByRole("button", { name: /Yıllık/ }).click();
    const proPlan = page
      .getByRole("article")
      .filter({ has: page.getByRole("heading", { name: "Pro", exact: true }) });
    await expect(proPlan).toContainText("₺1.241,67 / ay");
    await expect(
      proPlan.getByText("Yıllık ₺14.900 olarak faturalanır", { exact: true }),
    ).toBeVisible();
  });
  test("Ek hizmetler kartının zemini beyaz değildir", async ({ page }) => {
    await page.goto("/ucretler");

    const card = page
      .getByRole("heading", { name: "Ek hizmetler" })
      .locator("..");
    const backgroundColor = await card.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );

    expect(backgroundColor).not.toBe("rgb(255, 255, 255)");
  });
  test("iletişim formu hataları gösterir ve takip numarası üretir", async ({
    page,
  }) => {
    await page.goto("/iletisim");
    await page.getByRole("button", { name: "Gönder", exact: true }).click();
    await expect(page.locator("form").getByRole("alert")).toHaveCount(4);
    const invalidFields = [
      ["Ad soyad", "Ad soyad en az 2 karakter olmalı."],
      ["E-posta", "Geçerli bir e-posta adresi yaz (ornek@alan.com)."],
      ["Mesaj", "Mesaj en az 10 karakter olmalı."],
      [/aydınlatma metnini/i, "Devam etmek için aydınlatma metnini onayla."],
    ] as const;
    for (const [label, errorMessage] of invalidFields) {
      const field = page.getByLabel(label);
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await expect(field).toHaveAccessibleDescription(errorMessage);
    }
    await page.getByLabel("Ad soyad").fill("Elif Aydın");
    await page.getByLabel("E-posta").fill("elif@ornek.com");
    await page.getByLabel("Konu").selectOption("Basın");
    await page.getByLabel("Mesaj").fill("Merhaba, bilgi almak istiyorum.");
    await page.getByLabel(/aydınlatma metnini/i).check();
    await page.getByRole("button", { name: "Gönder", exact: true }).click();
    await expect(page.getByText(/MRT-\d{4}-\d{4}/)).toBeVisible();
  });
  test("footer bilgi bağlantıları ilgili sayfaları açar", async ({ page }) => {
    for (const [label, path] of [
      ["Ücretler ve paketler", "/ucretler"],
      ["İletişim", "/iletisim"],
      ["Belediyeler için", "/belediyeler"],
      ["Emanet ödeme", "/emanet-odeme"],
      ["Yayın kanıtı", "/yayin-kaniti"],
    ] as const) {
      const response = await page.request.get(path);
      expect(response.status(), `${label} ${path}`).toBe(200);
    }
  });
  for (const path of [
    "/ucretler",
    "/iletisim",
    "/belediyeler",
    "/emanet-odeme",
    "/yayin-kaniti",
  ]) {
    test(`${path} ciddi erişilebilirlik ihlali içermez`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(
        results.violations.filter(
          (item) => item.impact === "serious" || item.impact === "critical",
        ),
      ).toEqual([]);
    });
  }
});

test.describe("bilgi sayfaları mobil taşma", () => {
  test.use({ viewport: { width: 360, height: 800 } });
  for (const path of [
    "/ucretler",
    "/iletisim",
    "/belediyeler",
    "/emanet-odeme",
    "/yayin-kaniti",
  ]) {
    test(`${path} 360px genişliğe sığar`, async ({ page }) => {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(360);
    });
  }
});
