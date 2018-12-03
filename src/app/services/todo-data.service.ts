import { Injectable } from '@angular/core';
import { Todo } from '../class/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId = 0;
  todos: Todo[] = [];

  constructor() { }

  getAllTodos(): Todo[] {
    const storageItem = JSON.parse(window.localStorage.getItem('app-todos'));
    if(storageItem === null) return [];
    else return storageItem.todos;
  }
}
