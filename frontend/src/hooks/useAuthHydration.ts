import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/authStore";

export function useAuthHydration() {
  const [hydrated, setHydrated] = useState(() =>
    useAuthStore.persist?.hasHydrated() ?? false
  );

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  return hydrated;
}
