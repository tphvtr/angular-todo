import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo, TodoService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo';
  name: FormControl = new FormControl('', Validators.required);
  search: FormControl = new FormControl();
  todos$: Observable<Todo[]>;

  constructor(private _todosService: TodoService) {
    this.todos$ = this._todosService.todos$;
    this.search.valueChanges.subscribe(query => this.searchTodo(query));
  }

  addTodo(name: string): void {
    this._todosService.addTodo(name);
    this.name.reset();
  }

  deleteTodo(i: number): void {
    this._todosService.deleteTodo(i);
  }

  searchTodo(query: string): void {
    this._todosService.searchTodo(query);
  }

}
