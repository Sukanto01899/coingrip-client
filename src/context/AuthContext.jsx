import { createContext, useContext, useReducer } from "react";
import { useQuery } from "react-query";
import { getAssetsFn } from "../api/baseApi";

export const AuthContext = createContext();

// initialState for useReducer
const initialState = {
    authUser: null,
    assetsData: {
      loading: true,
      assets: null,
      error: null
    }
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
          assetsData: action.payload
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
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const {data: assets, isLoading, error} = useQuery({
    queryKey: ['assets'], 
    queryFn: getAssetsFn,
    staleTime: 10000,
    select: (data)=> data,
    onSuccess: (data) => {
      dispatch({ type: 'SET_ASSETS', payload: {assets: data, loading: false, error: null} });
    },
    onError: (err)=>{
      dispatch({ type: 'SET_ASSETS', payload: {assets: null, loading: false, error: err} });
    }
  })

  
    return <AuthContext.Provider value={{state, dispatch}}>
        {children}
       </AuthContext.Provider>
};