import React, { useContext, useRef } from 'react'
import { StoreContext } from '../store/StoreProvider'
import { useState } from 'react'


const MainForm = () => {

    const [store, dispatch] = useContext(StoreContext);
    const {categories} = store;
    const formRef = useRef('');

    const [categoryTitle, setCategoryTitle] = useState('');

    const addingCategoryTitle = (event) =>{
        setCategoryTitle(event.target.value)
    }

    const addCategory = async (event) => {
        event.preventDefault();
        if(categoryTitle){
            const newCategory = {
                categoryName: categoryTitle,
                taskList:[]
            }
            let categorySavedPromise = await fetch('http://localhost:8081/api/v1/category',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            })

            let categorySaved = await categorySavedPromise.json();
            dispatch({
                type: 'create-category',
                payload: categorySaved
            })
            setCategoryTitle('');
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