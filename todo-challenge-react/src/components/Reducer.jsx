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
        case types.createTask:
            const newTasks = [...store.tasks, action.payload];
            const newStoreWithTask = {...store, tasks: newTasks}
            return newStoreWithTask;

        case types.createCategory:
            const newCategories = [...store.categories, action.payload];
            const newStore = {...store, categories: newCategories};
            console.log(newStore)
            return newStore;
        case types.deleteTask:
            const newTasksAfterDelete = store.tasks.filter(task => task.id !== action.payload.id)
            const newStoreAfterDelete = {...store, tasks: newTasksAfterDelete}
            return newStoreAfterDelete;
        case types.deleteCategory:
            const newTasksAfterCategoryDelete = store.tasks.filter(task => task.fkCategory !== action.payload.id)
            const newCategoriesAfterDelete = store.categories.filter(category => category.id !== action.payload.id)
            const newStoreAfterCategoryDelete = {...store, categories: newCategoriesAfterDelete, tasks: newTasksAfterCategoryDelete} 
            return newStoreAfterCategoryDelete;
        default:
            return store;
    }
}

export { types }
export default storeReducer