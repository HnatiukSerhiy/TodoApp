import {AddTodoFormType, AddTodoType, UpdateTodoFormType, UpdateTodoType} from "../types/todoTypes";

export const getAddTodoPayloadFromFormInput = (todo: AddTodoFormType): AddTodoType => ({
    description: todo.description,
    deadline: todo.deadline !== undefined ? todo.deadline?.format("YYYY-MM-DD") + 'T00:00:00' : undefined,
    categoryId: todo.categoryId === 0 ? undefined : todo.categoryId
})


export const getUpdateTodoPayloadFromFormInput = (todo: UpdateTodoFormType): UpdateTodoType => ({
    id: todo.id,
    description: todo.description,
    deadline: todo.deadline !== undefined ? todo.deadline?.format("YYYY-MM-DD") + 'T00:00:00' : undefined,
    categoryId: todo.categoryId === 0 ? undefined : todo.categoryId
})