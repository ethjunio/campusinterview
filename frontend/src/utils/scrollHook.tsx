import { useCallback, useEffect, useState } from 'react';

const useScroll = () => {
  const [y, setY] = useState(0); // Initialize with 0 instead of `window?.scrollY`
  const [scrollDirection, setScrollDirection] = useState('');

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setScrollDirection('up');
      } else if (y < window.scrollY) {
        setScrollDirection('down');
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setY(window.scrollY); // Safely access `window` in the browser
      window.addEventListener('scroll', handleNavigation);

      return () => {
        window.removeEventListener('scroll', handleNavigation);
      };
    }
  }, [handleNavigation]);

  return { scrollDirection };
};

export default useScroll;
