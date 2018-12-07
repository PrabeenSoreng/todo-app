import { Action } from '@ngrx/store';
import { Todo } from '../class/todo';

export const ActionTypes = {
    ADD_TODO: 'ADD_TODO',
    UPDATE_TODO: 'UPDATE_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO'
};

export class AddTodo implements Action {
    readonly type = ActionTypes.ADD_TODO;

    constructor(public payload: any) {}
}

export class UpdateTodo implements Action {
    readonly type = ActionTypes.UPDATE_TODO;

    constructor(public payload: {id: number, newTodo: Todo}) {}
}

export class ToggleTodo implements Action {
    readonly type = ActionTypes.TOGGLE_TODO;

    constructor(public payload: Todo) {}
}

export type TodoActions = AddTodo | UpdateTodo | ToggleTodo;