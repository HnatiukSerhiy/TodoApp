import {AddTodoFormType, AddTodoType, UpdateTodoFormType, UpdateTodoType} from "../types/todoTypes";

export const getAddTodoPayloadFromFormInput = (todo: AddTodoFormType): AddTodoType => ({
    description: todo.description,
    deadline: todo.deadline?.format("YYYY-MM-DD"),
    categoryId: todo.categoryId
})


export const getUpdateTodoPayloadFromFormInput = (todo: UpdateTodoFormType): UpdateTodoType => ({
    id: todo.id,
    description: todo.description,
    deadline: todo.deadline?.format("YYYY-MM-DD"),
    categoryId: todo.categoryId
})