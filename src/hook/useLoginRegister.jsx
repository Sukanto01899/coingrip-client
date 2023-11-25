import { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import toast from '../components/Toast/Toast';
import useCaptcha from './useCaptcha';
import useSaveUserDatabase from './useSaveUserDatabase';

const useLoginRegister = (form, captchaRef) => {
    const {email, name, password, confirmPassword, terms} = form.values;
    const [saveUserDatabase, isLoading, savingError] = useSaveUserDatabase();
    // console.log(captchaRef)
    const [
        createUserWithEmailAndPassword,
        registrationUser,
        registrationLoading,
        registrationError,
      ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [
        signInWithEmailAndPassword,
        loginUser,
        loginLoading,
        loginError,
      ] = useSignInWithEmailAndPassword(auth);
    const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
    const [verifyCaptcha , captchaLoading] = useCaptcha();

    const loading = registrationLoading || loginLoading || updating || captchaLoading;
    const error = registrationError || loginError || updatingError;
    const user = registrationUser || loginUser;
    
    // user Login handler
    const loginHandler =async ()=>{
        try{
          const res = await verifyCaptcha(captchaRef);
          if(res.success){
            console.log(res)
            await signInWithEmailAndPassword(email, password);
          }else{
            throw new Error('Invalid captcha')
          }
        }catch(err){
          captchaRef.current.reset()
          toast.error({title: err.message, message: 'Please try again'})
        }
    }

    // user Registration Handler
    const registerHandler =async ()=>{
        if(password !== confirmPassword){
           toast.error({title: 'Password not match', message: 'Please enter right password or reset'})
          return
        }

        try{
          const res = await verifyCaptcha(captchaRef);
          if(res.success){
            await createUserWithEmailAndPassword(email, password);
             await updateProfile({displayName: name});
          }else{
            throw new Error('Invalid captcha')
          }
          
        }catch(err){
          toast.error({title: err.message, message: 'Please try again'})
        }
    }

    useEffect(()=>{
        if(user && !updating){
            saveUserDatabase(user, form.values.query)
        }
    }, [user, updating])

    useEffect(()=>{
        if(error){
            toast.error({
              title: error.message,
              message: 'Please try again',
            })
        }
    }, [error])

    return {registerHandler, loginHandler, loading, error}
};

export default useLoginRegister;