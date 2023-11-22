import { useEffect } from 'react';
import { useSignInWithGoogle, useSignInWithTwitter } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import toast from '../components/Toast/Toast';
import useSaveUserDatabase from './useSaveUserDatabase';

const useSocialLogin = () => {
  const [signInWithTwitter, twitterUser, twitterLoading, twitterError] = useSignInWithTwitter(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [saveUserDatabase, isLoading, accountError] = useSaveUserDatabase();
  const loading = twitterLoading || googleLoading;
  const user = twitterUser || googleUser;
  const error = twitterError || googleError

//   Twitter login handler
  const twitterLoginHandler =async ()=>{
    try{
      await signInWithTwitter();
    }catch(err){
      toast.error({title: err.message, message: 'Please try again'})
    }
  }
//   Google Login Handler
  const googleLoginHandler = async ()=>{
    try{
      await signInWithGoogle()
    }catch(err){
      toast.error({title: err.message, message: 'Please try again'})
    }
  }

  useEffect(()=>{
    if(user){
      saveUserDatabase(user)
    }
  }, [user])

  useEffect(()=>{
    if(error){
        toast.error({
          title: error.message,
          message: 'Please try again',
        })
    }
}, [error])
  
  return {twitterLoginHandler, googleLoginHandler, loading}
};

export default useSocialLogin;