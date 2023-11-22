import { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import toast from '../components/Toast/Toast';
import useSaveUserDatabase from './useSaveUserDatabase';

const useLoginRegister = (form) => {
    const {email, name, password, confirmPassword, terms} = form.values;
    const [saveUserDatabase, isLoading, savingError] = useSaveUserDatabase();
    const [
        createUserWithEmailAndPassword,
        registrationUser,
        registrationLoading,
        registrationError,
      ] = useCreateUserWithEmailAndPassword(auth);
    const [
        signInWithEmailAndPassword,
        loginUser,
        loginLoading,
        loginError,
      ] = useSignInWithEmailAndPassword(auth);
    const [updateProfile, updating, updatingError] = useUpdateProfile(auth);

    const loading = registrationLoading || loginLoading || updating;
    const error = registrationError || loginError || updatingError;
    const user = registrationUser || loginUser;

    // user Login handler
    const loginHandler =async ()=>{
        try{
          await signInWithEmailAndPassword(email, password);
        }catch(err){
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
          await createUserWithEmailAndPassword(email, password);
          await updateProfile({displayName: name});
        }catch(err){
          toast.error({title: err.message, message: 'Please try again'})
        }
    }

    useEffect(()=>{
        if(user && !updating){
            saveUserDatabase(user)
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