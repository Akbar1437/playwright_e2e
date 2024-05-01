import { Page } from "@playwright/test";

export default class TodoPage {
  private get welcomeMessage() {
    return `[data-testid=welcome]`;
  }

  async load(page: Page) {
    await page.goto("/todo");
  }
  getWelcomeMessageElement(page: Page) {
    return page.locator(this.welcomeMessage);
  }

  private get deleteIcon() {
    return `[data-testid=delete]`;
  }
  private get noTodosMessage() {
    return `[data-testid=no-todos]`;
  }

  private get todoItemIcon() {
    return `[data-testid=todo-item]`;
  }

  async deleteTodo(page: Page) {
    await page.click(this.deleteIcon);
  }

  async getNoTodoMessage(page: Page) {
    return page.locator(this.noTodosMessage);
  }

  async getTodoItem(page: Page) {
    return page.locator(this.todoItemIcon);
  }
}
