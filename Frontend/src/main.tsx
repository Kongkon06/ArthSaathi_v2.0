import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './Atoms/AppProvider.tsx'

createRoot(document.getElementById('root')!).render(
 <RecoilRoot>
  <BrowserRouter>
  <AppProvider>
    <App />
  </AppProvider>
  </BrowserRouter>
  </RecoilRoot>,
)
