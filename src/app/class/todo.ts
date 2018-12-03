export class Todo {
    id: number;
    title: string;
    date?: any;
    complete: boolean = false;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
