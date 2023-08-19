'use client';

import { useTheme } from 'next-themes';

import Text from '@/components/systems/Text';

export default function SettingPage() {
  const { theme, setTheme } = useTheme();

  const handleDarkMode = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else setTheme('light');
  };

  return (
    <>
      <Text className='mb-2 mt-5'>Dark Mode</Text>
      <div
        onClick={handleDarkMode}
        className='relative h-6 w-11 cursor-pointer rounded-full bg-neutral-300 transition-all dark:bg-sky-500'
      >
        <div className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all dark:left-6'></div>
      </div>
    </>
  );
}
