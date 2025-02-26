import { Component, inject, OnInit } from '@angular/core';
import { TodosStore } from './store/todos.store';
import { Todo } from './model/todo.model';
import { TodosListComponent } from "./todos-list/todos-list.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  imports: [TodosListComponent, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ngrx-signal-store';
  store = inject(TodosStore);
  todos:Todo[] = [];

  ngOnInit(): void {
    this.todos = this.store.todos();
    this.loadAllTodos().then(() => console.log("all loaded " + this.todos));
    this.todos = this.store.todos();
  }

  loadAllTodos = async () => await this.store.loadAll();
}
