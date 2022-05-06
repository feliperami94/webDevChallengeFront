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
            // console.log(stateAddedCategory)
            return stateAddedCategory
        default:
            return store;
    }
}

export { types }
export default storeReducer