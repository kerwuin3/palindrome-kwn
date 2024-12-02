import { useState } from 'react';


export default function useToast() {
  const [notifications, setNotifications] = useState([]);  

  const showToast = (type, icon, title, text) => {
    const newToast = {
      id: Date.now(),
      type,
      icon,
      title,
      text
    };
    setNotifications(prev => [...prev, newToast]);
  };

  return { notifications, setNotifications, showToast };
};