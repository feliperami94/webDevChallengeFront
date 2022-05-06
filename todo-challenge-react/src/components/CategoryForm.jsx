import React, {useContext, useState} from 'react'
import { StoreContext } from './StoreProvider'
import TaskList from './TaskList';

const CategoryForm = () => {
    const [store, dispatch] = useContext(StoreContext);
    const {categories, tasks} = store;
    const [taskTitle, setTaskTitle] = useState('');

    const addTaskTitle = (event) =>{
        setTaskTitle(event.target.value);
        console.log(taskTitle);
    }

    const deleteCategory = (event, category) =>{
        event.preventDefault();
        dispatch({
            type: 'delete-category',
            payload: category
        })
    }

    const addTask = (event, idCategory) => {
        event.preventDefault();
        const newTask={
            id: Math.floor(Math.random()*10000),
            taskMessage: taskTitle,
            taskStatus: false,
            fkCategory: idCategory
        }
        dispatch({
            type: 'create-task',
            payload: newTask
        })
    }

  return (
    <div>
        <ul>
        {
            categories.map(category => {
                return <li key={category.id}>{category.categoryName}
                <button onClick={(e)=>deleteCategory(event, category)}>Delete Category</button>
                <br />

                <input type="text" onChange={addTaskTitle}/>
                <button onClick={(event)=>{addTask(event, category.id)}}>Create Task</button>
                <TaskList fkCategory={category.id} />
                <br/>
                </li>
            })
        }
        </ul>
    </div>
  )
}

export default CategoryForm