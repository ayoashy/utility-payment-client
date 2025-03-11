import { Wallet2, Zap, CreditCard } from 'lucide-react';

const Hero = () => {
  return (
    <div className='bg-[#FFFFFF] py-16 px-4 sm:px-8 lg:px-16'>
      <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between'>
        <div className='lg:w-1/2 mb-10 lg:mb-0'>
          <h1 className='text-4xl sm:text-5xl font-bold text-[#0D1B2A] mb-4'>
            Blockchain Utility Payments Made Simple
          </h1>
          <p className='text-lg text-[#3D5A80] mb-8 max-w-lg'>
            Claim free tokens and pay for your utilities in seconds. Our
            blockchain-based platform makes managing and paying for essential
            services faster, more secure, and hassle-free.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <button className='px-6 py-3 bg-[#1A73E8] hover:bg-[#1558b7] text-white rounded-lg font-semibold flex items-center justify-center transition-colors'>
              <Zap size={20} className='mr-2' />
              Claim Free Tokens
            </button>
            <button className='px-6 py-3 bg-[#17C3B2] hover:bg-[#14a799] text-white rounded-lg font-semibold flex items-center justify-center transition-colors'>
              <CreditCard size={20} className='mr-2' />
              Pay Your Bills
            </button>
          </div>
        </div>
        <div className='lg:w-1/2 flex justify-center'>
          <div className='relative w-full max-w-md'>
            <div className='absolute -inset-1 rounded-lg bg-gradient-to-r from-[#1A73E8] to-[#17C3B2] opacity-75 blur'></div>
            <div className='relative bg-[#FFFFFF] p-6 rounded-lg shadow-xl'>
              <div className='flex justify-center mb-6'>
                <Wallet2 size={64} className='text-[#1A73E8]' />
              </div>
              <div className='bg-[#F4F7FC] p-4 rounded-lg mb-4'>
                <div className='flex justify-between mb-2'>
                  <span className='text-[#3D5A80]'>Available Balance</span>
                  <span className='font-bold text-[#0D1B2A]'>1,250 UT</span>
                </div>
                <div className='w-full bg-[#D1D9E6] h-2 rounded-full'>
                  <div className='bg-[#1A73E8] h-2 rounded-full w-3/4'></div>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='flex justify-between p-3 bg-[#F4F7FC] rounded-lg'>
                  <span className='text-[#3D5A80]'>Electricity</span>
                  <span className='font-bold text-[#0D1B2A]'>350 UT</span>
                </div>
                <div className='flex justify-between p-3 bg-[#F4F7FC] rounded-lg'>
                  <span className='text-[#3D5A80]'>Internet</span>
                  <span className='font-bold text-[#0D1B2A]'>200 UT</span>
                </div>
                <div className='flex justify-between p-3 bg-[#F4F7FC] rounded-lg'>
                  <span className='text-[#3D5A80]'>Water</span>
                  <span className='font-bold text-[#0D1B2A]'>175 UT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
