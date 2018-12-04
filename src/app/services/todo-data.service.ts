import { Injectable } from '@angular/core';
import { Todo } from '../class/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId = 0;
  todos: Todo[] = [];

  constructor() { }

  addTodo(todo: Todo) {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    const todos = this.getAllTodos();
    todos.push(todo);
    this.setTodo(todos);
    return this;
  }

  getAllTodos(): Todo[] {
    const storageItem = JSON.parse(window.localStorage.getItem('app-todos'));
    if(storageItem === null) return [];
    else return storageItem.todos;
  }

  setTodo(todos: Todo[]) {
    window.localStorage.setItem('app-todos', JSON.stringify({todos: todos}));
  }
}
