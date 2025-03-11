import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import RecentTransactions from '../components/RecentTransactions';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FC] font-['gilroy-regular']">
      <Hero />
      <Features />
      <HowItWorks />
      <RecentTransactions />
    </div>
  );
}

export default LandingPage