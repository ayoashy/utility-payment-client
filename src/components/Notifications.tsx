import { Calendar, AlertCircle, CheckCircle, Info, Bell } from 'lucide-react';

const NotificationItem = ({ notification }) => {
  // Determine icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <Calendar size={16} className='text-[#1A73E8]' />;
      case 'warning':
        return <AlertCircle size={16} className='text-[#FACC15]' />;
      case 'success':
        return <CheckCircle size={16} className='text-[#34D399]' />;
      case 'info':
        return <Info size={16} className='text-[#3B82F6]' />;
      default:
        return <Info size={16} className='text-[#3B82F6]' />;
    }
  };

  return (
    <div className='p-4 border-b border-[#D1D9E6] hover:bg-[#F4F7FC]'>
      <div className='flex'>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            notification.type === 'reminder'
              ? 'bg-[#1A73E8]/10'
              : notification.type === 'warning'
              ? 'bg-[#FACC15]/10'
              : notification.type === 'success'
              ? 'bg-[#34D399]/10'
              : 'bg-[#3B82F6]/10'
          }`}
        >
          {getIcon(notification.type)}
        </div>
        <div>
          <p className='text-sm text-[#0D1B2A]'>{notification.message}</p>
          <p className='text-xs text-[#64748B] mt-1'>{notification.date}</p>
        </div>
      </div>
    </div>
  );
};

const Notifications = ({ notifications }) => {
  // Show only the first 3 notifications
  const displayedNotifications = notifications.slice(0, 3);

  return (
    <div className='bg-[#FFFFFF] rounded-lg shadow-sm overflow-hidden'>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold text-[#0D1B2A]'>Notifications</h2>
          <span className='bg-[#1A73E8] text-white text-xs px-2 py-1 rounded-full'>
            {notifications.length}
          </span>
        </div>

        {displayedNotifications.length > 0 ? (
          <div>
            {displayedNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}

            {notifications.length > 3 && (
              <div className='p-4 text-center'>
                <button className='text-sm text-[#1A73E8] hover:underline'>
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='py-8 text-center'>
            <div className='flex justify-center mb-3'>
              <Bell size={24} className='text-[#64748B]' />
            </div>
            <p className='text-[#3D5A80]'>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
