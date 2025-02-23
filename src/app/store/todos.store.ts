import { NgStyle } from "@angular/common";
import { Todo } from "../model/todo.model";
import { signalStore, withState } from "@ngrx/signals"

export type TodosFilter = "all" | "pending" | "completed";

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
}

const initialState = {
    todos: [],
    loading: false,
    filter: "all"
}

export const TodosStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
);



