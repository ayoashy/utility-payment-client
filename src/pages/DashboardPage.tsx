// Dashboard.jsx - Main dashboard component
import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import BalanceOverview from '../components/BalanceOverview';
import QuickActions from '../components/QuickActions';
import TransactionHistory from '../components/TransactionHistory';
import Notifications from '../components/Notifications';
import TransferTokenModal from '../components/TransferTokenModal';

const DashboardPage = () => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  // Mock user data
  const userData = {
    tokenBalance: 750,
    tokenSymbol: 'UT',
    totalExpenses: 320,
    nextPaymentDate: '2025-03-15',
    nextPaymentAmount: 45,
    nextPaymentService: 'Electricity',
  };

  // Mock transactions data
  const transactions = [
    {
      id: 1,
      type: 'Utility Payment',
      service: 'Netflix',
      amount: -15,
      date: '2025-03-09',
      status: 'success',
    },
    {
      id: 2,
      type: 'Faucet Claim',
      service: '',
      amount: 100,
      date: '2025-03-08',
      status: 'success',
    },
    {
      id: 3,
      type: 'Utility Payment',
      service: 'Electricity',
      amount: -45,
      date: '2025-03-07',
      status: 'success',
    },
    {
      id: 4,
      type: 'Transfer',
      service: 'To: 0x12...34ab',
      amount: -50,
      date: '2025-03-06',
      status: 'pending',
    },
    {
      id: 5,
      type: 'Subscription Renewal',
      service: 'Internet',
      amount: -30,
      date: '2025-03-05',
      status: 'success',
    },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'reminder',
      message: 'Your Netflix subscription is expiring in 2 days',
      date: '2025-03-09',
    },
    {
      id: 2,
      type: 'success',
      message: 'You claimed 100 UT from the faucet',
      date: '2025-03-08',
    },
    {
      id: 3,
      type: 'info',
      message: 'Electricity bill payment successful',
      date: '2025-03-07',
    },
    {
      id: 4,
      type: 'warning',
      message: 'Low balance alert: Less than 100 UT remaining',
      date: '2025-03-06',
    },
    {
      id: 5,
      type: 'reminder',
      message: 'Internet subscription renewal is due next week',
      date: '2025-03-05',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] font-['gilroy-regular'] pb-10">
      {/* Header */}
      <header className='bg-[#FFFFFF] shadow-sm py-4 px-4 sm:px-6 lg:px-8 mb-6'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-[#0D1B2A]'>Dashboard</h1>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <button
                className='p-2 text-[#3D5A80] hover:text-[#1A73E8] rounded-full hover:bg-[#F4F7FC] transition-colors relative'
                onClick={() => setShowAllNotifications(!showAllNotifications)}
              >
                <Bell size={20} />
                <span className='absolute top-0 right-0 h-4 w-4 bg-[#EF4444] rounded-full flex items-center justify-center text-white text-xs'>
                  {notifications.length}
                </span>
              </button>

              {/* Notification dropdown */}
              {showAllNotifications && (
                <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 overflow-hidden'>
                  <div className='p-3 border-b border-[#D1D9E6] flex justify-between items-center'>
                    <h3 className='font-semibold text-[#0D1B2A]'>
                      Notifications
                    </h3>
                    <button
                      onClick={() => setShowAllNotifications(false)}
                      className='text-[#64748B] hover:text-[#0D1B2A]'
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className='max-h-80 overflow-y-auto'>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className='p-3 border-b border-[#D1D9E6] hover:bg-[#F4F7FC]'
                      >
                        <div className='flex items-start'>
                          <div
                            className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
                              notification.type === 'success'
                                ? 'bg-[#34D399]'
                                : notification.type === 'warning'
                                ? 'bg-[#FACC15]'
                                : notification.type === 'info'
                                ? 'bg-[#3B82F6]'
                                : 'bg-[#1A73E8]'
                            }`}
                          ></div>
                          <div className='ml-3'>
                            <p className='text-sm text-[#0D1B2A]'>
                              {notification.message}
                            </p>
                            <p className='text-xs text-[#64748B] mt-1'>
                              {notification.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='p-3 bg-[#F4F7FC]'>
                    <button className='text-sm text-[#1A73E8] hover:underline w-full text-center'>
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className='h-8 w-8 bg-[#1A73E8] rounded-full text-white flex items-center justify-center font-semibold'>
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left column */}
          <div className='lg:col-span-2 space-y-6'>
            <BalanceOverview
              userData={userData}
              openTransferModal={() => setShowTransferModal(true)}
            />
            <QuickActions />
            <TransactionHistory transactions={transactions} />
          </div>

          {/* Right column */}
          <div className='space-y-6'>
            <Notifications notifications={notifications} />
          </div>
        </div>
      </main>

      {/* Transfer Token Modal */}
      {showTransferModal && (
        <TransferTokenModal
          onClose={() => setShowTransferModal(false)}
          tokenSymbol={userData.tokenSymbol}
          maxAmount={userData.tokenBalance}
        />
      )}
    </div>
  );
};

export default DashboardPage;
