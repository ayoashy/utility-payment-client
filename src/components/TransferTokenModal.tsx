import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';

interface TransferTokenModalProps {
  onClose: () => void;
  tokenSymbol: string;
  maxAmount: number;
}

const TransferTokenModal: React.FC<TransferTokenModalProps> = ({
  onClose,
  tokenSymbol,
  maxAmount,
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!recipient) newErrors.recipient = 'Recipient address is required';
    else if (!recipient.startsWith('0x') || recipient.length !== 42) {
      newErrors.recipient = 'Invalid wallet address format';
    }

    if (!amount) newErrors.amount = 'Amount is required';
    else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    } else if (Number(amount) > maxAmount) {
      newErrors.amount = `Not enough balance. Maximum: ${maxAmount} ${tokenSymbol}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Move to confirmation step
    setStep(2);
  };

  const handleConfirm = async () => {
    try {
      // In a real app, you would call your blockchain transfer function here
      // For demonstration, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(3);

      // Automatically close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setErrors({ submit: 'Transfer failed. Please try again.' });
      setStep(1);
    }
  };

  return (
    <div className='fixed inset-0 bg-[#0D1B2A]/50 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden'>
        {/* Header */}
        <div className='px-6 py-4 border-b border-[#D1D9E6] flex justify-between items-center'>
          <h3 className='text-lg font-bold text-[#0D1B2A]'>
            {step === 1
              ? 'Transfer Tokens'
              : step === 2
              ? 'Confirm Transfer'
              : 'Transfer Successful'}
          </h3>
          <button
            onClick={onClose}
            className='text-[#64748B] hover:text-[#0D1B2A] transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Step */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className='p-6'>
            {/* Recipient Field */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-[#3D5A80] mb-1'>
                Recipient Address
              </label>
              <input
                type='text'
                placeholder='0x...'
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className={`w-full p-3 border ${
                  errors.recipient ? 'border-[#EF4444]' : 'border-[#D1D9E6]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/50`}
              />
              {errors.recipient && (
                <p className='mt-1 text-sm text-[#EF4444] flex items-center'>
                  <AlertCircle size={14} className='mr-1' />
                  {errors.recipient}
                </p>
              )}
            </div>

            {/* Amount Field */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-[#3D5A80] mb-1'>
                Amount
              </label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='0.00'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full p-3 border ${
                    errors.amount ? 'border-[#EF4444]' : 'border-[#D1D9E6]'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/50 pr-16`}
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3D5A80] font-medium'>
                  {tokenSymbol}
                </div>
              </div>
              {errors.amount && (
                <p className='mt-1 text-sm text-[#EF4444] flex items-center'>
                  <AlertCircle size={14} className='mr-1' />
                  {errors.amount}
                </p>
              )}
              <p className='mt-1 text-sm text-[#64748B]'>
                Available: {maxAmount} {tokenSymbol}
              </p>
            </div>

            {/* Note Field (Optional) */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-[#3D5A80] mb-1'>
                Note (Optional)
              </label>
              <textarea
                placeholder='Add a note to this transfer...'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className='w-full p-3 border border-[#D1D9E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/50 h-20 resize-none'
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-[#1A73E8] text-white py-3 px-4 rounded-lg hover:bg-[#1557B0] transition-colors flex items-center justify-center font-medium'
            >
              <Send size={18} className='mr-2' />
              Continue to Review
            </button>
          </form>
        )}

        {/* Confirmation Step */}
        {step === 2 && (
          <div className='p-6'>
            <div className='bg-[#F4F7FC] rounded-lg p-4 mb-6'>
              <div className='mb-4'>
                <p className='text-sm text-[#64748B]'>Sending to</p>
                <p className='text-[#0D1B2A] font-medium break-all'>
                  {recipient}
                </p>
              </div>
              <div className='mb-4'>
                <p className='text-sm text-[#64748B]'>Amount</p>
                <p className='text-[#0D1B2A] font-medium'>
                  {amount} {tokenSymbol}
                </p>
              </div>
              {note && (
                <div>
                  <p className='text-sm text-[#64748B]'>Note</p>
                  <p className='text-[#0D1B2A]'>{note}</p>
                </div>
              )}
            </div>

            <div className='flex space-x-4'>
              <button
                onClick={() => setStep(1)}
                className='flex-1 py-3 px-4 border border-[#D1D9E6] rounded-lg hover:bg-[#F4F7FC] transition-colors'
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className='flex-1 bg-[#1A73E8] text-white py-3 px-4 rounded-lg hover:bg-[#1557B0] transition-colors flex items-center justify-center'
              >
                <Send size={18} className='mr-2' />
                Confirm Transfer
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 3 && (
          <div className='p-6 text-center'>
            <div className='w-16 h-16 bg-[#34D399] rounded-full mx-auto mb-4 flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h4 className='text-lg font-semibold text-[#0D1B2A] mb-2'>
              Transfer Successful
            </h4>
            <p className='text-[#64748B]'>
              Your transfer of {amount} {tokenSymbol} has been initiated
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferTokenModal;
