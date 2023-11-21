import { useEffect } from 'react';
import { useSignInWithGoogle, useSignInWithTwitter } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useSaveUserDatabase from './useSaveUserDatabase';

const useSocialLogin = (userErrorHandler) => {
  const [signInWithTwitter, twitterUser, twitterLoading, twitterError] = useSignInWithTwitter(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [saveUserDatabase, isLoading, error] = useSaveUserDatabase();
  const loading = twitterLoading || googleLoading;
  const user = twitterUser || googleUser;

//   Twitter login handler
  const twitterLoginHandler =async ()=>{
    try{
      await signInWithTwitter();
    }catch(err){
      userErrorHandler(err)
    }
  }
//   Google Login Handler
  const googleLoginHandler = async ()=>{
    try{
      await signInWithGoogle()
    }catch(err){
      userErrorHandler(err)
    }
  }

  useEffect(()=>{
    if(user){
      saveUserDatabase(user)
    }
  }, [user])

  useEffect(()=>{
    if(loading){
    }
  }, [loading])
  
  return {twitterLoginHandler, googleLoginHandler, loading}
};

export default useSocialLogin;