import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import config from "../playwright.config";

export default class SignupPage {
  async load(page: Page) {
    await page.goto("/signup");
  }

  private get firsNameInput() {
    return `[data-testid=first-name]`;
  }
  private get lastNameInput() {
    return `[data-testid=last-name]`;
  }
  private get EmailInput() {
    return `[data-testid=email]`;
  }
  private get PasswordInput() {
    return `[data-testid=password]`;
  }
  private get ConfirmPasswordInput() {
    return `[data-testid=confirm-password]`;
  }
  private get SubmitInput() {
    return `[data-testid=submit]`;
  }
  async signup(page: Page, user: User) {
    await page.fill(this.firsNameInput, user.getFirstName());
    await page.fill(this.lastNameInput, user.getLastName());
    await page.fill(this.EmailInput, user.getEmail());
    await page.fill(this.PasswordInput, user.getPassword());
    await page.fill(this.ConfirmPasswordInput, user.getPassword());
    await page.click(this.SubmitInput);
  }

  async signupUsingAPI(
    request: APIRequestContext,
    user: User,
    context: BrowserContext
  ) {
    const response = await new UserApi().signup(request, user);

    const data = await response.json();
    const accessToken = data.access_token;
    const firstName = data.firstName;
    const userId = data.userID;

    await context.addCookies([
      {
        name: "access_token",
        value: accessToken,
        url: config.use?.baseURL,
      },
      {
        name: "firstName",
        value: firstName,
        url: config.use?.baseURL,
      },
      {
        name: "userID",
        value: userId,
        url: config.use?.baseURL,
      },
    ]);
  }
}
