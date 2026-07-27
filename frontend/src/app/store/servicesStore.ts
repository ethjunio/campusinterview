import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useGetAdditionalServicesQuery } from "@/hooks/company/bookings/useGetAdditionalServicesQuery";

// Define Service Type
interface AdditionalService {
  id: string;
  name: string;
  availableCount: number;
  price: number | null;
  selected: boolean;
  remaining: number;
  isPriceOnRequest?: boolean;
  priceLabel?: string;
}

// Define Zustand Store Interface
interface ServicesState {
  services: AdditionalService[];
  setServices: (data: AdditionalService[]) => void;
  toggleService: (id: string) => void;
  resetServices: () => void; // ✅ Add resetServices type
}

// Create Zustand Store
export const useServicesStore = create<ServicesState>()(
  persist(
    (set, get) => ({
      services: [],

      // Set initial services from API
      setServices: (data) => {
        const updatedServices = data?.map((service) => ({
          ...service,
          selected: service.selected || false, // Default to false if not present
          remaining: service.remaining ?? service.availableCount, // Maintain logic from resolver
        }));
        set({ services: updatedServices });
      },

      // Toggle service selection (like Apollo's toggleService mutation)
      toggleService: (id) => {
        set((state) => ({
          services: state.services.map((service) =>
            service.id === id
              ? {
                  ...service,
                  selected: !service.selected,
                  remaining: service.availableCount - (!service.selected ? 1 : 0),
                }
              : service
          ),
        }));
      },

       // ✅ Add function to reset services after successful booking
       resetServices: () => set({ services: [] }),
       
    }),
    {
      name: "services-storage",
    }
  )
);
