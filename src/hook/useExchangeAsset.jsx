import { useMutation, useQueryClient } from "react-query";
import { exchangeAssetFn } from "../api/baseApi";
import toast from "../components/Toast/Toast";

const useExchangeAsset = () => {
    const queryClient = useQueryClient();

    const {mutateAsync: exchangeAsset, isLoading} = useMutation((data)=>exchangeAssetFn(data), {
        onSuccess: (data)=>{
            return Promise.all(
                [
                  queryClient.invalidateQueries(["balance"]),
                  queryClient.invalidateQueries(["transactions"])
                ]
              )
        },
        onError: (err)=>{
            console.log(err)
            toast.error({title: err?.response?.data?.message || err.message, message: "Please try again later"})
        },
        onSettled: (data, err)=>{
            if(!err){
                toast.success({title: "Successful", message: 'Successfully exchanged'});
            }
        }
    })

    return {exchangeAsset, isLoading}
};

export default useExchangeAsset;