import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { About, Add, Agendas, Chat, Edit, Home } from './pages'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home / >
      },
      {
        path: "/about",
        element: <About / >
      },
      {
        path: "/agenda",
        element: <Agendas / >
      },
      {
        path: "/agenda/add",
        element: <Add / >
      },
      {
        path: "/agenda/edit/:id",
        element: <Edit / >
      },
      {
        path: "/chat/:id",
        element: <Chat / >
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
