import {CategoryType} from "./categoryTypes";
import moment from "moment";

export type TodoType = {
    id: number
    description: string
    deadline?: string
    doneTime?: string
    category?: CategoryType
    isCompleted: boolean
}

export type AddTodoType = {
    description: string
    deadline?: string
    categoryId?: number
}

export type UpdateTodoType = {
    id: number
    description: string
    deadline?: string
    categoryId?: number
}

export type AddTodoFormType = {
    description: string
    deadline?: moment.Moment
    categoryId: number
}

export type UpdateTodoFormType = {
    id: number
    description: string
    deadline?: moment.Moment
    categoryId: number
}

export type SolveTodoType = {
    id: number
    doneTime: string
}