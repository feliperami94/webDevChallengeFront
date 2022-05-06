import React, { useContext, useRef } from 'react'
import { StoreContext } from './StoreProvider'
import { useState } from 'react'

const MainForm = () => {

    const [store, dispatch] = useContext(StoreContext);
    const {categories, tasks} = store;
    const formRef = useRef('');

    const [categoryTitle, setCategoryTitle] = useState('');

    const addingCategoryTitle = (event) =>{
        setCategoryTitle(event.target.value)
    }

    const addCategory = (event) => {
        event.preventDefault();
        if(categoryTitle){
            const newCategory = {
                id: Math.floor(Math.random()*10000),
                categoryName: categoryTitle
            }
            setCategoryTitle('');
            dispatch({
                type: 'create-category',
                payload: newCategory
            })
            formRef.current.reset();
        }
    }

  return (
    <div>
        <h1>Dashboard</h1>
        <form action="" ref={formRef}>
        <input type="text" onChange={addingCategoryTitle} />
        <button onClick={(event) => {addCategory(event)} }>Create Category</button>
        <br />
        </form>
    </div>
  )
}

export default MainForm