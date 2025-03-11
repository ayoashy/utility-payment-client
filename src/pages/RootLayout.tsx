// import { Outlet } from 'react-router';

// const RootLayout = () => {
//   return (
//     <div className='font-gilroy-regular'>
//       <div>
//         Header
//       </div>
//       <Outlet />
//      <div>Footer</div>
//     </div>
//   );
// };

// export default RootLayout;


// import { Outlet } from 'react-router';
// import { useState } from 'react';

// const RootLayout = () => {
//   // State for active menu item
//   const [activeItem, setActiveItem] = useState('home');

//   // Menu items
//   const menuItems = [
//     { id: 'home', label: 'Home', icon: 'grid' },
//     { id: 'products', label: 'Products', icon: 'package' },
//     { id: 'profile', label: 'Profile', icon: 'user' },
//     { id: 'settings', label: 'Settings', icon: 'settings' },
//   ];

//   return (
//     <div className='flex h-screen font-gilroy-regular bg-background'>
//       {/* Static Sidebar */}
//       <aside className='w-64 bg-text-primary text-white flex flex-col h-screen fixed'>
//         {/* Logo */}
//         <div className='p-4 flex items-center'>
//           <div className='bg-primary w-8 h-8 rounded-md flex items-center justify-center'>
//             <span className='text-white text-lg font-bold'>T</span>
//           </div>
//           <h1 className='ml-3 text-xl font-semibold'>Trackify</h1>
//         </div>

//         {/* Menu */}
//         <div className='mt-8'>
//           <h2 className='px-4 text-sm font-semibold text-gray-400 uppercase'>
//             MENU
//           </h2>
//           <nav className='mt-4'>
//             {menuItems.map((item) => (
//               <a
//                 key={item.id}
//                 href={`#${item.id}`}
//                 className={`flex items-center px-4 py-3 ${
//                   activeItem === item.id ? 'bg-opacity-20 bg-white' : ''
//                 }`}
//                 onClick={() => setActiveItem(item.id)}
//               >
//                 <div className='w-6 h-6 flex items-center justify-center'>
//                   <svg
//                     className='w-5 h-5'
//                     fill='none'
//                     stroke='currentColor'
//                     viewBox='0 0 24 24'
//                   >
//                     {item.icon === 'grid' && (
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M4 6h16M4 12h16m-7 6h7'
//                       />
//                     )}
//                     {item.icon === 'package' && (
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10'
//                       />
//                     )}
//                     {item.icon === 'user' && (
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
//                       />
//                     )}
//                     {item.icon === 'settings' && (
//                       <path
//                         strokeLinecap='round'
//                         strokeLinejoin='round'
//                         strokeWidth={2}
//                         d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
//                       />
//                     )}
//                   </svg>
//                 </div>
//                 <span className='ml-3'>{item.label}</span>
//               </a>
//             ))}
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className='flex-1 ml-64 flex flex-col min-h-screen'>
//         {/* Header */}
//         <header className='bg-surface shadow-sm z-10'>
//           <div className='flex justify-between items-center px-6 py-4'>
//             <div className='flex items-center'>
//               <h1 className='text-xl font-semibold text-text-primary'>
//                 Dashboard
//               </h1>
//               <nav className='ml-6'>
//                 <ol className='flex text-sm'>
//                   <li>
//                     <a href='#' className='text-primary'>
//                       Dashboard
//                     </a>
//                   </li>
//                   <li className='mx-2 text-muted'>/</li>
//                   <li className='text-text-secondary'>Home</li>
//                 </ol>
//               </nav>
//             </div>

//             <div className='flex items-center'>
//               <button className='p-2 rounded-full hover:bg-background mr-2'>
//                 <svg
//                   className='w-5 h-5 text-text-secondary'
//                   fill='none'
//                   stroke='currentColor'
//                   viewBox='0 0 24 24'
//                 >
//                   <path
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth={2}
//                     d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
//                   />
//                 </svg>
//               </button>
//               <div className='flex items-center ml-4'>
//                 <div className='font-medium'>
//                   <div className='text-sm text-text-primary'>Admin Demo</div>
//                   <div className='text-xs text-muted'>admin</div>
//                 </div>
//                 <div className='ml-3 relative'>
//                   <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white'>
//                     A
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className='flex-1 overflow-auto bg-background p-6'>
//           <Outlet />
//         </main>

//         {/* Footer */}
//         <footer className='bg-surface py-4 px-6 border-t border-border'>
//           <div className='text-center text-sm text-muted'>
//             &copy; {new Date().getFullYear()} Trackify. All rights reserved.
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default RootLayout;

import { Link, Outlet } from 'react-router';
import { useState, useEffect } from 'react';

const RootLayout = () => {
  // State for active menu item
  const [activeItem, setActiveItem] = useState('home');
  // State for sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);

  // Menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'faucets', label: 'Faucets', icon: 'package' },
    { id: 'utilities', label: 'Utilities', icon: 'user' },
    { id: 'subscriptions', label: 'Subscriptions', icon: 'settings' },
    { id: 'history', label: 'history', icon: 'settings' },
  ];

  // Handle screen resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  const handleContentClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className='flex h-screen font-gilroy-regular bg-background'>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          className='fixed inset-0 bg-overlay z-20'
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - fixed on desktop, absolute on mobile with z-index */}
      <aside
        className={`
          ${isMobile ? 'absolute' : 'fixed'} 
          ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          w-64 bg-text-primary text-white h-screen z-30
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Logo */}
        <div className='p-4 flex items-center'>
          <div className='bg-primary w-8 h-8 rounded-md flex items-center justify-center'>
            <span className='text-white text-lg font-bold'>T</span>
          </div>
          <h1 className='ml-3 text-xl font-semibold'>Trackify</h1>

          {/* Close button only visible on mobile */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className='ml-auto text-white p-1'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>

        {/* Menu */}
        <div className='mt-8'>
          <h2 className='px-4 text-sm font-semibold text-gray-400 uppercase'>
            MENU
          </h2>
          <nav className='mt-4'>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`flex items-center px-4 py-3 ${
                  activeItem === item.id ? 'bg-opacity-20 bg-white' : ''
                }`}
                onClick={() => {
                  setActiveItem(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                <div className='w-6 h-6 flex items-center justify-center'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    {item.icon === 'grid' && (
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 6h16M4 12h16m-7 6h7'
                      />
                    )}
                    {item.icon === 'package' && (
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10'
                      />
                    )}
                    {item.icon === 'user' && (
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    )}
                    {item.icon === 'settings' && (
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                      />
                    )}
                  </svg>
                </div>
                <span className='ml-3'>{item.label}</span>
              </Link>
              // <a
              //   key={item.id}
              //   href={`#${item.id}`}
              //   className={`flex items-center px-4 py-3 ${
              //     activeItem === item.id ? 'bg-opacity-20 bg-white' : ''
              //   }`}
              //   onClick={() => {
              //     setActiveItem(item.id);
              //     if (isMobile) setSidebarOpen(false);
              //   }}
              // >
              //   <div className='w-6 h-6 flex items-center justify-center'>
              //     <svg
              //       className='w-5 h-5'
              //       fill='none'
              //       stroke='currentColor'
              //       viewBox='0 0 24 24'
              //     >
              //       {item.icon === 'grid' && (
              //         <path
              //           strokeLinecap='round'
              //           strokeLinejoin='round'
              //           strokeWidth={2}
              //           d='M4 6h16M4 12h16m-7 6h7'
              //         />
              //       )}
              //       {item.icon === 'package' && (
              //         <path
              //           strokeLinecap='round'
              //           strokeLinejoin='round'
              //           strokeWidth={2}
              //           d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10'
              //         />
              //       )}
              //       {item.icon === 'user' && (
              //         <path
              //           strokeLinecap='round'
              //           strokeLinejoin='round'
              //           strokeWidth={2}
              //           d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              //         />
              //       )}
              //       {item.icon === 'settings' && (
              //         <path
              //           strokeLinecap='round'
              //           strokeLinejoin='round'
              //           strokeWidth={2}
              //           d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              //         />
              //       )}
              //     </svg>
              //   </div>
              //   <span className='ml-3'>{item.label}</span>
              // </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content - adjusted margin based on screen size and sidebar state */}
      <div
        className={`flex-1 flex flex-col min-h-screen ${
          !isMobile ? 'ml-64' : 'ml-0'
        }`}
        onClick={handleContentClick}
      >
        {/* Header */}
        <header className='bg-surface shadow-sm z-10'>
          <div className='flex justify-between items-center px-6 py-4'>
            <div className='flex items-center'>
              {/* Hamburger menu button - only visible on mobile */}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className='mr-4 text-text-primary'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              )}

              <h1 className='text-xl font-semibold text-text-primary'>
                Dashboard
              </h1>
              <nav className='ml-6 hidden sm:flex'>
                <ol className='flex text-sm'>
                  <li>
                    <a href='#' className='text-primary'>
                      Dashboard
                    </a>
                  </li>
                  <li className='mx-2 text-muted'>/</li>
                  <li className='text-text-secondary'>Home</li>
                </ol>
              </nav>
            </div>

            <div className='flex items-center'>
              <button className='p-2 rounded-full hover:bg-background mr-2'>
                <svg
                  className='w-5 h-5 text-text-secondary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </button>
              <div className='flex items-center ml-4'>
                <div className='font-medium hidden sm:block'>
                  <div className='text-sm text-text-primary'>Admin Demo</div>
                  <div className='text-xs text-muted'>admin</div>
                </div>
                <div className='ml-3 relative'>
                  <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white'>
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className='flex-1 overflow-auto bg-background p-6'>
          <Outlet />
        </main>

        {/* Footer */}
        <footer className='bg-surface py-4 px-6 border-t border-border'>
          <div className='text-center text-sm text-muted'>
            &copy; {new Date().getFullYear()} Trackify. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;