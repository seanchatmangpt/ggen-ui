import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders admitted semantic shell and refuses ambient DO", async ({ page }) => {
  const writeRequests: string[] = [];
  page.on("request", (request) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method())) {
      writeRequests.push(`${request.method()} ${request.url()}`);
    }
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Evidence before standing/i })).toBeVisible();
  await expect(page.getByText("PARTIAL_ALIVE", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Semantic projection navigation" }).getByRole("link")).toHaveCount(7);
  await expect(page.getByText("Only BRCE crosses DO")).toBeVisible();

  await page.getByRole("button", { name: "Construct replay intent" }).click();
  const intent = page.locator("pre.intent");
  await expect(intent).toContainText('"stage": "PREFLIGHT"');
  await expect(intent).toContainText('"admitted": false');
  await expect(intent).toContainText('"refusal": "REFUSED:NO_AUTHORITY"');
  expect(writeRequests, "construct-only UI must not emit write requests").toEqual([]);
});

test("has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");
  const result = await new AxeBuilder({ page }).analyze();
  const severe = result.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
  expect(severe).toEqual([]);
});
