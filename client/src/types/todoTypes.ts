import {CategoryType} from "./categoryTypes";

export type TodoType = {
    id: number
    description: string
    deadline: string
    doneTime: string
    category: CategoryType
    isCompleted: boolean
}

export type AddTodoType = {
    description: string
    deadline: string
    categoryId: number
}

export type UpdateTodoType = {
    id: number
    description: string
    deadline: string
    categoryId: number
}