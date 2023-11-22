import axios from "axios";
const base_url = "https://send-money.onrender.com/api";

const baseApi = axios.create({
    baseURL: base_url,
    timeout: 5000,
    withCredentials: true
  });

  baseApi.interceptors.response.use(
    (response)=>{
      return response
    },
    (error)=>{
      console.log(error)
      return Promise.reject(error)
    })

export const getMeFn =async ()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/account');
  return res.data;
}

export const getAssetsFn = async()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.get('/asset/all');
  return res.data;
  
}

export const getTransactionsFn = async()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.get('/transaction');
  return res.data;
}

export const getAccessTokenFn = async ({name, username, email, emailVerified})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/create', {name, username, email, emailVerified});
  return res.data;
}

export const getDemoBalance = async (assetId)=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.get(`/transaction/demo/${assetId}`, {assetId: assetId});
  return res.data;
}

export const generateAuthDataFn = async ()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/otp/generate');
  return res.data;
}

export const verifyOtpFn = async ({code})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/otp/verify', {code: code});
  return res.data;
}

export const sendAssetFn = async ({amount, to, assetId, pin}) =>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/transaction/send', {amount, to, assetId, pin});
  return res.data;
}

export default baseApi;