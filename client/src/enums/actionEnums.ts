export const enum ApiActionEnum {
    apiRequest = '/api/request',
    apiSuccess = '/api/success',
    apiError = '/api/error'
}

export const enum TodoActionEnum {
    getCompleted = 'todos/getCompleted',
    getUnCompleted = 'todos/getUnCompleted',
    addTodo = 'todos/add',
    updateTodo = 'todos/update',
    solveTodo = 'todos/solve',
    deleteTodo = 'todos/delete'
}

export const enum CategoryActionEnum {
    get = 'categories/get',
    addCategory = 'categories/add',
    updateCategory = 'categories/update',
    deleteCategory = 'categories/delete'
}

export const enum DataProviderActionEnum {
    change = 'dataProvider/change'
}