import { createContext, useReducer } from "react";
import storeReducer from "./Reducer";

const StoreContext = createContext();

const initialStore = {
    categories : [
        {id:2, categoryName: "Family", taskList:[
            {id:3, taskMessage: "Hangout with my parents",taskStatus: false, fkCategory: 2},
            {id:5, taskMessage: "Watch a movie with my nephew",taskStatus: false, fkCategory: 2},
        ]},

        {id:4, categoryName: "Music", taskList:[
            {id:7, taskMessage: "MF DOOM",taskStatus: false, fkCategory: 4},
            {id:9, taskMessage: "A Tribe Called Quest",taskStatus: false, fkCategory: 4}

        ]},

    ]
}

const StoreProvider = ({children}) => {
    const [store, dispatch] = useReducer(storeReducer, initialStore);
    return(
        <StoreContext.Provider value={[store, dispatch]}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider
export {StoreContext}