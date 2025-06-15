import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import { getMeFn, getMyBalanceFn } from '../api/baseApi';
import PageLoader from '../components/LoadingComponents/PageLoader';
import toast from '../components/Toast/Toast.jsx';
import { useAuthData } from '../context/AuthContext';
import useLogout from '../hook/useLogout';

const ProtectedRoute = ({children}) => {
    const [user, loading, googleError] = useAuthState(auth);
    const location = useLocation();
    const {dispatch} = useAuthData();
    const [logout] = useLogout()

    const { isLoading, isFetching, isError, error, data: AuthData} = useQuery(['authUser'],getMeFn, {
        select: (data) => data,
        onSuccess: (data) => {
          dispatch({ type: 'SET_USER', payload: data });
        },
        onError: (err)=> {
          logout()
        },
        enabled: !!user
      });
      
    const {data} = useQuery(['balance'], getMyBalanceFn, {
        select: (data) => data,
        onSuccess: (data) => {
          dispatch({ type: 'SET_BALANCE', payload: {balance: data, loading: false, error: null} });
        },
        onError: (err)=> {
          dispatch({ type: 'SET_BALANCE', payload: {balance: null, loading: false, error: err} });
        },
        enabled: !!user
      });

    if(loading || isLoading || isFetching) {
        return <PageLoader/>
    }

    if(error || googleError){
      toast.error({title: error.message, message: 'Please try again'})
    } 
    

    if(!user){
        localStorage.removeItem('access_token')
        return <Navigate to='/login' state={{from: location}} replace/>
    }

     return children;
};

export default ProtectedRoute;