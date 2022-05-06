import { createContext, useReducer } from "react";
import storeReducer from "./Reducer";

const StoreContext = createContext();

const initialStore = {
    categories: []
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