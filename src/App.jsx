import '@/styles/styles.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import Login from './pages/Auth/Login/Loadable';
import Register from './pages/Auth/Register/Loadable';
import Home from './pages/Home/Loadable';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
