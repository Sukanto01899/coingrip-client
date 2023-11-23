import { useSignOut } from 'react-firebase-hooks/auth';
import { useQueryClient } from 'react-query';
import auth from '../../firebase.init';

const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const queryClient = useQueryClient();

    const logout = async ()=>{
        try{
            await signOut();
            queryClient.resetQueries(["transaction", "assets", "account"]);
            queryClient.removeQueries(); 
            localStorage.removeItem('access_token');
        }catch(err){
            console.log('useLogout: ', err)
        }
    }

    return [logout]
};

export default useLogout;