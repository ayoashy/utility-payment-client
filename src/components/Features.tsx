import { Coins, Zap, ClipboardList, Shield } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className='bg-[#FFFFFF] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
      <div className='bg-[#F4F7FC] w-16 h-16 rounded-full flex items-center justify-center mb-4'>
        {icon}
      </div>
      <h3 className='text-xl font-bold text-[#0D1B2A] mb-2'>{title}</h3>
      <p className='text-[#3D5A80]'>{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Coins size={28} className='text-[#1A73E8]' />,
      title: 'Free Token Faucet',
      description:
        'Claim free UT tokens to get started with our platform and explore its features.',
    },
    {
      icon: <Zap size={28} className='text-[#17C3B2]' />,
      title: 'Easy Utility Payments',
      description:
        'Pay for electricity, internet, water, and more services with UT tokens.',
    },
    {
      icon: <ClipboardList size={28} className='text-[#1A73E8]' />,
      title: 'Track Subscriptions',
      description:
        'View and manage all your ongoing utility subscriptions in one place.',
    },
    {
      icon: <Shield size={28} className='text-[#17C3B2]' />,
      title: 'Fast & Secure Transactions',
      description:
        'Blockchain-powered payments ensure speed, security, and transparency.',
    },
  ];

  return (
    <div className='py-16 px-4 sm:px-8 lg:px-16'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#0D1B2A] mb-4'>
            Platform Features
          </h2>
          <p className='text-lg text-[#3D5A80] max-w-2xl mx-auto'>
            Experience the benefits of blockchain technology for your everyday
            utility payments.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
