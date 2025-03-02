import React from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";

interface NotificationProps {
    setShowNotification: (val: boolean) => void;
}

const Notification: React.FC<NotificationProps> = ({ setShowNotification }) => {
    const notifications = [
        "Your order has been shipped!",
        "New discount on beauty products!",
        "Limited-time offer: 20% off!",
      ];

    return (
    <div className="fixed top-16 right-8 bg-white text-black shadow-lg rounded-lg w-80 p-4 z-50">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowNotification(false)} />
          </div>
          <ul className="mt-2">
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <li key={index} className="py-2 border-b last:border-none">
                  {note}
                </li>
              ))
            ) : (
              <li className="py-2 text-gray-500">No new notifications</li>
            )}
          </ul>
        </div>
  )
}

export default Notification
