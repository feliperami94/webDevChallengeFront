import React, {useContext} from 'react'
import { StoreContext } from './StoreProvider'
import TaskList from './TaskList';

const CategoryForm = () => {
    const [store, dispatch] = useContext(StoreContext);
    const {categories, tasks} = store;

    const deleteCategory = (event, category) =>{
        event.preventDefault();
        dispatch({
            type: 'delete-category',
            payload: category
        })
    }

  return (
    <div>
        <ul>
        {
            categories.map(category => {
                return <li key={category.id}>{category.categoryName}
                <button onClick={(e)=>deleteCategory(event, category)}>Delete Category</button>
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