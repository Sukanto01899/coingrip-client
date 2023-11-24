import { useState } from "react";
import { verifyCaptchaFn } from "../api/baseApi";
import toast from "../components/Toast/Toast";

const useCaptcha = () => {
    const [loading, setLoading] = useState(false);
    const verifyCaptcha = async(ref)=>{
        try{
            const token = ref.current.getValue();
            if(!token) return new Error('Please verify captcha!');
            setLoading(true);
            const response = await verifyCaptchaFn({token});
            console.log(response)
            setLoading(false);
            return response
        }catch(err){
            toast.error({title: err.message, message: 'Please try again.'})
        }
    }
    return [verifyCaptcha , loading]
};

export default useCaptcha;