import {test, expect, beforeEach, describe} from "@playwright/test"

describe('Blog app', ()=>{

    beforeEach(async ({page})=>{
        await page.goto("http://localhost:5173")
    })

    test('when clicking login button, login form is shown', async({page})=>{
        const loginButton = page.getByRole('button', {name: /log in/i })
        await expect(loginButton).toBeVisible()

        await loginButton.click()

        await expect(page.getByLabel(/username/i)).toBeVisible()
        await expect(page.getByLabel(/password/i)).toBeVisible()
        await expect(page.getByRole('button', {name:/login/i})).toBeVisible()
        await expect(page.getByRole('button', {name:/cancel/i})).toBeVisible()

    })



})