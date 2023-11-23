import { useMutation, useQueryClient } from "react-query";
import { sendAssetFn } from "../api/baseApi";
import toast from "../components/Toast/Toast";

const useSendAsset = () => {
  const queryClient = useQueryClient()
  // Use mutation to send request
  const {mutate: sendAsset, data: transactionData, isLoading, error} = useMutation((data)=> sendAssetFn(data), {
    onSuccess: (data)=>{
      toast.success({
        title: "Successful",
        message: `You successfully send ${data?.transaction?.amount} ${data?.transaction?.asset}`
      })

      return Promise.all(
        [
          queryClient.invalidateQueries(["balance"]),
          queryClient.invalidateQueries(["transactions"])
        ]
      )
    },
    onError: (err)=>{
      toast.error({
        title: err.response.data.message,
        message: 'Please try again'
      })
    },
    onSettled: async (data, err)=>{
      
    }
  })

  // Send asset handler  function
  const sendAssetHandler = async ({amount, pin, to, assetId})=>{
          if(!amount || !pin || !to || !assetId){
              toast.error({title: 'Invalid input', message: "Please input valid data"})
          }
          // Asset send request with use mutation
          sendAsset({amount, pin, to, assetId})
  };

  return {sendAssetHandler, transactionData, isLoading, error}

}

export default useSendAsset;