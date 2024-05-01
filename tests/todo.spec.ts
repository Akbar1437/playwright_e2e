import { expect, test } from "@playwright/test";
import TodoApi from "../apis/TodoApis";
import User from "../models/User";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import NewTodoPage from "../pages/NewTodoPage";

test("should be able to add a new todo", async ({ page, request, context }) => {
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.signupUsingAPI(request, user, context);
  const newTodoPage = new NewTodoPage();
  await newTodoPage.load(page);
  await newTodoPage.addNewTodo(page, "Todo learn playwright");
  const todoPage = new TodoPage();
  const todoItem = await todoPage.getTodoItem(page);
  expect(await todoItem.innerText()).toEqual("Todo learn playwright");
});

test("should be able to delete a todo", async ({ page, request, context }) => {
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.signupUsingAPI(request, user, context);
  const newTodoPage = new NewTodoPage();
  await newTodoPage.addTodoUsingApi(request, user);
  const todoPage = new TodoPage();
  await todoPage.load(page);
  await todoPage.deleteTodo(page);
  const noTodosMessage = await todoPage.getNoTodoMessage(page);
  await expect(noTodosMessage).toBeVisible({ timeout: 5000 });
});
