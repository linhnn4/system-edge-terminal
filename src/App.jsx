import '@/styles/styles.scss';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const queryClient = new QueryClient()

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2761EA',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

    </ConfigProvider>
  )
}

export default App
