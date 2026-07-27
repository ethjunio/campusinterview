import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginAPI } from "@/app/services/auth/authApi";
import { LoginCredentials } from "@/app/services/auth/authApi";
import { toast } from "sonner";
import {
  AUTH_STORAGE_KEY,
  clearAuthSession,
  getDashboardPath,
  persistAuthUser,
  persistSessionCookie,
  redirectToDashboard,
  setAuthCookie,
} from "@/utils/authSession";

export interface User {
  id: string;
  email: string;
  type: "admin" | "candidate" | "company";
  candidateId: string | null;
  companyId: string | null;
  isSignedIn: boolean;
  companyOnboardingState: string | null;
  candidateOnboardingState: string | null;
}

interface AuthState {
  user: User | null;
  sockData?: any;
  setSockData: (data: any) => void;
  getConvoData?: any;
  setGetConvoData: (data: any) => void;
  getcandidatestochatData?: any;
  setGetcandidatestochatData: (data: any) => void;
  newMessage?: any;
  setNewMessage: (data: any) => void;
  unreadCountCompany?: any;
  setUnreadCountCompany: (data: any) => void;
  unreadCountCandidate?: any;
  setUnreadCountCandidate: (data: any) => void;

  /** ✅ new field for unanswered matches count */
  unansweredMatchesCount: number;
  setUnansweredMatchesCount: (count: number) => void;

  /** ✅ existing total count */
  totalUnreadCount: number;
  setTotalUnreadCount: (count: number) => void;

  isLoading: boolean;
  error: string | null;
  setUser: (userData: User | null) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout?: (router: any) => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      sockData: null,
      setSockData: (data) => set({ sockData: data }),

      getConvoData: null,
      setGetConvoData: (data) => set({ getConvoData: data }),

      getcandidatestochatData: null,
      setGetcandidatestochatData: (data) =>
        set({ getcandidatestochatData: data }),

      newMessage: null,
      setNewMessage: (data) => set({ newMessage: data }),

      unreadCountCompany: null,
      setUnreadCountCompany: (data) => set({ unreadCountCompany: data }),

      unreadCountCandidate: null,
      setUnreadCountCandidate: (data) => set({ unreadCountCandidate: data }),

      /** ✅ unanswered matches state */
      unansweredMatchesCount: 0,
      setUnansweredMatchesCount: (count) =>
        set({ unansweredMatchesCount: count }),

      /** ✅ total unread count state */
      totalUnreadCount: 0,
      setTotalUnreadCount: (count) => set({ totalUnreadCount: count }),

      user: null,
      isLoading: false,
      error: null,
      setUser: (userData) => set({ user: userData }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await loginAPI(credentials);
          const { accessToken, user } = response.data;

          await persistSessionCookie(accessToken);
          setAuthCookie(accessToken);
          set({ user, isLoading: false });
          persistAuthUser(user);

          const dashboardPath = getDashboardPath(user);
          if (dashboardPath) {
            redirectToDashboard(dashboardPath);
            return;
          }

          if (response?.data?.user?.candidateOnboardingState !== "finished" && response?.data?.user?.type ==="candidate") {
            toast?.warning(
              "Your profile is almost ready. Fill in the remaining mandatory fields to connect with all companies."
            );
          } else if (!response?.data?.user?.hasProfilePicture && response?.data?.user?.type ==="candidate") {
            toast?.warning(
              "Upload a profile picture so companies can put a face to your profile."
            );
          }
        } catch (error: any) {
          throw error;
        }
      },

      logout: async (router: any) => {
        await clearAuthSession();

        // Clear all Zustand state manually
        set({
          user: null,
          sockData: null,
          getConvoData: null,
          getcandidatestochatData: null,
          newMessage: null,
          unreadCountCompany: null,
          unreadCountCandidate: null,
          unansweredMatchesCount: 0, // ✅ reset this too
          totalUnreadCount: 0, // ✅ reset this too
          isLoading: false,
          error: null,
        });

        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();

        router.push("/login");
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
      }),
    }
  )
);

export default useAuthStore;
