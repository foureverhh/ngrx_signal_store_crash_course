import { Component, inject, OnInit, Pipe } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos.store';
import { Todo } from './model/todo.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ngrx-signal-store';
  store = inject(TodosStore);
  todos:Todo[] = [];

  ngOnInit(): void {
    this.todos = this.store.todos()
  }

}
