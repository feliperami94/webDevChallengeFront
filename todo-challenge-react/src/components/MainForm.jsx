import React, { useContext } from 'react'
import { StoreContext } from './StoreProvider'
import CategoryForm from './CategoryForm'
import { useState } from 'react'

const MainForm = () => {

    const [store, dispatch] = useContext(StoreContext);
    const {categories, tasks} = store;

    const [categoryTitle, setCategoryTitle] = useState('');

    const addingCategoryTitle = (event) =>{
        setCategoryTitle(event.target.value)
    }

    const addCategory = (event) => {
        event.preventDefault();
        if(categoryTitle){
            dispatch({
                type: 'create-category',
                payload: categoryTitle
                
            })
        }
    }

  return (
    <div>
        <h1>Dashboard</h1>
        <form action="">
        <input type="text" onChange={addingCategoryTitle} />
        <button onClick={(event) => {addCategory(event)} }>Create Category</button>
        <br />
        <CategoryForm/>
        </form>
    </div>
  )
}

export default MainForm