import React, { useState } from 'react';
import {
  Wallet,
  Music,
  PlayCircle,
  Gamepad2,
  BookOpen,
  Dumbbell,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  History,
  ChevronDown,
  CreditCard,
  RefreshCw,
  Plus,
  Ticket,
} from 'lucide-react';

const SubscriptionPage = () => {
  const [balance] = useState(250);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);

  // List of available subscriptions
  const subscriptions = [
    {
      id: 'spotify',
      name: 'Spotify',
      category: 'Music Streaming',
      categoryIcon: Music,
      cost: 15,
      valid: '30 days',
    },
    {
      id: 'apple-music',
      name: 'Apple Music',
      category: 'Music Streaming',
      categoryIcon: Music,
      cost: 15,
      valid: '30 days',
    },
    {
      id: 'netflix',
      name: 'Netflix',
      category: 'Video Streaming',
      categoryIcon: PlayCircle,
      cost: 25,
      valid: '30 days',
    },
    {
      id: 'disney',
      name: 'Disney+',
      category: 'Video Streaming',
      categoryIcon: PlayCircle,
      cost: 20,
      valid: '30 days',
    },
    {
      id: 'prime',
      name: 'Prime Video',
      category: 'Video Streaming',
      categoryIcon: PlayCircle,
      cost: 18,
      valid: '30 days',
    },
    {
      id: 'xbox',
      name: 'Xbox Game Pass',
      category: 'Gaming Memberships',
      categoryIcon: Gamepad2,
      cost: 30,
      valid: '30 days',
    },
    {
      id: 'playstation',
      name: 'PlayStation Plus',
      category: 'Gaming Memberships',
      categoryIcon: Gamepad2,
      cost: 28,
      valid: '30 days',
    },
    {
      id: 'kindle',
      name: 'Kindle Unlimited',
      category: 'E-Book & Learning',
      categoryIcon: BookOpen,
      cost: 12,
      valid: '30 days',
    },
    {
      id: 'udemy',
      name: 'Udemy',
      category: 'E-Book & Learning',
      categoryIcon: BookOpen,
      cost: 22,
      valid: '30 days',
    },
    {
      id: 'coursera',
      name: 'Coursera',
      category: 'E-Book & Learning',
      categoryIcon: BookOpen,
      cost: 24,
      valid: '30 days',
    },
    {
      id: 'gym',
      name: 'Gym Membership',
      category: 'Fitness Memberships',
      categoryIcon: Dumbbell,
      cost: 40,
      valid: '30 days',
    },
    {
      id: 'fitness-app',
      name: 'Fitness App Pro',
      category: 'Fitness Memberships',
      categoryIcon: Dumbbell,
      cost: 18,
      valid: '30 days',
    },
  ];

  // Active subscriptions
  const [activeSubscriptions, setActiveSubscriptions] = useState([
    {
      id: 'netflix',
      name: 'Netflix',
      expiresOn: 'April 12, 2025',
      almostExpired: false,
    },
    {
      id: 'spotify',
      name: 'Spotify',
      expiresOn: 'March 20, 2025',
      almostExpired: true,
    },
    {
      id: 'gym',
      name: 'Gym Membership',
      expiresOn: 'April 5, 2025',
      almostExpired: false,
    },
  ]);

  // Subscription history
  const [subscriptionHistory] = useState([
    {
      date: 'March 13, 2025',
      service: 'Netflix',
      amount: 25,
      status: 'success',
    },
    {
      date: 'March 10, 2025',
      service: 'Gym Membership',
      amount: 40,
      status: 'success',
    },
    {
      date: 'February 20, 2025',
      service: 'Spotify',
      amount: 15,
      status: 'success',
    },
    {
      date: 'February 15, 2025',
      service: 'Xbox Game Pass',
      amount: 30,
      status: 'failed',
    },
    {
      date: 'February 10, 2025',
      service: 'Kindle Unlimited',
      amount: 12,
      status: 'success',
    },
  ]);

  // Check if a subscription is active
  const isSubscriptionActive = (subId) => {
    return activeSubscriptions.some((sub) => sub.id === subId);
  };

  const isAlmostExpired = (subId) => {
    return activeSubscriptions.some(
      (sub) => sub.id === subId && sub.almostExpired
    );
  };

  // Get subscription status
  const getSubscriptionStatus = (subId) => {
    if (isSubscriptionActive(subId)) {
      return isAlmostExpired(subId) ? 'expiring' : 'active';
    }
    return 'inactive';
  };

  const handleSubscriptionSelect = (e) => {
    setSelectedSubscription(e.target.value);
  };

  const handleSubscribeNow = () => {
    const selectedSub = subscriptions.find(
      (sub) => sub.id === selectedSubscription
    );

    // Check if sufficient balance
    if (!selectedSub || selectedSub.cost > balance) {
      setTransactionStatus('error-balance');
      setTimeout(() => setTransactionStatus(null), 5000);
      return;
    }

    // Show confirmation modal
    setShowConfirmation(true);
  };

  const confirmSubscription = () => {
    setShowConfirmation(false);
    setTransactionStatus('processing');

    // Simulate transaction processing
    setTimeout(() => {
      // 90% chance of success for demo
      const success = Math.random() > 0.1;

      if (success) {
        const selectedSub = subscriptions.find(
          (sub) => sub.id === selectedSubscription
        );

        // Calculate expiration date (30 days from now)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        const formattedDate = expiryDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

        // Add to active subscriptions (remove existing if present)
        setActiveSubscriptions((prev) => [
          ...prev.filter((s) => s.id !== selectedSubscription),
          {
            id: selectedSubscription,
            name: selectedSub.name,
            expiresOn: formattedDate,
            almostExpired: false,
          },
        ]);

        setTransactionStatus('success');
        setSelectedSubscription('');
      } else {
        setTransactionStatus('error-transaction');
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        setTransactionStatus(null);
      }, 5000);
    }, 2000);
  };

  const cancelSubscription = () => {
    setShowConfirmation(false);
  };

  // Handle renewal
  const handleRenew = (subId) => {
    const sub = subscriptions.find((s) => s.id === subId);
    setSelectedSubscription(subId);

    // Check if sufficient balance
    if (!sub || sub.cost > balance) {
      setTransactionStatus('error-balance');
      setTimeout(() => setTransactionStatus(null), 5000);
      return;
    }

    // Show confirmation modal
    setShowConfirmation(true);
  };

  // Get the currently selected subscription object
  const selectedSubscriptionObj = subscriptions.find(
    (sub) => sub.id === selectedSubscription
  );

  // Determine if Subscribe Now button should be enabled
  const isSubscribeValid = () => {
    if (!selectedSubscription) return false;
    // Allow renewal of already active subscriptions
    return selectedSubscriptionObj && selectedSubscriptionObj.cost <= balance;
  };

  // Group subscriptions by category
  const groupedSubscriptions = subscriptions.reduce((acc, sub) => {
    if (!acc[sub.category]) {
      acc[sub.category] = {
        icon: sub.categoryIcon,
        items: [],
      };
    }
    acc[sub.category].items.push(sub);
    return acc;
  }, {});

  return (
    <div className='min-h-screen bg-background text-text-primary font-gilroy-regular'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content Section */}
          <div className='lg:col-span-2'>
            <div className='bg-surface rounded-lg shadow-md p-6 mb-6'>
              <h1 className='text-2xl font-bold mb-6 flex items-center'>
                <Ticket className='mr-2 text-primary' size={24} />
                Subscription Management
              </h1>

              {/* User Balance */}
              <div className='mb-6 p-4 bg-background rounded-lg flex items-center'>
                <Wallet className='mr-2 text-secondary' size={20} />
                <span className='text-lg'>
                  Your Balance:{' '}
                  <span className='font-bold'>{balance} $TOKEN</span>
                </span>
              </div>

              {/* Transaction Status Messages */}
              {transactionStatus === 'processing' && (
                <div className='mb-6 p-4 bg-info bg-opacity-10 text-info rounded-lg flex items-center'>
                  <Clock className='mr-2' size={20} />
                  <span>Processing your subscription...</span>
                </div>
              )}

              {transactionStatus === 'success' && (
                <div className='mb-6 p-4 bg-success bg-opacity-10 text-success rounded-lg flex items-center'>
                  <CheckCircle className='mr-2' size={20} />
                  <span>
                    ✅ Subscription Activated! Your{' '}
                    {selectedSubscriptionObj?.name} plan is now active for 30
                    days.
                  </span>
                </div>
              )}

              {transactionStatus === 'error-balance' && (
                <div className='mb-6 p-4 bg-error bg-opacity-10 text-error rounded-lg flex items-center'>
                  <AlertTriangle className='mr-2' size={20} />
                  <span>⚠️ Insufficient balance!</span>
                </div>
              )}

              {transactionStatus === 'error-transaction' && (
                <div className='mb-6 p-4 bg-error bg-opacity-10 text-error rounded-lg flex items-center'>
                  <AlertTriangle className='mr-2' size={20} />
                  <span>⚠️ Transaction failed! Please try again.</span>
                </div>
              )}

              {/* Subscription Form */}
              <div className='mb-6'>
                <h2 className='text-xl font-bold mb-4'>Subscription Form</h2>

                <div className='mb-4'>
                  <label className='block text-text-secondary mb-2'>
                    Select Subscription
                  </label>
                  <div className='relative'>
                    <select
                      value={selectedSubscription}
                      onChange={handleSubscriptionSelect}
                      className='w-full p-3 pr-10 border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary'
                    >
                      <option value=''>-- Select a subscription --</option>
                      {subscriptions.map((sub) => {
                        const status = getSubscriptionStatus(sub.id);
                        return (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}{' '}
                            {status === 'active'
                              ? '(Active)'
                              : status === 'expiring'
                              ? '(Expiring Soon)'
                              : ''}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown
                      className='absolute right-3 top-3 text-muted pointer-events-none'
                      size={18}
                    />
                  </div>
                </div>

                {selectedSubscriptionObj && (
                  <div className='mb-4 p-3 bg-background rounded-lg flex justify-between'>
                    <span className='text-text-secondary'>Monthly Cost:</span>
                    <span className='font-medium'>
                      {selectedSubscriptionObj.cost} $TOKEN
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSubscribeNow}
                  disabled={
                    !isSubscribeValid() || transactionStatus === 'processing'
                  }
                  className={`w-full p-3 rounded-lg flex items-center justify-center ${
                    isSubscribeValid() && transactionStatus !== 'processing'
                      ? 'bg-primary text-white hover:bg-opacity-90'
                      : 'bg-muted bg-opacity-20 text-muted cursor-not-allowed'
                  } transition-colors duration-200`}
                >
                  {isSubscriptionActive(selectedSubscription) ? (
                    <>
                      <RefreshCw size={18} className='mr-2' />
                      Renew Subscription
                    </>
                  ) : (
                    <>
                      <Plus size={18} className='mr-2' />
                      Subscribe Now
                    </>
                  )}
                </button>
              </div>

              {/* Available Subscriptions */}
              <div>
                <h2 className='text-xl font-bold mb-4'>
                  Available Subscriptions
                </h2>

                {Object.entries(groupedSubscriptions).map(
                  ([category, { icon: CategoryIcon, items }]) => (
                    <div key={category} className='mb-6 last:mb-0'>
                      <h3 className='text-lg font-medium mb-3 flex items-center'>
                        <CategoryIcon size={20} className='mr-2 text-primary' />
                        {category}
                      </h3>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {items.map((sub) => {
                          const status = getSubscriptionStatus(sub.id);
                          const active =
                            status === 'active' || status === 'expiring';
                          const expiring = status === 'expiring';
                          const activeSub = activeSubscriptions.find(
                            (s) => s.id === sub.id
                          );

                          return (
                            <div
                              key={sub.id}
                              className={`border ${
                                active ? 'border-primary' : 'border-border'
                              } rounded-lg p-4`}
                            >
                              <div className='flex justify-between items-start mb-2'>
                                <h4 className='font-medium'>{sub.name}</h4>
                                <span className='text-sm font-bold'>
                                  {sub.cost} $TOKEN
                                </span>
                              </div>

                              <div className='text-sm text-text-secondary mb-2'>
                                {sub.valid} subscription
                              </div>

                              <div className='flex justify-between items-center'>
                                <div
                                  className={`text-sm flex items-center ${
                                    active
                                      ? expiring
                                        ? 'text-warning'
                                        : 'text-success'
                                      : 'text-muted'
                                  }`}
                                >
                                  {active ? (
                                    expiring ? (
                                      <>
                                        <Clock size={14} className='mr-1' />
                                        Expiring Soon
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle
                                          size={14}
                                          className='mr-1'
                                        />
                                        Active
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <XCircle size={14} className='mr-1' />
                                      Inactive
                                    </>
                                  )}
                                </div>

                                {active && (
                                  <div className='text-xs text-text-secondary flex items-center'>
                                    <Calendar size={12} className='mr-1' />
                                    Expires: {activeSub?.expiresOn}
                                  </div>
                                )}
                              </div>

                              {(expiring || !active) && (
                                <button
                                  onClick={() => handleRenew(sub.id)}
                                  className='mt-3 w-full p-2 text-sm rounded bg-primary bg-opacity-10 text-primary hover:bg-opacity-20 flex items-center justify-center'
                                >
                                  <RefreshCw size={14} className='mr-1' />
                                  {active ? 'Renew Now' : 'Subscribe'}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            {/* Active Subscriptions */}
            <div className='bg-surface rounded-lg shadow-md p-6 mb-6'>
              <h2 className='text-xl font-bold mb-4 flex items-center'>
                <CheckCircle className='mr-2 text-primary' size={20} />
                Active Subscriptions
              </h2>

              {activeSubscriptions.length === 0 ? (
                <p className='text-text-secondary text-sm'>
                  No active subscriptions
                </p>
              ) : (
                <div className='space-y-4'>
                  {activeSubscriptions.map((sub, index) => {
                    const subscriptionInfo = subscriptions.find(
                      (s) => s.id === sub.id
                    );
                    const CategoryIcon =
                      subscriptionInfo?.categoryIcon || Music;

                    return (
                      <div
                        key={index}
                        className='flex items-start border-b border-border pb-4 last:border-0 last:pb-0'
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${
                            sub.almostExpired
                              ? 'bg-warning bg-opacity-10'
                              : 'bg-success bg-opacity-10'
                          } flex items-center justify-center mr-3 mt-1`}
                        >
                          <CategoryIcon
                            size={18}
                            className={
                              sub.almostExpired
                                ? 'text-warning'
                                : 'text-success'
                            }
                          />
                        </div>
                        <div className='flex-1'>
                          <div className='flex justify-between items-start'>
                            <h3 className='font-medium'>{sub.name}</h3>
                            {sub.almostExpired && (
                              <span className='text-xs bg-warning bg-opacity-10 text-warning px-2 py-1 rounded'>
                                Expiring Soon
                              </span>
                            )}
                          </div>
                          <div className='text-sm text-text-secondary flex items-center'>
                            <Calendar size={14} className='mr-1' />
                            Expires: {sub.expiresOn}
                          </div>

                          {sub.almostExpired && (
                            <button
                              onClick={() => handleRenew(sub.id)}
                              className='mt-2 p-2 text-xs rounded bg-primary bg-opacity-10 text-primary hover:bg-opacity-20 flex items-center justify-center'
                            >
                              <RefreshCw size={12} className='mr-1' />
                              Renew Now
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Subscription History */}
            <div className='bg-surface rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold mb-4 flex items-center'>
                <History className='mr-2 text-primary' size={20} />
                Subscription History
              </h2>

              <div className='space-y-4'>
                {subscriptionHistory.map((payment, index) => {
                  // Find subscription to get icon
                  const serviceName = payment.service;
                  const subscriptionInfo = subscriptions.find(
                    (s) => s.name === serviceName
                  );
                  const CategoryIcon = subscriptionInfo?.categoryIcon || Music;

                  return (
                    <div
                      key={index}
                      className='border-b border-border pb-3 last:border-0'
                    >
                      <div className='flex justify-between items-start mb-1'>
                        <span className='text-sm text-muted'>
                          {payment.date}
                        </span>
                        <span
                          className={`flex items-center ${
                            payment.status === 'success'
                              ? 'text-success'
                              : 'text-error'
                          }`}
                        >
                          {payment.status === 'success' ? (
                            <CheckCircle size={16} className='ml-1' />
                          ) : (
                            <XCircle size={16} className='ml-1' />
                          )}
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <div className='h-8 w-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-2'>
                          <CategoryIcon size={16} className='text-primary' />
                        </div>
                        <span className='flex-1 text-text-secondary text-sm'>
                          {payment.service}
                        </span>
                        <span className='font-medium'>
                          {payment.amount} $TOKEN
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedSubscriptionObj && (
        <div className='fixed inset-0 bg-overlay flex items-center justify-center z-50'>
          <div className='bg-surface rounded-lg shadow-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-xl font-bold mb-4'>Confirm Subscription</h3>

            <div className='mb-6'>
              <p className='mb-4'>
                You are about to subscribe to{' '}
                <span className='font-bold'>
                  {selectedSubscriptionObj.name}
                </span>{' '}
                for{' '}
                <span className='font-bold'>
                  {selectedSubscriptionObj.cost} $TOKEN
                </span>
                . Are you sure?
              </p>

              <div className='p-3 bg-background rounded-lg flex justify-between items-center'>
                <span className='text-text-secondary'>Estimated Gas:</span>
                <span className='font-medium'>0.0005 ETH</span>
              </div>
            </div>

            <div className='flex space-x-4'>
              <button
                onClick={confirmSubscription}
                className='flex-1 bg-primary text-white p-3 rounded-lg hover:bg-opacity-90 flex items-center justify-center'
              >
                <CheckCircle size={18} className='mr-2' />
                Confirm Subscription
              </button>

              <button
                onClick={cancelSubscription}
                className='flex-1 border border-border text-text-primary p-3 rounded-lg hover:bg-background flex items-center justify-center'
              >
                <XCircle size={18} className='mr-2' />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
