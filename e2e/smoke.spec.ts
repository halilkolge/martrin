import { expect, test } from "@playwright/test";

test("ana sayfa Martrin başlığını gösterir", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Göz");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("orada");
  await expect(page).toHaveTitle("Martrin");
});
