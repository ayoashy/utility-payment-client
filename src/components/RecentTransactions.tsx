import React from 'react';
import { ArrowDown, ArrowUp, Clock } from 'lucide-react';

const TransactionCard = ({ type, title, amount, time, status }) => {
  const isIncoming = type === 'incoming';

  return (
    <div className='bg-[#FFFFFF] p-4 rounded-lg shadow-sm flex items-center justify-between'>
      <div className='flex items-center'>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isIncoming ? 'bg-[#34D399]/10' : 'bg-[#1A73E8]/10'
          }`}
        >
          {isIncoming ? (
            <ArrowDown size={20} className='text-[#34D399]' />
          ) : (
            <ArrowUp size={20} className='text-[#1A73E8]' />
          )}
        </div>
        <div className='ml-3'>
          <h4 className='font-medium text-[#0D1B2A]'>{title}</h4>
          <div className='flex items-center text-sm text-[#64748B]'>
            <Clock size={14} className='mr-1' />
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div className='text-right'>
        <div
          className={`font-bold ${
            isIncoming ? 'text-[#34D399]' : 'text-[#0D1B2A]'
          }`}
        >
          {isIncoming ? '+' : '-'}
          {amount} UT
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === 'Completed'
              ? 'bg-[#34D399]/10 text-[#34D399]'
              : status === 'Pending'
              ? 'bg-[#FACC15]/10 text-[#FACC15]'
              : 'bg-[#3B82F6]/10 text-[#3B82F6]'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

const RecentTransactions = () => {
  // Mock transaction data
  const transactions = [
    {
      type: 'outgoing',
      title: 'Electricity Bill Payment',
      amount: '120',
      time: '2 hours ago',
      status: 'Completed',
    },
    {
      type: 'incoming',
      title: 'Token Claim from Faucet',
      amount: '500',
      time: '5 hours ago',
      status: 'Completed',
    },
    {
      type: 'outgoing',
      title: 'Internet Subscription',
      amount: '75',
      time: '1 day ago',
      status: 'Completed',
    },
    {
      type: 'outgoing',
      title: 'Water Bill Payment',
      amount: '45',
      time: '2 days ago',
      status: 'Completed',
    },
  ];

  return (
    <div className='py-16 px-4 sm:px-8 lg:px-16'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#0D1B2A] mb-4'>
            Recent Transactions
          </h2>
          <p className='text-lg text-[#3D5A80] max-w-2xl mx-auto'>
            Stay updated with the latest activities on our platform.
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {transactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              type={transaction.type}
              title={transaction.title}
              amount={transaction.amount}
              time={transaction.time}
              status={transaction.status}
            />
          ))}
        </div>
        <div className='mt-8 text-center'>
          <button className='px-6 py-3 border border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8]/5 rounded-lg font-medium transition-colors'>
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
