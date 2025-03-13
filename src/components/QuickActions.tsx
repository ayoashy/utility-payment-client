import { Coins, Zap, RefreshCw } from 'lucide-react';

const QuickActionCard = ({
  icon,
  title,
  description,
  buttonText,
  buttonColor,
  onClick,
}) => {
  return (
    <div className='bg-[#FFFFFF] rounded-lg p-5 flex flex-col h-full'>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          buttonColor === 'primary'
            ? 'bg-[#1A73E8]/10 text-[#1A73E8]'
            : buttonColor === 'secondary'
            ? 'bg-[#17C3B2]/10 text-[#17C3B2]'
            : 'bg-[#3D5A80]/10 text-[#3D5A80]'
        }`}
      >
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-[#0D1B2A] mb-2'>{title}</h3>
      <p className='text-sm text-[#3D5A80] mb-4 flex-grow'>{description}</p>
      <button
        onClick={onClick}
        className={`py-2 px-4 rounded-lg text-white text-sm font-medium transition-colors ${
          buttonColor === 'primary'
            ? 'bg-[#1A73E8] hover:bg-[#1558b7]'
            : buttonColor === 'secondary'
            ? 'bg-[#17C3B2] hover:bg-[#14a799]'
            : 'bg-[#3D5A80] hover:bg-[#2c415f]'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

const QuickActions = () => {
  const actions = [
    {
      icon: <Coins size={24} />,
      title: 'Claim Free Tokens',
      description:
        'Get free UT tokens to try out the platform or top up your balance.',
      buttonText: 'Visit Faucet',
      buttonColor: 'primary',
      onClick: () => console.log('Navigate to faucet page'),
    },
    {
      icon: <Zap size={24} />,
      title: 'Pay for Utilities',
      description:
        'Pay your bills securely with UT tokens for various services.',
      buttonText: 'Pay Bills',
      buttonColor: 'secondary',
      onClick: () => console.log('Navigate to utilities page'),
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Manage Subscriptions',
      description: 'View and control your active utility subscriptions.',
      buttonText: 'View Subscriptions',
      buttonColor: 'default',
      onClick: () => console.log('Navigate to subscriptions page'),
    },
  ];

  return (
    <div className='bg-[#FFFFFF] rounded-lg shadow-sm overflow-hidden'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-[#0D1B2A] mb-6'>Quick Actions</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {actions.map((action, index) => (
            <QuickActionCard
              key={index}
              icon={action.icon}
              title={action.title}
              description={action.description}
              buttonText={action.buttonText}
              buttonColor={action.buttonColor}
              onClick={action.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
