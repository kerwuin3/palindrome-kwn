import Image from 'next/image';
import backgroundPic from '../public/background.png';
import { useState, useCallback, useMemo } from 'react';
import Toast from '../components/toast.jsx';
import useToast from '../components/useToast.jsx';
import { MdReportGmailerrorred } from 'react-icons/md';
import { CiBookmarkCheck } from 'react-icons/ci';
import { CiWarning } from 'react-icons/ci';
import { Roboto, Montserrat } from 'next/font/google';


const roboto = Roboto({
  weight: ['700'],
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: ['500'],
  subsets: ['latin'],
});

export default function Palindrome() {
  const [inputValue, setInputValue] = useState('');
  const { notifications, setNotifications, showToast } = useToast();

  const isPalindrome = useCallback((str) => {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
  }, []);

  const handleCheck = () => {
    if (inputValue.trim() === '') {
      showToast('error', <MdReportGmailerrorred />,'Error', 'Please enter a value');
    } else if (isPalindrome(inputValue)) {
      showToast('success', <CiBookmarkCheck />, 'Success', 'It\'s a palindrome!');
    } else {
      showToast('warning', <CiWarning />, 'Warning', 'It\'s not a palindrome',  );
    }
  };

  return(
    <>
      <main className='container'>
        <Image
          src={backgroundPic}
          alt='Background'
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: -1,
          }}
          quality={100}
          priority
        />
        <h1 className={`${roboto.className} title`} >Is it a Palindrome?</h1>
        <div className='palindrome'>
          <label className={`${montserrat.className} text-input`} >
            Enter in text to check for a palindrome:
          </label>
          <div className='input-wrapper'>
            <input
              className='palindrome-input'
              type='text'
              value={inputValue}
              autoComplete='off'
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button
            className={`${roboto.className} palindrome-btn`}
            onClick={handleCheck}
          >
            CHECK
          </button>
        </div>
        <div className='definition-div'>
          <p className={`${montserrat.className} definition`}>
            <span>💡</span>
            A <b>palindrome</b> is a word or sentence that&apos;s spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
          </p>
        </div>
      </main>
      <Toast
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </>
  )
}