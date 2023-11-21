import { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext();

// initialState for useReducer
const initialState = {
    authUser: null,
    assets: null
  };

//   function for set state
const stateReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER': {
        return {
          ...state,
          authUser: action.payload,
        };
      }
      case 'SET_ASSETS':{
        return{
          ...state,
          assets: action.payload
        }
      }
      default: {
        throw new Error(`Unhandled action type`);
      }
    }
  };

// Return full context function
export const useAuthData = ()=>{
    const context = useContext(AuthContext);
    if(context){
        return context;
    }
    throw new Error(`useStateContext must be used within a StateContextProvider`);
}

// Context provider function
export const AuthContextProvider = ({children})=>{
    // useReducer hook
    const [state, dispatch] = useReducer(stateReducer, initialState);

    return <AuthContext.Provider value={{state, dispatch}}>
        {children}
       </AuthContext.Provider>
};