import { test, expect } from '@playwright/test';

test.describe('Svelte Calendar UI (Store-Based)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/kalender');
    await page.waitForTimeout(300); // wait 300 milliseconds

    // Wait for the calendar to render
    await page.waitForSelector('.calendar-cell');

    // Make sure we can access the store
    await page.evaluate(() => {
      if (!window.__tasks) {throw new Error('__tasks store not exposed')};
    });
  });

  test('add a new task', async ({ page }) => {
    const addButton = page.locator('.add-task-button').first();
    await addButton.click();

    const modal = page.locator('div.fixed');
    await expect(modal).toBeVisible();

    await modal.locator('input[placeholder="Taaknaam"]').fill('Test Task');
    await modal.locator('textarea[placeholder="Beschrijving"]').fill('Test description');
    await modal.locator('select').selectOption('In progress');

    await modal.locator('button:has-text("Opslaan")').click();
    await expect(modal).toBeHidden();

    await expect(page.locator('.task-card', { hasText: 'Test Task' })).toBeVisible();

    // Optional: verify store directly
    const tasks = await page.evaluate(() => {
      let value;
      window.__tasks.subscribe(v => value = v)();
      return value;
    });
    expect(tasks.some(t => t.title === 'Test Task')).toBe(true);
  });

  test('drag and drop a task', async ({ page }) => {
    // Add a task to drag
    const addButton = page.locator('.add-task-button').first();
    await addButton.click();
    const modal = page.locator('div.fixed');
    await modal.locator('input[placeholder="Taaknaam"]').fill('Drag Task');
    await modal.locator('button:has-text("Opslaan")').click();
    await expect(modal).toBeHidden();

    const taskCard = page.locator('.task-card', { hasText: 'Drag Task' }).first();
    const targetCell = page.locator('.calendar-cell').nth(1);

    await taskCard.dragTo(targetCell);
    await expect(targetCell.locator('.task-card', { hasText: 'Drag Task' })).toBeVisible();
  });

});
