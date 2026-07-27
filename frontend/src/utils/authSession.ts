import Cookies from "js-cookie";

export const AUTH_STORAGE_KEY = "auth-storage";
export const AUTH_COOKIE_NAME = "accessToken";

type AuthUser = {
  type: "admin" | "candidate" | "company" | string;
  id?: string;
  email?: string;
  candidateId?: string | null;
  companyId?: string | null;
  isSignedIn?: boolean;
  companyOnboardingState?: string | null;
  candidateOnboardingState?: string | null;
};

const AUTH_COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 7,
  path: "/",
  sameSite: "strict",
  secure:
    typeof window !== "undefined" && window.location.protocol === "https:",
};

export function getDashboardPath(user: AuthUser | null | undefined): string | null {
  if (!user?.type) return null;

  switch (user.type) {
    case "admin":
      return "/admin/dashboard";
    case "candidate":
      return "/candidate";
    case "company":
      return "/company";
    default:
      return null;
  }
}

export function setAuthCookie(accessToken: string): void {
  Cookies.set(AUTH_COOKIE_NAME, accessToken, AUTH_COOKIE_OPTIONS);
}

export function removeAuthCookie(): void {
  Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
}

export function persistAuthUser(user: AuthUser): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      state: {
        user,
        isLoading: false,
        error: null,
      },
      version: 0,
    })
  );
}

export async function persistSessionCookie(accessToken: string): Promise<void> {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to persist auth session");
  }
}

export async function clearServerSessionCookie(): Promise<void> {
  try {
    await fetch("/api/auth/session", { method: "DELETE" });
  } catch {
    // Best-effort cleanup; client-side session is cleared separately.
  }
}

export function redirectToDashboard(path: string): void {
  window.location.assign(path);
}

export function clearPersistedAuthSession(): void {
  removeAuthCookie();

  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export async function clearAuthSession(): Promise<void> {
  clearPersistedAuthSession();
  await clearServerSessionCookie();
}
