import React, { useState } from 'react';
import {
  Wallet,
  Zap,
  Wifi,
  Tv,
  Dices,
  Music,
  Dumbbell,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  History,
  ChevronDown,
  CreditCard,
} from 'lucide-react';

const UtilitiesPage = () => {
  const [balance] = useState(500);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUtility, setSelectedUtility] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);

  // List of available utilities
  const utilities = [
    {
      id: 'electricity',
      name: 'Electricity Bill',
      icon: Zap,
      cost: 50,
      valid: '30 days',
      isBetting: false,
    },
    {
      id: 'internet',
      name: 'Internet Subscription',
      icon: Wifi,
      cost: 60,
      valid: '30 days',
      isBetting: false,
    },
    {
      id: 'cable',
      name: 'Cable TV Subscription',
      icon: Tv,
      cost: 40,
      valid: '30 days',
      isBetting: false,
    },
    {
      id: 'betting',
      name: 'Sports Betting Funds',
      icon: Dices,
      cost: null,
      valid: 'One-time deposit',
      isBetting: true,
    },
    {
      id: 'music',
      name: 'Music Subscription',
      icon: Music,
      cost: 15,
      valid: '30 days',
      isBetting: false,
    },
    {
      id: 'fitness',
      name: 'Fitness Membership',
      icon: Dumbbell,
      cost: 70,
      valid: '30 days',
      isBetting: false,
    },
  ];

  // Active services
  const [activeServices, setActiveServices] = useState([
    {
      id: 'internet',
      name: 'Internet Subscription',
      expiresOn: 'April 10, 2025',
    },
    { id: 'music', name: 'Music Subscription', expiresOn: 'March 25, 2025' },
  ]);

  // Payment history
  const [paymentHistory] = useState([
    {
      date: 'March 11, 2025',
      service: 'Internet Subscription',
      amount: 60,
      status: 'success',
    },
    {
      date: 'March 10, 2025',
      service: 'Music Subscription',
      amount: 15,
      status: 'success',
    },
    {
      date: 'March 5, 2025',
      service: 'Electricity Bill',
      amount: 50,
      status: 'failed',
    },
    {
      date: 'March 3, 2025',
      service: 'Cable TV Subscription',
      amount: 40,
      status: 'success',
    },
    {
      date: 'February 25, 2025',
      service: 'Fitness Membership',
      amount: 70,
      status: 'success',
    },
  ]);

  const isServiceActive = (serviceId) => {
    return activeServices.some((service) => service.id === serviceId);
  };

  const getServiceStatus = (serviceId) => {
    if (isServiceActive(serviceId)) return 'active';
    return 'inactive';
  };

  const handleUtilitySelect = (e) => {
    setSelectedUtility(e.target.value);
    // Reset custom amount when changing selection
    if (!utilities.find((u) => u.id === e.target.value)?.isBetting) {
      setCustomAmount('');
    }
  };

  const handleAmountChange = (e) => {
    setCustomAmount(e.target.value);
  };

  const handlePayNow = () => {
    const selectedUtil = utilities.find((u) => u.id === selectedUtility);

    // For betting service with custom amount
    if (
      selectedUtil?.isBetting &&
      (!customAmount || parseFloat(customAmount) <= 0)
    ) {
      setTransactionStatus('error-amount');
      setTimeout(() => setTransactionStatus(null), 5000);
      return;
    }

    // Check if sufficient balance
    const amountToPay = selectedUtil?.isBetting
      ? parseFloat(customAmount)
      : selectedUtil?.cost;
    if (!amountToPay || amountToPay > balance) {
      setTransactionStatus('error-balance');
      setTimeout(() => setTransactionStatus(null), 5000);
      return;
    }

    // If all checks pass, show confirmation modal
    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    setShowConfirmation(false);
    setTransactionStatus('processing');

    // Simulate transaction processing
    setTimeout(() => {
      // 80% chance of success for demo
      const success = Math.random() > 0.2;

      if (success) {
        const selectedUtil = utilities.find((u) => u.id === selectedUtility);

        // Add to active services for non-betting services
        if (!selectedUtil.isBetting) {
          // Calculate expiration date (30 days from now)
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);

          const formattedDate = expiryDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          // Add to active services (remove existing if present)
          setActiveServices((prev) => [
            ...prev.filter((s) => s.id !== selectedUtility),
            {
              id: selectedUtility,
              name: selectedUtil.name,
              expiresOn: formattedDate,
            },
          ]);
        }

        setTransactionStatus('success');
        setSelectedUtility('');
        setCustomAmount('');
      } else {
        setTransactionStatus('error-transaction');
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        setTransactionStatus(null);
      }, 5000);
    }, 2000);
  };

  const cancelPayment = () => {
    setShowConfirmation(false);
  };

  // Get the currently selected utility object
  const selectedUtilityObj = utilities.find((u) => u.id === selectedUtility);

  // Determine if Pay Now button should be enabled
  const isPurchaseValid = () => {
    if (!selectedUtility) return false;
    if (isServiceActive(selectedUtility) && !selectedUtilityObj?.isBetting)
      return false;

    const cost = selectedUtilityObj?.isBetting
      ? customAmount
        ? parseFloat(customAmount)
        : 0
      : selectedUtilityObj?.cost;

    return cost && cost > 0 && cost <= balance;
  };

  return (
    <div className='min-h-screen bg-background text-text-primary font-gilroy-regular'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content Section */}
          <div className='lg:col-span-2'>
            <div className='bg-surface rounded-lg shadow-md p-6 mb-6'>
              <h1 className='text-2xl font-bold mb-6 flex items-center'>
                <CreditCard className='mr-2 text-primary' size={24} />
                Pay Utilities
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
                  <span>Processing your payment...</span>
                </div>
              )}

              {transactionStatus === 'success' && (
                <div className='mb-6 p-4 bg-success bg-opacity-10 text-success rounded-lg flex items-center'>
                  <CheckCircle className='mr-2' size={20} />
                  <span>
                    ✅ Payment Successful!
                    {selectedUtilityObj?.isBetting
                      ? ` ${customAmount} $TOKEN has been deposited to your betting account.`
                      : ` Your ${selectedUtilityObj?.name} is now active for 30 days.`}
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

              {transactionStatus === 'error-amount' && (
                <div className='mb-6 p-4 bg-error bg-opacity-10 text-error rounded-lg flex items-center'>
                  <AlertTriangle className='mr-2' size={20} />
                  <span>⚠️ Please enter a valid amount!</span>
                </div>
              )}

              {/* Payment Form */}
              <div className='mb-6'>
                <h2 className='text-xl font-bold mb-4'>Payment Form</h2>

                <div className='mb-4'>
                  <label className='block text-text-secondary mb-2'>
                    Select Utility
                  </label>
                  <div className='relative'>
                    <select
                      value={selectedUtility}
                      onChange={handleUtilitySelect}
                      className='w-full p-3 pr-10 border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary'
                    >
                      <option value=''>-- Select a utility --</option>
                      {utilities.map((utility) => (
                        <option
                          key={utility.id}
                          value={utility.id}
                          disabled={
                            isServiceActive(utility.id) && !utility.isBetting
                          }
                        >
                          {utility.name}{' '}
                          {isServiceActive(utility.id) && !utility.isBetting
                            ? '(Active)'
                            : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className='absolute right-3 top-3 text-muted pointer-events-none'
                      size={18}
                    />
                  </div>
                </div>

                {/* Custom Amount Input for Betting */}
                {selectedUtilityObj?.isBetting && (
                  <div className='mb-4'>
                    <label className='block text-text-secondary mb-2'>
                      Amount to Deposit
                    </label>
                    <input
                      type='number'
                      value={customAmount}
                      onChange={handleAmountChange}
                      placeholder='Enter amount'
                      className='w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                )}

                {selectedUtilityObj && !selectedUtilityObj.isBetting && (
                  <div className='mb-4 p-3 bg-background rounded-lg flex justify-between'>
                    <span className='text-text-secondary'>Cost:</span>
                    <span className='font-medium'>
                      {selectedUtilityObj.cost} $TOKEN
                    </span>
                  </div>
                )}

                <button
                  onClick={handlePayNow}
                  disabled={
                    !isPurchaseValid() || transactionStatus === 'processing'
                  }
                  className={`w-full p-3 rounded-lg flex items-center justify-center ${
                    isPurchaseValid() && transactionStatus !== 'processing'
                      ? 'bg-primary text-white hover:bg-opacity-90'
                      : 'bg-muted bg-opacity-20 text-muted cursor-not-allowed'
                  } transition-colors duration-200`}
                >
                  <CreditCard size={18} className='mr-2' />
                  Pay Now
                </button>
              </div>

              {/* Available Utilities */}
              <div>
                <h2 className='text-xl font-bold mb-4'>Available Utilities</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {utilities.map((utility) => {
                    const status = getServiceStatus(utility.id);
                    const IconComponent = utility.icon;

                    return (
                      <div
                        key={utility.id}
                        className='border border-border rounded-lg p-4 flex'
                      >
                        <div className='h-12 w-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4'>
                          <IconComponent size={24} className='text-primary' />
                        </div>

                        <div className='flex-1'>
                          <h3 className='font-medium mb-1'>{utility.name}</h3>
                          <div className='text-sm text-text-secondary mb-2'>
                            {utility.isBetting
                              ? 'Custom amount'
                              : `${utility.cost} $TOKEN`}{' '}
                            • {utility.valid}
                          </div>
                          <div
                            className={`text-sm flex items-center ${
                              status === 'active'
                                ? 'text-success'
                                : 'text-muted'
                            }`}
                          >
                            {status === 'active' ? (
                              <>
                                <CheckCircle size={14} className='mr-1' />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle size={14} className='mr-1' />
                                Inactive
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            {/* Active Services */}
            <div className='bg-surface rounded-lg shadow-md p-6 mb-6'>
              <h2 className='text-xl font-bold mb-4 flex items-center'>
                <CheckCircle className='mr-2 text-primary' size={20} />
                Current Active Services
              </h2>

              {activeServices.length === 0 ? (
                <p className='text-text-secondary text-sm'>
                  No active services
                </p>
              ) : (
                <div className='space-y-4'>
                  {activeServices.map((service, index) => {
                    const utilityInfo = utilities.find(
                      (u) => u.id === service.id
                    );
                    const IconComponent = utilityInfo?.icon || Zap;

                    return (
                      <div
                        key={index}
                        className='flex items-center border-b border-border pb-4 last:border-0 last:pb-0'
                      >
                        <div className='h-10 w-10 rounded-full bg-success bg-opacity-10 flex items-center justify-center mr-3'>
                          <IconComponent size={18} className='text-success' />
                        </div>
                        <div>
                          <h3 className='font-medium'>{service.name}</h3>
                          <div className='text-sm text-text-secondary flex items-center'>
                            <Calendar size={14} className='mr-1' />
                            Expires: {service.expiresOn}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Payment History */}
            <div className='bg-surface rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold mb-4 flex items-center'>
                <History className='mr-2 text-primary' size={20} />
                Payment History
              </h2>

              <div className='space-y-4'>
                {paymentHistory.map((payment, index) => {
                  // Find utility to get icon
                  const utilityName = payment.service;
                  const utilityInfo = utilities.find(
                    (u) => u.name === utilityName
                  );
                  const IconComponent = utilityInfo?.icon || Zap;

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
                          <IconComponent size={16} className='text-primary' />
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
      {showConfirmation && (
        <div className='fixed inset-0 bg-overlay flex items-center justify-center z-50'>
          <div className='bg-surface rounded-lg shadow-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-xl font-bold mb-4'>Confirm Payment</h3>

            <div className='mb-6'>
              <p className='mb-4'>
                You are about to pay{' '}
                <span className='font-bold'>
                  {selectedUtilityObj?.isBetting
                    ? customAmount
                    : selectedUtilityObj?.cost}{' '}
                  $TOKEN
                </span>{' '}
                for{' '}
                <span className='font-bold'>{selectedUtilityObj?.name}</span>.
                Are you sure?
              </p>

              <div className='p-3 bg-background rounded-lg flex justify-between items-center'>
                <span className='text-text-secondary'>Estimated Gas:</span>
                <span className='font-medium'>0.0005 ETH</span>
              </div>
            </div>

            <div className='flex space-x-4'>
              <button
                onClick={confirmPayment}
                className='flex-1 bg-primary text-white p-3 rounded-lg hover:bg-opacity-90 flex items-center justify-center'
              >
                <CheckCircle size={18} className='mr-2' />
                Confirm Payment
              </button>

              <button
                onClick={cancelPayment}
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

export default UtilitiesPage;
