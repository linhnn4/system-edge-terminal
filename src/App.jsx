import '@/styles/styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import Home from './pages/Home/Loadable';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
