
import { useLocation } from 'react-router-dom';
import LoginRegisterForm from '../components/Form/LoginRegisterForm';

const LoginRegister = () => {
    const location = useLocation();
    const queryPrams = new URLSearchParams(location.search)
    const query = queryPrams.get('referral')
    return (
        <>
            <LoginRegisterForm query={query}/>
        </>
    );
};

export default LoginRegister;