import React, {useContext} from 'react'
import { StoreContext } from './StoreProvider';

const TaskList = ({fkCategory}) => {

    const [store, dispatch] = useContext(StoreContext);
    const {categories} = store;

    const deleteTask = (event, task) => {
        event.preventDefault();
        dispatch({
            type: 'delete-task',
            payload: task
        })

    }

    const categoryContext = categories.find(category => category.id == fkCategory);

  return (
    <div>
        <ul>
            {
                categoryContext.taskList.map(task =>{
                    return <li key={task.taskId} className="task-message" >{task.taskMessage}
                            </li>
                })
            }
            <button onClick={(e)=>deleteTask(e, task.id)}>Delete Task</button>
        </ul>
    </div>
  )
}

export default TaskList