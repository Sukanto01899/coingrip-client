import { Navigate } from 'react-router-dom';

const IgnoreLoginRoute = ({children}) => {
    const token = localStorage.getItem('access_token')
    if(token) return <Navigate to='/dashboard'/>

    return children;
};

export default IgnoreLoginRoute;