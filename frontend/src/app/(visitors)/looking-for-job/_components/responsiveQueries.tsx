"use client"
import { useEffect, useState } from 'react';
import useMobileDetect from '@/utils/useMobileDetect';

const matcher = (counts: number[], full: any) => {
  const { currentDevice, hasMounted } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const isMobileOnly = currentDevice.isMobileOnly();
  const isDesktop = currentDevice.isDesktop();
  const isDesktopXL = currentDevice.isDesktopXL();

  const [number, setNumber] = useState(1);

  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const isSSR = () => Boolean(userAgent.match(/SSR/i));

  useEffect(() => {
    if (isSSR()) {
      setNumber(counts[2]);
    }

    if (isMobileOnly) setNumber(counts[0]);
    else if (isMobile) setNumber(counts[0]);
    else if (isDesktop) setNumber(full ? counts[2] : counts[1]);
    else if (isDesktopXL) setNumber(counts[2]);
    else return setNumber(counts[0]);
  }, [isMobile, isMobileOnly, isDesktop, isDesktopXL, hasMounted]);

  return number;
};

const useMatcher = () => {
  return { matcher };
};

export default useMatcher;
