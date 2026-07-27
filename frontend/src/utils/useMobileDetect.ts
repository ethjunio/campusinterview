"use client";
import { useEffect, useState } from 'react';
import useHasMounted from '@/utils/useHasMounted';

const getMobileDetectByResolution = () => {
  if (typeof window === 'undefined') {
    // We're in SSR, avoid using window
    return {
      isMobile: () => false,
      isMobileOnly: () => false,
      isDesktop: () => false,
      isDesktopXL: () => false,
    };
  }

  const width = window.innerWidth;

  return {
    isMobile: () => width < 1024,
    isMobileOnly: () => width < 600,
    isDesktop: () => width < 2000,
    isDesktopXL: () => width > 2000,
  };
};

const useMobileDetect = () => {
  const hasMounted = useHasMounted();
  const [deviceByResolution, setDeviceByResolution] = useState(() =>
    hasMounted ? getMobileDetectByResolution() : {
      isMobile: () => false,
      isMobileOnly: () => false,
      isDesktop: () => false,
      isDesktopXL: () => false,
    }
  );

  useEffect(() => {
    if (!hasMounted) return;

    const resizeHandler = () => {
      setDeviceByResolution(getMobileDetectByResolution());
    };

    resizeHandler(); // run initially on mount
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [hasMounted]);

  return {
    currentDevice: deviceByResolution,
    hasMounted,
  };
};

export default useMobileDetect;
