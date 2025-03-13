import {
  CheckCircle,
  Clock,
  XCircle,
  ArrowDown,
  ArrowUp,
  Zap,
  RefreshCw,
  Send,
} from 'lucide-react';

const TransactionRow = ({ transaction }) => {
  // Determine icon based on transaction type
  const getIcon = (type) => {
    switch (type) {
      case 'Faucet Claim':
        return <ArrowDown size={16} className='text-[#34D399]' />;
      case 'Utility Payment':
        return <Zap size={16} className='text-[#1A73E8]' />;
      case 'Subscription Renewal':
        return <RefreshCw size={16} className='text-[#17C3B2]' />;
      case 'Transfer':
        return <Send size={16} className='text-[#3D5A80]' />;
      default:
        return <ArrowUp size={16} className='text-[#3D5A80]' />;
    }
  };

  // Determine status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className='text-[#34D399]' />;
      case 'pending':
        return <Clock size={16} className='text-[#FACC15]' />;
      case 'failed':
        return <XCircle size={16} className='text-[#EF4444]' />;
      default:
        return null;
    }
  };

  return (
    <tr className='border-b border-[#D1D9E6] hover:bg-[#F4F7FC]'>
      <td className='py-4 pl-6'>
        <div className='flex items-center'>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              transaction.type === 'Faucet Claim'
                ? 'bg-[#34D399]/10'
                : transaction.type === 'Utility Payment'
                ? 'bg-[#1A73E8]/10'
                : transaction.type === 'Subscription Renewal'
                ? 'bg-[#17C3B2]/10'
                : 'bg-[#3D5A80]/10'
            }`}
          >
            {getIcon(transaction.type)}
          </div>
          <div>
            <p className='font-medium text-[#0D1B2A]'>{transaction.type}</p>
            {transaction.service && (
              <p className='text-xs text-[#64748B]'>{transaction.service}</p>
            )}
          </div>
        </div>
      </td>
      <td className='py-4'>
        <span
          className={`font-medium ${
            transaction.amount > 0 ? 'text-[#34D399]' : 'text-[#0D1B2A]'
          }`}
        >
          {transaction.amount > 0 ? '+' : ''}
          {transaction.amount} UT
        </span>
      </td>
      <td className='py-4 text-[#64748B]'>{transaction.date}</td>
      <td className='py-4 pr-6'>
        <div className='flex items-center justify-end'>
          {getStatusIcon(transaction.status)}
          <span className='ml-1 text-sm capitalize'>{transaction.status}</span>
        </div>
      </td>
    </tr>
  );
};

const TransactionHistory = ({ transactions }) => {
  return (
    <div className='bg-[#FFFFFF] rounded-lg shadow-sm overflow-hidden'>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-[#0D1B2A]'>
            Transaction History
          </h2>
          <button className='text-sm text-[#1A73E8] hover:underline'>
            View All
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-[#F4F7FC] text-[#3D5A80] text-sm'>
                <th className='py-3 pl-6 text-left font-medium'>Transaction</th>
                <th className='py-3 text-left font-medium'>Amount</th>
                <th className='py-3 text-left font-medium'>Date</th>
                <th className='py-3 pr-6 text-right font-medium'>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-6 flex justify-center'>
          <button className='py-2 px-4 bg-[#F4F7FC] hover:bg-[#D1D9E6] text-[#3D5A80] rounded-lg text-sm font-medium transition-colors'>
            View Full History
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
