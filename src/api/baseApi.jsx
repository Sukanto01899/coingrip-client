import axios from "axios";
const base_url = "http://localhost:4000/api";

const baseApi = axios.create({
    baseURL: base_url,
    timeout: 2000,
    withCredentials: true
  });

  baseApi.interceptors.response.use(
    (response)=>{
      return response
    },
    (error)=>{
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

export default baseApi;