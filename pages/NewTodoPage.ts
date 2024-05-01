import { APIRequestContext, Page } from "@playwright/test";
import User from "../models/User";
import TodoApi from "../apis/TodoApis";

export default class NewTodoPage {
  async load(page: Page) {
    await page.goto("/todo/new");
  }

  private get newTodoInput() {
    return `[data-testid=new-todo]`;
  }

  private get submitTaskButton() {
    return `[data-testid=submit-newTask]`;
  }

  async addNewTodo(page: Page, task: string) {
    await page.fill(this.newTodoInput, task);
    await page.click(this.submitTaskButton);
  }

  async addTodoUsingApi(request: APIRequestContext, user: User) {
    await new TodoApi().addTodo(request, user);
  }
}
