// import { ConnectButton } from "@rainbow-me/rainbowkit";
import {useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

const Homepage = () => {
  const { connect } = useConnect();
  return (
    <div>
      <p>Homepage</p>
      {/* <ConnectButton /> */}
      <button
        onClick={() => connect({ connector: injected() })}
        className='w-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 rounded-lg flex flex-col items-center justify-center p-6'
      >
        <div className='bg-yellow-500/10 p-3 rounded-full mb-3'>
        </div>
        <span className='text-gray-300'>
          Connect your wallet to start playing
        </span>
      </button>
    </div>
  );
}

export default Homepage