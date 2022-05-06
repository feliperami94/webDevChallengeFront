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
                    console.log(task.taskId)
                    return <li key={task.taskId} className="task-message" >{task.taskMessage}
                {/* //     //     {console.log(`${task.id} es el id del task`)} */}
                            </li>
                })
            }
            <button onClick={(e)=>deleteTask(e, task)}>Delete Task</button>
        </ul>
    </div>
  )
}

export default TaskList