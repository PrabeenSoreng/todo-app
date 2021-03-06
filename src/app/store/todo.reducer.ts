import { TodoActions, ActionTypes } from './todo.actions';
import { Todo } from '../class/todo';

const initialState: Todo = {
    id: 1,
    title: 'Cook dinner',
    date: '2018-11-18',
    complete: false
};

export function todoReducer(state = [], action: TodoActions) {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case ActionTypes.LOAD_TODO: {
            return [...state, action.payload];
        }
        case ActionTypes.ADD_TODO: {
            action.payload.id = state.length + 1;
            return [...state, action.payload];
        }
        case ActionTypes.UPDATE_TODO: {
            return state.map(todo => {
                return todo.id === action.payload.id ? action.payload.newTodo : todo;
            });
        }
        case ActionTypes.TOGGLE_TODO: {
            return state.map(todo => {
                return todo.id === action.payload.id ? Object.assign({}, todo, {complete: !action.payload.complete}) : todo;
            });
        }
        case ActionTypes.DELETE_TODO: {
            return state.filter(todo => todo.id !== action.payload.id);
        }
        default: 
            return state;
    }
}