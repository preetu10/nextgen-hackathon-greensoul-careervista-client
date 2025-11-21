import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast'
import FirebaseProvider from './FirebaseProvider/FirebaseProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
   <FirebaseProvider>
     
      <RouterProvider router={router} />
      <Toaster />
    </FirebaseProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)

