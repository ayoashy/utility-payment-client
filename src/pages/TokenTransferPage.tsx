import React, { useState } from 'react';
import {
  Send,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  AlertTriangle,
  Wallet,
  CreditCard,
  History,
} from 'lucide-react';

const TokenTransferPage = () => {
  const [balance] = useState(1000);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [recentTransactions] = useState([
    {
      date: 'March 12, 2025',
      recipient: '0xabc1...def2',
      amount: 75,
      status: 'success',
    },
    {
      date: 'March 10, 2025',
      recipient: '0x2345...6789',
      amount: 150,
      status: 'success',
    },
    {
      date: 'March 8, 2025',
      recipient: '0xfed5...cba6',
      amount: 30,
      status: 'success',
    },
    {
      date: 'March 6, 2025',
      recipient: '0x9876...5432',
      amount: 50,
      status: 'failed',
    },
    {
      date: 'March 4, 2025',
      recipient: '0xabcd...ef12',
      amount: 25,
      status: 'success',
    },
  ]);

  const validateAddress = (addr) => {
    // Simple Ethereum address validation (starts with 0x and has 42 characters in total)
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  const validateAmount = (amt) => {
    const parsedAmount = parseFloat(amt);
    return !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= balance;
  };

  const handleAddressChange = (e) => {
    const addr = e.target.value;
    setAddress(addr);

    if (addr && !validateAddress(addr)) {
      setAddressError('⚠️ Invalid wallet address!');
    } else {
      setAddressError('');
    }
  };

  const handleAmountChange = (e) => {
    const amt = e.target.value;
    setAmount(amt);

    if (amt) {
      if (isNaN(parseFloat(amt)) || parseFloat(amt) <= 0) {
        setAmountError('⚠️ Please enter a valid amount!');
      } else if (parseFloat(amt) > balance) {
        setAmountError('⚠️ Insufficient balance!');
      } else {
        setAmountError('');
      }
    } else {
      setAmountError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateAddress(address) && validateAmount(amount)) {
      setShowConfirmation(true);
    } else {
      if (!validateAddress(address)) {
        setAddressError('⚠️ Invalid wallet address!');
      }
      if (!validateAmount(amount)) {
        setAmountError('⚠️ Please enter a valid amount!');
      }
    }
  };

  const confirmTransaction = () => {
    // Simulate transaction processing
    setShowConfirmation(false);
    setTransactionStatus('processing');

    setTimeout(() => {
      // 80% chance of success for demo purposes
      const success = Math.random() > 0.2;

      if (success) {
        setTransactionStatus('success');
        // Clear form after success
        setAddress('');
        setAmount('');
      } else {
        setTransactionStatus('failed');
      }

      // Clear status after 5 seconds
      setTimeout(() => {
        setTransactionStatus(null);
      }, 5000);
    }, 2000);
  };

  const cancelTransaction = () => {
    setShowConfirmation(false);
  };

  const isFormValid = address && amount && !addressError && !amountError;

  return (
    <div className='min-h-screen bg-background text-text-primary font-gilroy-regular'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Transfer Form Section */}
          <div className='lg:col-span-2'>
            <div className='bg-surface rounded-lg shadow-md p-6'>
              <h1 className='text-2xl font-bold mb-6 flex items-center'>
                <Send className='mr-2 text-primary' size={24} />
                Transfer Tokens
              </h1>

              {/* Balance Display */}
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
                  <span>Processing your transaction...</span>
                </div>
              )}

              {transactionStatus === 'success' && (
                <div className='mb-6 p-4 bg-success bg-opacity-10 text-success rounded-lg flex items-center'>
                  <CheckCircle className='mr-2' size={20} />
                  <span>
                    ✅ Transfer Successful! {amount} $TOKEN sent to {address}
                  </span>
                </div>
              )}

              {transactionStatus === 'failed' && (
                <div className='mb-6 p-4 bg-error bg-opacity-10 text-error rounded-lg flex items-center'>
                  <XCircle className='mr-2' size={20} />
                  <span>⚠️ Transaction Failed! Please try again.</span>
                </div>
              )}

              {/* Transfer Form */}
              <form onSubmit={handleSubmit}>
                {/* Recipient Address Input */}
                <div className='mb-6'>
                  <label className='block text-text-secondary mb-2'>
                    Recipient Address
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={address}
                      onChange={handleAddressChange}
                      placeholder="Enter recipient's wallet address"
                      className={`w-full p-3 border ${
                        addressError ? 'border-error' : 'border-border'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pl-10`}
                    />
                    <Wallet
                      className='absolute left-3 top-3 text-muted'
                      size={18}
                    />
                  </div>
                  {addressError && (
                    <p className='mt-2 text-error flex items-center'>
                      <AlertCircle size={16} className='mr-1' />
                      {addressError}
                    </p>
                  )}
                </div>

                {/* Amount Input */}
                <div className='mb-6'>
                  <label className='block text-text-secondary mb-2'>
                    Amount
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder='Enter amount to send'
                      className={`w-full p-3 border ${
                        amountError ? 'border-error' : 'border-border'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pl-10`}
                    />
                    <CreditCard
                      className='absolute left-3 top-3 text-muted'
                      size={18}
                    />
                  </div>
                  {amountError && (
                    <p className='mt-2 text-error flex items-center'>
                      <AlertCircle size={16} className='mr-1' />
                      {amountError}
                    </p>
                  )}
                </div>

                {/* Send Button */}
                <button
                  type='submit'
                  disabled={!isFormValid || transactionStatus === 'processing'}
                  className={`w-full p-3 rounded-lg flex items-center justify-center ${
                    isFormValid && transactionStatus !== 'processing'
                      ? 'bg-primary text-white hover:bg-opacity-90'
                      : 'bg-muted bg-opacity-20 text-muted cursor-not-allowed'
                  } transition-colors duration-200`}
                >
                  <Send size={18} className='mr-2' />
                  Send $TOKEN
                </button>
              </form>
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className='lg:col-span-1'>
            <div className='bg-surface rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold mb-4 flex items-center'>
                <History className='mr-2 text-primary' size={20} />
                Recent Transactions
              </h2>

              <div className='space-y-4'>
                {recentTransactions.map((tx, index) => (
                  <div
                    key={index}
                    className='border-b border-border pb-3 last:border-0'
                  >
                    <div className='flex justify-between items-start mb-1'>
                      <span className='text-sm text-muted'>{tx.date}</span>
                      <span
                        className={`flex items-center ${
                          tx.status === 'success'
                            ? 'text-success'
                            : 'text-error'
                        }`}
                      >
                        {tx.status === 'success' ? (
                          <CheckCircle size={16} className='mr-1' />
                        ) : (
                          <XCircle size={16} className='mr-1' />
                        )}
                        {tx.status === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-text-secondary text-sm truncate w-32'>
                        {tx.recipient}
                      </span>
                      <div className='flex items-center'>
                        <ArrowRight size={14} className='mx-2 text-muted' />
                        <span className='font-medium'>{tx.amount} $TOKEN</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className='fixed inset-0 bg-overlay flex items-center justify-center z-50'>
          <div className='bg-surface rounded-lg shadow-lg p-6 max-w-md w-full mx-4'>
            <h3 className='text-xl font-bold mb-4'>Confirm Transaction</h3>

            <div className='mb-6'>
              <p className='mb-4'>
                Are you sure you want to send{' '}
                <span className='font-bold'>{amount} $TOKEN</span> to{' '}
                <span className='font-bold'>{address}</span>?
              </p>

              <div className='p-3 bg-background rounded-lg flex justify-between items-center'>
                <span className='text-text-secondary'>Estimated Gas:</span>
                <span className='font-medium'>0.0005 ETH</span>
              </div>
            </div>

            <div className='flex space-x-4'>
              <button
                onClick={confirmTransaction}
                className='flex-1 bg-primary text-white p-3 rounded-lg hover:bg-opacity-90 flex items-center justify-center'
              >
                <CheckCircle size={18} className='mr-2' />
                Confirm & Send
              </button>

              <button
                onClick={cancelTransaction}
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

export default TokenTransferPage;
