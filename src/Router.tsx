import { RouterProvider } from 'react-router';
import { createBrowserRouter, Navigate } from 'react-router';
import RootLayout from './pages/RootLayout';
// import Homepage from './pages/Homepage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FaucetsPage from './pages/FaucetsPage';
import TokenTransferPage from './pages/TokenTransferPage';
import UtilitiesPage from './pages/UtilitiesPage';
import SubscriptionPage from './pages/SubscriptionPage';
import TokenHistoryPage from './pages/HistoryPage';
import HistoryPage from './pages/HistoryPage';

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
        element: <DashboardPage />
      },
      {
        path: '/faucets',
        element: <FaucetsPage />
      },
      {
        path: '/transfer',
        element: <TokenTransferPage />
      },
      {
        path: '/utilities',
        element: <UtilitiesPage />
      },
      {
        path: '/subscriptions',
        element: <SubscriptionPage />
      },
      {
        path: '/history',
        element: <HistoryPage />
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
