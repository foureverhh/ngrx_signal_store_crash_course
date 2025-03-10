import { Todo } from "../model/todo.model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { TodosService } from '../services/todos.service';
import { computed, inject } from "@angular/core";

export type TodosFilter = "all" | "pending" | "completed";

export type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: "all"
}

export const TodosStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (store, todosService = inject(TodosService)) => ({
            async loadAll() {
                patchState(store, { loading: true });
                const todos = await todosService.getTodos();
                patchState(store, { loading: false, todos: todos})
            },

            async addTodoEntire() {
               // patchState(store, {loading: true});
                const todos = await todosService.addTodoEntire({id: '11', title: 'title entire added', completed : true});
                patchState(store, {todos});
            },

            async addTodoPartial(title: string) {
               // patchState(store, {loading: true});
                const todo = await todosService.addTodoPartial({title: title, completed : true});
                //patchState(store, {loading: false, todos: [...store.todos(), todo]});
                patchState(store, state => ({
                    todos: [...state.todos, todo] 
                }))
            },
            
            async deleteTodo(id: string) {
                //const todos = await todosService.deleteTodo(id);
                patchState(store, (state) => ({
                    todos: [...state.todos.filter(todo => todo.id !== id)]
                }))
            },

            async updateTodo(id:string, completed: boolean) {
                await todosService.updateTodo(id, completed);
                patchState(store, state => ({
                    todos: state.todos.map(todo => todo.id === id ? { ...todo, completed } : todo)
                }))
            },

            updateFilter(filter: TodosFilter) {
                patchState(store, {filter});
            }
        })
    ),
    withComputed(state => ({
        filteredTodos: computed(() => {
            const todos = state.todos();
            switch(state.filter()) {
                case 'all':
                    return todos;
                case 'pending':
                    return todos.filter(todo => !todo.completed)
                case 'completed':
                    return todos.filter(todo => todo.completed)
            }
        })
    }))
);



