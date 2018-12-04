import { Injectable } from '@angular/core';
import { Todo } from '../class/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  todos: Todo[] = [];

  constructor() {}

  addTodo(todo: Todo) {
    const todos = this.getAllTodos();
    if(todos === []) todo.id = 1;
    else todo.id = this.getCounter() + 1;
    todos.push(todo);
    this.setTodo(todos, todo.id);
    return this;
  }

  getAllTodos(): Todo[] {
    const storageItem = JSON.parse(window.localStorage.getItem('app-todos'));
    if(storageItem === null) return [];
    else return storageItem.todos;
  }

  getCounter(): number {
    const storedCounter = JSON.parse(window.localStorage.getItem('app-todos'));
    if(storedCounter === null) return 0;
    else return storedCounter.counter;
  }

  getTodoById(id: number) {
    const todos = this.getAllTodos();
    return todos.filter(todo => todo.id === id).pop();
  }

  updateTodo(id: number, values: Object = {}) {
    const todo = this.getTodoById(id);
    if(!todo) return null;
    let todos = this.getAllTodos();
    todos = todos.filter(t => t.id !== todo.id);
    const todoValues = Object.assign(todo, values);
    todos.push(todoValues);
    this.setTodo(todos, this.getCounter());
  }

  completeTodo(todo: Todo) {
    const updatedTodo = this.updateTodo(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

  deleteTodoById(id: number) {
    let todos = this.getAllTodos();
    todos = todos.filter(todo => todo.id !== id);
    this.setTodo(todos, this.getCounter());
  }

  setTodo(todos: Todo[], counter: number) {
    window.localStorage.setItem('app-todos', JSON.stringify({todos, counter}));
  }
}
