import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessTokenFn } from "../api/baseApi";
import toast from "../components/Toast/Toast";
import { useAuthData } from "../context/AuthContext";
import useLogout from "./useLogout";

const useSaveUserDatabase = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [logout] = useLogout()
    const from = location.state?.from?.pathname || '/';
    const queryClient = useQueryClient();
    const {state, dispatch} = useAuthData();

    // React query mutation
    const {mutate: getAccessToken, isLoading, isError, error, isSuccess} = useMutation((userData)=> getAccessTokenFn(userData), {
        onSuccess: (data)=>{
            const token = data?.token;
            localStorage.setItem('access_token', token);
        },
        onError: (err)=>{
            toast.error({title: err?.response?.data?.message || err?.message, message: "Please login again"})
        },
        onSettled: (data, err)=>{
            if(data){
                navigate(from)
            }else{
                logout();
            }
        }
    })

    // User data validation & call mutation function
    const saveUserDatabase =async (user)=>{
        // return in user not available
            if(!user) return toast.error();
            
            const name =  user?.user?.displayName;
            const email = user?.user?.email || null;
            const username = user?.user?.reloadUserInfo?.screenName || null;
            const providerId = user?.user?.providerData[0].providerId;
            const emailVerified = providerId === "twitter.com" ? true : user?.user?.emailVerified;

            getAccessToken({name, email, username, emailVerified})
        
      }
  
    return [saveUserDatabase, isLoading, error]
};

export default useSaveUserDatabase;