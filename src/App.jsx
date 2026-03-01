import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import Forgot from './pages/Auth/Forgot/Loadable';
import Login from './pages/Auth/Login/Loadable';
import SignUp from './pages/Auth/SignUp/Loadable';
import Verification from './pages/Auth/Verification/Loadable';
import VerificationForgot from './pages/Auth/VerificationForgot/Loadable';
import Home from './pages/Home/Loadable';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<Forgot />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/verification-forgot' element={<VerificationForgot />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
