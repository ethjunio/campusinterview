import { useQuery } from "@tanstack/react-query";
import { getRoomTypesDataApi } from "@/app/services/company/bookings/getRoomTypesDataApi";

export const useGetRoomTypesQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getRoomTypesData"],
      queryFn: () => getRoomTypesDataApi(),
      ...options,
    });
  };
  

// import { useQuery } from "@tanstack/react-query";
// import { getRoomTypesDataApi } from "@/app/services/company/bookings/getRoomTypesDataApi";
// import useBookingStore from "@/app/store/bookingStore";

// export const useGetRoomTypesQuery = (options: any = {}) => {
//   const { setRoomTypes } = useBookingStore();

//   return useQuery<{ data: any }>({
//     queryKey: ["getRoomTypesData"],
//     queryFn: async () => {
//       const response = await getRoomTypesDataApi();
//       setRoomTypes(response.data); 
//       return response;
//     },
//     ...options,
//   });
// };