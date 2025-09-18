import { test, expect, beforeEach, describe } from "@playwright/test";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:4000/api/testing/reset");
    await request.post("http://localhost:4000/api/users", {
      data: {
        username: "bini",
        password: "password",
      },
    });

    await page.addInitScript(() => localStorage.clear());
    await page.goto("http://localhost:5173");
  });

  test("when clicking login button, login form is shown", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: /log in/i });
    await expect(loginButton).toBeVisible();

    await loginButton.click();

    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /cancel/i })).toBeVisible();
  });

  describe("Login", () => {
    test("success with correct crendentials", async ({ page }) => {
      await page.getByRole("button", { name: /log in/i }).click();

      await page.getByLabel(/username/i).fill("bini");
      await page.getByLabel(/password/i).fill("password");

      await page.getByRole("button", { name: /^login$/i }).click();

      await expect(page.getByText(/bini logged in/i)).toBeVisible();
    });

    test("fails with wrong crendentials", async ({ page }) => {
      await page.getByRole("button", { name: /log in/i }).click();

      await page.getByLabel(/username/i).fill("test");
      await page.getByLabel(/password/i).fill("pass");

      await page.getByRole("button", { name: /^login$/i }).click();

      await expect(page.getByText(/wrong username or password/i)).toBeVisible();

      await expect(page.getByText(/bini logged in/i)).not.toBeVisible();
    });
  });




  describe("when logged in", ()=>{

    beforeEach(async({page})=>{
        await page.getByRole("button", {name:"log in"}).click()
        await page.getByLabel(/username/i).fill("bini")
        await page.getByLabel(/password/i).fill("password")
        await page.getByRole("button", { name: /^login$/i }).click();


        await expect(page.getByText(/bini logged in/i)).not.toBeVisible();
        

    })

    test("a blog can be created", async({page})=>{
        await page.getByRole("button", {name:/create new blog/i}).click()

        await page.getByLabel(/title/i).fill("kite runner")
        await page.getByLabel(/author/i).fill("khaled")
        await page.getByLabel(/url/i).fill("google.com")


        await page.getByRole("button", {name:/create/i}).click()

        //visible
        const blogList = page.locator('.blog-summary')
        await expect(blogList.last().getByText("kite runner")).toBeVisible()
        await expect(blogList.last().getByText("khaled")).toBeVisible()




    })


  })




});
