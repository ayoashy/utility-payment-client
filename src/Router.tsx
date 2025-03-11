import { RouterProvider } from 'react-router';
import { createBrowserRouter, Navigate } from 'react-router';
import RootLayout from './pages/RootLayout';
// import Homepage from './pages/Homepage';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
        index: true,
      },
      {
        path: '/dashboard',
        element: <div>Dashboard</div>,
      },
      {
        path: '/faucets',
        element: <div>Faucets</div>,
      },
      {
        path: '/utilities',
        element: <div>Utilities</div>,
      },
      {
        path: '/subscriptions',
        element: <div>subscriptions</div>,
      },
      {
        path: '/history',
        element: <div>history</div>,
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
