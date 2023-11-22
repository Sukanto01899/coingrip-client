import { useMutation } from "react-query";
import { exchangeAssetFn } from "../api/baseApi";
import toast from "../components/Toast/Toast";

const useExchangeAsset = () => {
    const {mutate: exchangeAsset, isLoading} = useMutation((data)=>exchangeAssetFn(data), {
        onSuccess: (data)=>{
            console.log(data)
        },
        onError: (err)=>{
            console.log(err)
            toast.error({title: err?.response?.data?.message || err.message, message: "Please try again later"})
        },
        onSettled: ()=>{}
    })

    return {exchangeAsset, isLoading}
};

export default useExchangeAsset;