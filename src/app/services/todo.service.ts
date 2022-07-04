import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Todo {
  name: string;
  id: number;
}

@Injectable({providedIn: 'root'})
export class TodoService {
  todos$: Observable<Todo[]>;

  private _todos$ = new BehaviorSubject<Todo[]>([]);
  private _todos: Todo[] = [];
  private _allTodos: Todo[] = [];
  constructor() {
    this.todos$ = this._todos$.asObservable();
  }

  addTodo(name: string): void {
    this._todos.push({name, id: new Date().getTime()});
    this._allTodos = this._todos;
    this._todos$.next(this._todos);
  }

  deleteTodo(i: number): void {
    this._todos.splice(i, 1);
    this._allTodos = this._todos;
    this._todos$.next(this._todos);
  }

  searchTodo(query: string): void {
    query = query.toLocaleLowerCase();
    this._todos = this._allTodos.filter(item => item.name.toLocaleLowerCase().includes(query));
    this._todos$.next(this._todos);
  }

}
