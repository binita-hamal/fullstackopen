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

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "log in" }).click();
      await page.getByLabel(/username/i).fill("bini");
      await page.getByLabel(/password/i).fill("password");
      await page.getByRole("button", { name: /^login$/i }).click();

      await expect(page.getByText(/bini logged in/i)).not.toBeVisible();
    });

    test("a blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: /create new blog/i }).click();

      await page.getByLabel(/title/i).fill("kite runner");
      await page.getByLabel(/author/i).fill("khaled");
      await page.getByLabel(/url/i).fill("google.com");

      await page.getByRole("button", { name: /create/i }).click();

      //visible
      const blogList = page.locator(".blog-summary");
      await expect(blogList.last().getByText("kite runner")).toBeVisible();
      await expect(blogList.last().getByText("khaled")).toBeVisible();
    });

    test("increments the like when like button is clicked", async ({
      page,
    }) => {
      // await page.getByRole("button", { name: /view/i }).click();

      const title = "monster" + Date.now();
      await page.getByRole("button", { name: /create new blog/i }).click();
      await page.getByLabel("title").fill(title);
      await page.getByLabel("author").fill("test author");
      await page.getByLabel("url").fill("test.com");
      await page.getByRole("button", { name: /^create$/i }).click();

      const blogCard = page.getByTestId(/blog-/).filter({
        has: page.getByText(title),
      });

      await blogCard.getByRole("button", { name: /view/i }).click();
      await expect(blogCard.getByText(/likes 0/)).toBeVisible();
      await blogCard.getByRole("button", { name: /like/i }).click();
      await expect(blogCard.getByText(/likes 1/)).toBeVisible();
    });

    test("the user who added the blog can delete the blog", async ({
      page,
    }) => {
      const title = "test" + Date.now();
      await page.getByRole("button", { name: /create new blog/i }).click();
      await page.getByLabel("title").fill(title);
      await page.getByLabel("author").fill("test bini");
      await page.getByLabel("url").fill("fifi.com");
      await page.getByRole("button", { name: /^create$/i }).click();

      const blogCard = page.getByTestId(/blog-/).filter({
        has: page.getByText(title),
      });

      await blogCard.getByRole("button", { name: /view/i }).click();

      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
      });

      await blogCard.getByRole("button", { name: /remove/i }).click();

      await expect(blogCard).not.toBeVisible();
    });

    //5.22 exercise
    //user a creates a blog, only a can seee the remove button
    //user b logs in, expands the blog, can't see the remove button

    test("only the user who added the blog can see the blog remove button", async ({
      page,
      request,
    }) => {
      await request.post("http://localhost:4000/api/testing/reset");

      const userA = {
        username: "bini",
        password: "password",
      };
      const userB = {
        username: "tinku",
        password: "pass1234",
      };

      await request.post("http://localhost:4000/api/users", {
        data: userA,
      });
      await request.post("http://localhost:4000/api/users", {
        data: userB,
      });

      //login as user a, create a blog

      await page.goto("http://localhost:5173");
      await page.getByRole("button", { name: /log in/i }).click();

      await page.getByLabel(/username/i).fill(userA.username);
      await page.getByLabel(/password/i).fill(userA.password);
      await page.getByRole("button", { name: /^login$/i }).click();

      await expect(page.getByText(/bini logged in/i)).toBeVisible();

      const title = "blog created by user A" + Date.now();
      await page.getByRole("button", { name: /create new blog/i }).click();
      await page.getByLabel(/title/i).fill(title);
      await page.getByLabel(/author/i).fill("user A");
      await page.getByLabel(/url/i).fill("userA.com");
      await page.getByRole("button", { name: /^create$/i }).click();

      const blogCard = page.getByTestId(/blog-/).filter({
        has: page.getByText(title),
      });

      await expect(blogCard).toBeVisible();
      await page.getByRole("button", { name: /log out/i }).click();

      //login as user b
      await page.getByRole("button", { name: /log in/i }).click();

      await page.getByLabel(/username/i).fill(userB.username);
      await page.getByLabel(/password/i).fill(userB.password);
      await page.getByRole("button", { name: /^login$/i }).click();

      // await expect(page.getByText(title)).toBeVisible();
      //find blog created by user A
      const blogCardB = page.getByTestId(/blog-/).filter({
        has: page.getByText(title),
      });

      await expect(blogCardB).toBeVisible();

      await blogCardB.getByRole("button", { name: /view/i }).click();
      await expect(
        blogCard.getByRole("button", { name: /remove/i })
      ).toHaveCount(0);

      //login basck as user a to confirm delete button is visible
      await page.getByRole("button", { name: /log out/i }).click();
      await page.getByRole("button", { name: /log in/i }).click();

      await page.getByLabel(/username/i).fill(userA.username);
      await page.getByLabel(/password/i).fill(userA.password);
      await page.getByRole("button", { name: /^login$/i }).click();

      const blogCardA = page.getByTestId(/blog-/).filter({
        has: page.getByText(title),
      });

      await blogCardA.getByRole("button", { name: /view/i }).click();

      await expect(
        blogCardA.getByRole("button", { name: /remove/i })
      ).toBeVisible();
    });
  });
});
