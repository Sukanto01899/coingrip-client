
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './RequireAuth/ProtectedRoute'
import DashboardHome from './components/DashboardComponents/DashboardHome'
import Layout from './components/Layout/Layout'
import AccountSetting from './components/Setting/AccountSetting'
import AuthenticationSetting from './components/Setting/AuthenticationSetting'
import EmailSetting from './components/Setting/EmailSetting'
import IdVerification from './components/Setting/IdVerification'
import PasswordSetting from './components/Setting/PasswordSetting'
import ProfileSetting from './components/Setting/ProfileSetting'
import BuyCrypto from './pages/BuyCrypto'
import Dashboard from './pages/Dashboard'
import ErrorPage from './pages/ErrorPage'
import Exchange from './pages/Exchange'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import Market from './pages/Market'
import Referral from './pages/Referral'
import Reward from './pages/Reward'
import Setting from './pages/Setting'

function App() {
  return (
    <Layout>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<LoginRegister/>}/>
      <Route path='/register' element={<LoginRegister/>}/>
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
        <Route index element={<DashboardHome/>}/>
        <Route path='setting' element={<Setting/>}>
          <Route index element={<ProfileSetting/>}/>
          <Route path='profile' element={<ProfileSetting/>}/>
          <Route path='account' element={<AccountSetting/>}/>
          <Route path='email' element={<EmailSetting/>}/>
          <Route path='password' element={<PasswordSetting/>}/>
          <Route path='authentication' element={<AuthenticationSetting/>}/>
          <Route path='id-verification' element={<IdVerification/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Route>
      </Route>
       {/* Service route */}
        <Route path='/exchange' element={<ProtectedRoute><Exchange/></ProtectedRoute>}/>
        <Route path='/referrals' element={<ProtectedRoute><Referral/></ProtectedRoute>}/>
        <Route path='/rewards' element={<ProtectedRoute><Reward/></ProtectedRoute>}/>
        <Route path='/buy' element={<ProtectedRoute><BuyCrypto/></ProtectedRoute>}/>
        <Route path='/markets' element={<ProtectedRoute><Market/></ProtectedRoute>}/>
      <Route path='*' element={<ErrorPage/>}/>
     </Routes>
    </Layout>
  )
}

export default App
