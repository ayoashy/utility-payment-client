import {
  Wallet,
  Coins,
  CheckCircle,
  CreditCard,
  ClipboardList,
} from 'lucide-react';

const StepCard = ({ number, icon, title, description }) => {
  return (
    <div className='flex items-start'>
      <div className='bg-[#1A73E8] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
        {number}
      </div>
      <div className='ml-4'>
        <div className='flex items-center mb-2'>
          {icon}
          <h3 className='text-xl font-bold text-[#0D1B2A] ml-2'>{title}</h3>
        </div>
        <p className='text-[#3D5A80]'>{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Wallet size={20} className='text-[#1A73E8]' />,
      title: 'Connect Wallet',
      description:
        'Connect your MetaMask, WalletConnect, or other compatible wallet to get started.',
    },
    {
      icon: <Coins size={20} className='text-[#17C3B2]' />,
      title: 'Claim Free Tokens',
      description:
        'Use our faucet to claim free UT tokens and start using the platform.',
    },
    {
      icon: <CheckCircle size={20} className='text-[#1A73E8]' />,
      title: 'Approve Token Spending',
      description:
        'Approve the smart contract to use your tokens for utility payments.',
    },
    {
      icon: <CreditCard size={20} className='text-[#17C3B2]' />,
      title: 'Make Utility Payments',
      description:
        'Select utilities to pay for and confirm the transaction with your wallet.',
    },
    {
      icon: <ClipboardList size={20} className='text-[#1A73E8]' />,
      title: 'Track Subscriptions & History',
      description:
        'Monitor your payment history and manage active subscriptions from your dashboard.',
    },
  ];

  return (
    <div className='bg-[#FFFFFF] py-16 px-4 sm:px-8 lg:px-16'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#0D1B2A] mb-4'>
            How It Works
          </h2>
          <p className='text-lg text-[#3D5A80] max-w-2xl mx-auto'>
            Follow these simple steps to start paying for your utilities using
            blockchain technology.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8'>
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
