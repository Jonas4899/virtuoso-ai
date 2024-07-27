import React from 'react'
import ReactDOM from 'react-dom/client'
import { Root } from './components/routes/root.jsx'
import { ConversationPage } from './components/routes/conversationPage.jsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/new-chat',
        element: <ConversationPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
