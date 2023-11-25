import axios from "axios";
const base_url = import.meta.env.VITE_base_url;
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

    // Get user account data
export const getMeFn =async ()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/user/account');
  return res.data;
}

// Get all asset
export const getAssetsFn = async()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.get('/asset/all');
  return res.data;
  
}

// Get all transaction
export const getTransactionsFn = async({limit, page})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.get(`/transaction?limit=${limit}&page=${page}`);
  return res.data;
}

// Get jwt access token
export const getAccessTokenFn = async ({name, username, email, emailVerified, query})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  console.log(query)
  const res = await baseApi.post(`/user/create?referral=${query}`, {name, username, email, emailVerified});
  return res.data;
}

// Get test demo balance
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

// Send crypto one to another account
export const sendAssetFn = async ({amount, to, assetId, pin}) =>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post('/transaction/send', {amount, to, assetId, pin});
  return res.data;
}

// Exchange crypto
export const exchangeAssetFn = async ({from, to, amount})=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post(`/transaction/exchange?from=${from}&to=${to}`, {amount});
  return res.data;
}
// get user balance
export const getMyBalanceFn = async ()=>{
  baseApi.defaults.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  const res = await baseApi.post("/user/balance");
  return res.data;
}
// reCaptcha verify request
export const verifyCaptchaFn = async ({token})=>{
  const res = await baseApi.post("/user/captcha/verify", {token});
  return res.data;
}
// Get a user referrals details
export const getReferralsFn = async ()=>{
  const res = await baseApi.post("/user/referrals");
  return res.data;
}

// get user kyc details
export const getKycFn = async ({id})=>{
  const res = await baseApi.get(`/user/kyc/${id}`);
  return res.data;
}
// submit kyc
export const submitKycFn = async (data)=>{
  const res = await baseApi.post(`/user/kyc/submit`, data);
  return res.data;
}

export default baseApi;