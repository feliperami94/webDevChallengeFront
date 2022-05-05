const types ={
    getCategories: 'get-categories',
    createCategory: 'create-category',
    deleteCategory:'delete-category',
    createTask: 'create-task',
    deleteTask: 'delete-task',
    updateTask: 'update-task',
}

const initialStore = {
    categories : [
        {id:2, categoryName: "Family"},
        {id:4, categoryName: "Music"},

    ],
    tasks : [
        {id:3, taskMessage: "Hangout with my parents",taskStatus: false, fkCategory: 2},
        {id:5, taskMessage: "Watch a movie with my nephew",taskStatus: false, fkCategory: 2},
        {id:7, taskMessage: "MF DOOM",taskStatus: false, fkCategory: 4},
        {id:9, taskMessage: "A Tribe Called Quest",taskStatus: false, fkCategory: 4}
    ]
}

const storeReducer = (store, action) => {
    switch(action.type){
        case types.createCategory:
            const newCategoryId = Math.floor(Math.random()*10000);
            const newCategory = {
                id: newCategoryId,
                categoryName: action.payload
            }
            
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

export { initialStore, types }
export default storeReducer