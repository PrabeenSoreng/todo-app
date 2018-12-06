import { TodoActions, ActionTypes } from './todo.actions';
import { Todo } from '../class/todo';

const initialState: Todo = {
    id: 1,
    title: 'Cook dinner',
    date: '2018-11-18',
    complete: false
};

export function todoReducer(state = [initialState], action: TodoActions) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case ActionTypes.ADD_TODO: {
            action.payload.id = state.length + 1;
            return [...state, action.payload];
        }
        case ActionTypes.UPDATE_TODO: {
            return state.map(todo => {
                return todo.id === action.payload.id ? action.payload.newTodo : todo;
            });
        }
        default: 
            return state;
    }
}