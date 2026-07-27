import { getInfoBoxDataAPI } from "@/app/services/admin/getInfoBoxData";
import { InfoBox } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetInfoBoxQuery = (options: any = {}) => {
  return useQuery<{ data: InfoBox }>({
    queryKey: ["infoBox"],
    queryFn: () => getInfoBoxDataAPI(),
    ...options,
  });
};
