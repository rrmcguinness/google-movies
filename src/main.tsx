import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './templates/App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Overview from './pages/Overview.tsx';
import Step1 from './pages/Step1.tsx';
import Step2 from './pages/Step2.tsx';
import Step3 from './pages/Step3.tsx';
import Settings from './pages/Settings.tsx';
import Demo from './templates/Demo.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: 'settings',
        element: <Settings />,
        action: async (req) => {
          console.log(req.request.formData)
        }
      },
      {
        path: "demo",
        element: <Demo />,
        children: [
          {
            path: "1",
            index: true,
            element: <Step1 />
          },
          {
            path: "2",
            element: <Step2 />
          },
          {
            path: "3",
            element: <Step3 />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
      <RouterProvider router={router} />
)
