"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const routes = ["/", "/looking-for-job", "/looking-for-talent"];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  const currentIndex = routes.indexOf(pathname);
  const prevIndex = routes.indexOf(prevPath.current);

  const direction = currentIndex > prevIndex ? 100 : -100;

  prevPath.current = pathname;

  return (
    <motion.div
      key={pathname}
      initial={{ x: direction, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -direction, opacity: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}