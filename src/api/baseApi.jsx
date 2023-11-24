import axios from "axios";
const base_url = 'http://localhost:4000/api';
// const base_url = 'https://send-money.onrender.com/api';

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

export const getTransactionsFn = async({limit, page})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.get(`/transaction?limit=${limit}&page=${page}`);
  return res.data;
}

export const getAccessTokenFn = async ({name, username, email, emailVerified})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/create', {name, username, email, emailVerified});
  return res.data;
}

export const getDemoBalance = async (assetId)=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.get(`/transaction/demo/${assetId}`);
  return res.data;
}

// Generate authentication base32 and otp auth url 
export const generateAuthDataFn = async ()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/otp/generate');
  return res.data;
}
// Otp code validation
export const verifyOtpFn = async ({code})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/otp/verify', {code: code});
  return res.data;
}

// authentication disable
export const disableAuthFn = async ({code})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/otp/disable', {pin: code});
  return res.data;
}

export const sendAssetFn = async ({amount, to, assetId, pin}) =>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/transaction/send', {amount, to, assetId, pin});
  return res.data;
}

export const exchangeAssetFn = async ({from, to, amount})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post(`/transaction/exchange?from=${from}&to=${to}`, {amount});
  return res.data;
}
export const getMyBalanceFn = async ()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post("/user/balance");
  return res.data;
}

export default baseApi;