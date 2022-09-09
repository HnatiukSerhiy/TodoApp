import {TodoType} from "../types/todoTypes";
import {CategoryType} from "../types/categoryTypes";

export type UnCompletedTodosDisplayData = {
    key: number
    description: string
    deadline?: string
    category?: string
}

export type CompletedTodosDisplayData = {
    key: number
    description: string
    doneTime?: string
    category?: string
}

export type CategoriesDisplayData = {
    key: number
    name: string
}

export const getUnCompletedTodosDisplayData = (todos: TodoType[]): UnCompletedTodosDisplayData[] => {
    const displayData = [];

    for (const todo of todos) {
        displayData.push({
            key: todo.id,
            description: todo.description,
            deadline: todo.deadline?.substring(0, 10),
            category: todo.category?.name
        } as UnCompletedTodosDisplayData)
    }

    return displayData;
}

export const getCompletedTodosDisplayData = (todos: TodoType[]): CompletedTodosDisplayData[] => {
    const displayData = [];

    for (const todo of todos) {
        displayData.push({
            key: todo.id,
            description: todo.description,
            doneTime: todo.doneTime?.substring(0, 10),
            category: todo.category?.name
        } as CompletedTodosDisplayData)
    }

    return displayData;
}

export const getCategoriesDisplayData = (categories: CategoryType[]): CategoriesDisplayData[] => {
    const displayData: CategoriesDisplayData[] = [];

    for (const category of categories) {
        displayData.push({
            key: category.id,
            name: category.name
        } as CategoriesDisplayData)
    }

    return displayData;
}