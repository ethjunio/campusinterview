"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useAuthStore from "../store/authStore";
import { useAuthHydration } from "@/hooks/useAuthHydration";
import { AUTH_COOKIE_NAME, clearPersistedAuthSession } from "@/utils/authSession";

const Page = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const hydrated = useAuthHydration();

  const hasFinishedOnboarding = user?.companyOnboardingState === "finished";

  useEffect(() => {
    if (!hydrated) return;

    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (!token || !user) {
      clearPersistedAuthSession();
      router.replace("/login");
      return;
    }

    router.replace(
      hasFinishedOnboarding
        ? "/company/overview"
        : "/company/onboarding/general"
    );
  }, [router, hasFinishedOnboarding, hydrated, user]);

  return null;
};

export default Page;
