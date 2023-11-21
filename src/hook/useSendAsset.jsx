import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { QueryClient } from "react-query";
import baseApi from "../api/baseApi";

const useSendAsset = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transaction, setTransaction] = useState(null);

    // Send asset handler  function
    const sendAssetHandler = async ({amount, pin, to, assetId})=>{
        const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                staleTime: Infinity,
              },
            },
          });

        try{
            if(!amount || !pin || !to || !assetId){
                throw new Error('Invalid input')
            }

            // Set loading status to true
            setLoading(true);
           
            // send a post request to make transaction
            const send_transaction =await baseApi.post('/transaction/send', {amount, to, assetId, pin});
            if(send_transaction?.data?.isSuccess){
                // Set loading status to false
                setLoading(false)
                // After transaction success then set transaction data
                setTransaction(send_transaction?.data);
                // refetch transaction
                await queryClient.refetchQueries(['transactions'], { active: true })
            }else{
                setLoading(false)
                throw new Error('Transaction failed')
            }

        }catch(err){
            setLoading(false);
            notifications.show({
                title: err.response.data.message,
                message: 'Please try again',
                color: 'red'
              })
            setError(err.message)
        }
    }

    return {sendAssetHandler, transaction, isLoading, error}
};

export default useSendAsset;