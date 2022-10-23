import { test, expect } from '@playwright/test'

test('homepage has Playwright in title and get started link linking to the intro page', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/sign-in?redirect=%2F')

  await expect(page).toHaveTitle(/Sabito/)

  await expect(page.getByText('The best place for messaging')).toBeVisible()

  await page.getByRole('button').click()
})
