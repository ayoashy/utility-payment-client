import { RouterProvider } from 'react-router';
import { createBrowserRouter, Navigate } from 'react-router';
import RootLayout from './pages/RootLayout';
import Homepage from './pages/Homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Homepage  />,
        index: true,
      },
      {
        path: '/pricing',
        element: <div>Pricing</div>,
      },
      {
        path: '/contact',
        element: <div>contact</div>,
      },
      {
        path: '/get-a-demo',
        element: <div>get-a-demo</div>,
      },
      {
        path: '/*',
        element: <Navigate to='/' />,
      },
    ],
  },
  {
    path: '/*',
    element: <Navigate to='/' />,
  },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
