import { Component, inject, mergeApplicationConfig } from '@angular/core';
import { MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TodosStore } from '../store/todos.store';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle'
import { MatListOption,MatSelectionList} from '@angular/material/list'
import { MatSuffix } from '@angular/material/form-field';

@Component({
  selector: 'todos-list',
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatLabel,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatSelectionList,
    MatListOption,
    MatSuffix
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);


  async onAddTodo(inputValue: string) {
    await this.store.addTodoPartial(inputValue);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }
}
