import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle'
import { MatListOption,MatSelectionList} from '@angular/material/list'
import { MatSuffix } from '@angular/material/form-field';
import { CommonModule } from '@angular/common'

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
    MatSuffix,
    CommonModule
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);
  filterSignal = viewChild.required(MatButtonToggleGroup); // use required as the view child is there 
  // 1:00:40
  constructor() {
    effect(()=>{
      const filterElement = this.filterSignal();
      filterElement.value = this.store.filter();
    })
  }

  async onAddTodo(inputValue: string) {
    await this.store.addTodoPartial(inputValue);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: string, completed: boolean) {
    console.log(completed) //? why $event has value of completed?
    await this.store.updateTodo(id, completed);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
