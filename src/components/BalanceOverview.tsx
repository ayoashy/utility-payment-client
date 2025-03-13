import {
  Wallet,
  TrendingDown,
  Calendar,
  ArrowUpRight,
  Send,
} from 'lucide-react';

const BalanceOverview = ({ userData, openTransferModal }) => {
  // Format date from ISO to more readable format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='bg-[#FFFFFF] rounded-lg shadow-sm overflow-hidden'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-[#0D1B2A] mb-6'>
          Balance Overview
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Total Token Balance */}
          <div className='bg-gradient-to-r from-[#1A73E8] to-[#1558b7] text-white rounded-lg p-5'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <p className='text-white/80 text-sm'>Total Balance</p>
                <h3 className='text-2xl font-bold mt-1'>
                  {userData.tokenBalance} {userData.tokenSymbol}
                </h3>
              </div>
              <div className='bg-white/20 p-2 rounded-lg'>
                <Wallet size={20} />
              </div>
            </div>
            <div className='flex space-x-2'>
              <button
                onClick={openTransferModal}
                className='flex items-center justify-center py-2 px-3 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors'
              >
                <Send size={14} className='mr-1' />
                Transfer
              </button>
              <button className='flex items-center justify-center py-2 px-3 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors'>
                <ArrowUpRight size={14} className='mr-1' />
                Add Funds
              </button>
            </div>
          </div>

          {/* Total Utility Expenses */}
          <div className='bg-[#F4F7FC] rounded-lg p-5'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <p className='text-[#3D5A80] text-sm'>Total Expenses</p>
                <h3 className='text-xl font-bold text-[#0D1B2A] mt-1'>
                  {userData.totalExpenses} {userData.tokenSymbol}
                </h3>
              </div>
              <div className='bg-[#D1D9E6] p-2 rounded-lg text-[#3D5A80]'>
                <TrendingDown size={20} />
              </div>
            </div>
            <div className='mt-2'>
              <div className='bg-[#D1D9E6] h-2 rounded-full w-full overflow-hidden'>
                <div
                  className='bg-[#1A73E8] h-full rounded-full'
                  style={{
                    width: `${
                      (userData.totalExpenses / userData.tokenBalance) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className='text-xs text-[#64748B] mt-1'>
                {(
                  (userData.totalExpenses / userData.tokenBalance) *
                  100
                ).toFixed(0)}
                % of your balance
              </p>
            </div>
          </div>

          {/* Next Payment Due */}
          <div className='bg-[#F4F7FC] rounded-lg p-5'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <p className='text-[#3D5A80] text-sm'>Next Payment Due</p>
                <h3 className='text-xl font-bold text-[#0D1B2A] mt-1'>
                  {userData.nextPaymentAmount} {userData.tokenSymbol}
                </h3>
              </div>
              <div className='bg-[#D1D9E6] p-2 rounded-lg text-[#3D5A80]'>
                <Calendar size={20} />
              </div>
            </div>
            <div className='mt-2'>
              <div className='flex justify-between'>
                <p className='text-sm text-[#3D5A80]'>
                  {userData.nextPaymentService}
                </p>
                <p className='text-sm font-medium text-[#0D1B2A]'>
                  {formatDate(userData.nextPaymentDate)}
                </p>
              </div>
              <button className='mt-2 text-sm text-[#1A73E8] hover:underline flex items-center'>
                <Calendar size={14} className='mr-1' />
                View all upcoming payments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview;
