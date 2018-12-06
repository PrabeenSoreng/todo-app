import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from './class/todo';
import { TodoDataService } from './services/todo-data.service';
import * as TodoActions from './store/todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newTodo = new Todo();

  todos$: Observable<Todo[]>;
  todo: any;
  editForm: FormGroup
  titleValue: string;
  dateValue: string;
  isEdited = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private todoService: TodoDataService) {}

    ngOnInit() {
      this.todos$ = this.store.select('todos')
    }

  get todos() {
    // return this.todoService.getAllTodos();
    return this.todos$;
  }

  addTodo() {
    if(this.newTodo.title && this.newTodo.date) {
      // this.todoService.addTodo(this.newTodo);
      this.store.dispatch(new TodoActions.AddTodo(this.newTodo));
      this.newTodo = new Todo();
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
    // this.todoService.updateTodo(this.todo.id, this.editForm.value);
    const updatedTodo = {
      id: this.todo.id,
      title: this.editForm.value.title,
      date: this.editForm.value.date,
      complete: false
    };
    this.store.dispatch(new TodoActions.UpdateTodo({id: this.todo.id, newTodo: updatedTodo}));
    this.isEdited = true;
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
  }
}
