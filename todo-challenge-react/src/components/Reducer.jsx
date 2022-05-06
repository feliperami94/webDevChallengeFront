const types ={
    getCategories: 'get-categories',
    createCategory: 'create-category',//
    deleteCategory:'delete-category',//
    createTask: 'create-task',
    deleteTask: 'delete-task',//
    updateTask: 'update-task',
}



const storeReducer = (store, action) => {
    switch(action.type){
        case types.getCategories:
            const allCategoriesFetched = {
                ...store, categories: action.payload
            }
            return allCategoriesFetched
        default:
            return store;
    }
}

export { types }
export default storeReducer