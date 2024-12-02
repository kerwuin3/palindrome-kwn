import { useEffect, useState } from 'react';
import errorSound from '../public/sounds/error.mp3';
import successSound from '../public/sounds/success.mp3';
import warningSound from '../public/sounds/warning.mp3';
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['500'],
  subsets: ['latin'],
});

const soundMap = {
  error: errorSound,
  success: successSound,
  warning: warningSound
};

const playNotificationSound = (type) => {
  const soundFile = soundMap[type];
  
  if (soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  }
};

export default function Toast({ notifications, setNotifications }) {
  const [animatingToasts, setAnimatingToasts] = useState([]);
  const [playedNotifications, setPlayedNotifications] = useState(new Set());

  useEffect(() => {
    notifications.forEach(toast => {
      if (!playedNotifications.has(toast.id)) {
        playNotificationSound(toast.type);
        setPlayedNotifications(prev => new Set(prev).add(toast.id));
      }

      setAnimatingToasts(prev => [...prev, toast.id]);

      const timer = setTimeout(() => {
        setAnimatingToasts(prev => prev.filter(id => id !== toast.id));
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== toast.id));
        }, 500);
      }, 5000)

      return () => clearTimeout(timer);
    });
  }, [notifications, setNotifications, playedNotifications]);

  return (
    <ul className={`${montserrat.className} toast-container`}>
      {notifications.map((toast) => (
        <li 
          key={toast.id} 
          className={`toast ${toast.type}
            ${animatingToasts.includes(toast.id) ? 'animate-bounceIn' : 'animate-bounceOut'}
          `}
        >
          <i className='icono'>
            {toast.icon}
          </i>
          <div className='texto'>
            <p>{toast.title}</p>
            <p>{toast.text}</p>
          </div>
          <button
            onClick={() => {
              setAnimatingToasts(prev => prev.filter(id => id !== toast.id));
              setNotifications(prev => prev.filter(n => n.id !== toast.id));
            }}
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  )
}