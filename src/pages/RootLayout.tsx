import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='font-gilroy-regular'>
      <div>
        Header
      </div>
      <Outlet />
     <div>Footer</div>
    </div>
  );
};

export default RootLayout;
