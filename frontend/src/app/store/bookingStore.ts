import { useGetRoomTypesQuery } from "@/hooks/company/bookings/useGetRoomTypesQuery";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomType {
  id: string;
  name: string;
  price: number;
  availableCount: number;
  count?: number;
  remaining?: number;
  currentPrice?: number;
}

interface BookingState {
  roomTypes: RoomType[] | null;
  setRoomTypes: (data: RoomType[]) => void;
  calculatePrices: (bookings: { roomType: { id: string }; roomBookCount: number }[]) => void;
  updateRoomCount: (id: string, count: number) => void;
  resetBookings: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      roomTypes: null,

      // ✅ Set Room Types in Store
      setRoomTypes: (data) => {
        set({
          roomTypes: data?.data?.map((roomType) => ({
            ...roomType,
            count: roomType.count || 0,
            remaining: roomType.remaining ?? roomType.availableCount, // Set remaining count
            currentPrice: roomType.price, // Default price before calculation
          })),
        });
      },

      // ✅ Calculate `currentPrice` Based on Bookings
      calculatePrices: (bookings) => {
        set((state) => {
          if (!state.roomTypes) return state;

          return {
            roomTypes: state.roomTypes.map((roomType) => {
              const foundBookings = bookings.filter((b) => b.roomType.id === roomType.id);
              const hasBookings = foundBookings.length > 0;

              return {
                ...roomType,
                currentPrice: hasBookings ? Math.floor(roomType.price / 2) : roomType.price,
              };
            }),
          };
        });
      },

      //updated room count 

      updateRoomCount: (id, count) => {
        set((state) => {
          if (!state.roomTypes) return state;

          return {
            roomTypes: state.roomTypes.map((roomType) =>
              roomType.id === id
                ? {
                    ...roomType,
                    count, // Update count
                    remaining: roomType.availableCount - count, // Update remaining count
                  }
                : roomType
            ),
          };
        });
      },

      resetBookings: () => set({ roomTypes: null }),

    }),
    {
      name: "booking-storage",
    }
  )
);
