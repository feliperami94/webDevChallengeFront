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
        case types.deleteTask:
            let storeCategoryContext = store.categories.find(category => category.id === action.payload.fkCategory);
            let newTaskListAfterDelete = storeCategoryContext.taskList.filter(task => task.taskId !== action.payload.taskId);
            storeCategoryContext.taskList = newTaskListAfterDelete;
            let newStoreFiltered = store.categories.filter(category => category.id !== action.payload.fkCategory)
            let newStoreArrayAfterTaskDelete = [...newStoreFiltered, storeCategoryContext]
            let newStore = {...store, categories: newStoreArrayAfterTaskDelete}
            return newStore
        case types.createTask:
            const taskCategoryContext = store.categories.filter(category => 
                category.id !== action.payload.id
            )
            const newStoreArray = [...taskCategoryContext, action.payload]
            const newStoreWithTask = {categories: newStoreArray}

            return newStoreWithTask
        case types.deleteCategory:
            const filteredStore = store.categories.filter(category => category.id !== action.payload)
            const newStoreCategoryDeleted = {
                ...store, categories: filteredStore
            }
            return newStoreCategoryDeleted
        case types.getCategories:
            const allCategoriesFetched = {
                ...store, categories: action.payload
            }
            return allCategoriesFetched
        case types.createCategory:
            const newCategory = [...store.categories, action.payload]
            const stateAddedCategory = {
                ...store,
                categories: newCategory
            }
            return stateAddedCategory
        default:
            return store;
    }
}

export { types }
export default storeReducer