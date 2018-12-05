import { Component } from '@angular/core';
import { Todo } from './class/todo';
import { TodoDataService } from './services/todo-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodo = new Todo();

  editForm: FormGroup
  todo: any;
  titleValue: string;
  dateValue: string;
  isEdited = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private todoService: TodoDataService) {}

  get todos() {
    return this.todoService.getAllTodos();
  }

  addTodo() {
    if(this.newTodo.title && this.newTodo.date) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo.title = '';
      this.newTodo.date = '';
    }
  }

  completeTodo(todo) {
    this.todoService.completeTodo(todo);
  }

  deleteTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  initForm(todo) {
    if(todo.date.year && todo.date.month) {
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [`${todo.date.year}-${todo.date.month}-${todo.date.day}`, Validators.required]
      });
    }
    if(todo.date && !todo.date.month) {
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [`${todo.date}`, Validators.required]
      });
    }
  }

  open(content, todo) {
    this.isEdited = false;
    this.initForm(todo);
    this.todo = {
      id: todo.id,
      title: todo.title,
      date: todo.date,
      complete: todo.complete
    };
    if(todo.date.year && todo.date.month) {
      this.titleValue = `${todo.title}`;
      this.dateValue = `${todo.date.year}-${todo.date.month}-${todo.date.day}`;
    }
    if(todo.date && !todo.date.month) {
      this.titleValue = `${todo.title}`;
      this.dateValue = `${this.todo.date}`;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo.id, this.editForm.value);
    this.isEdited = true;
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
  }
}
