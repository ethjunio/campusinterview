import { axiosInstance } from "@/utils/axios";

export const getTalentPoolListApi = async (
  filters: Record<string, any>,
  size: number,
  sortName: string,
): Promise<any> => {
  console.log(filters, "FILTER");
  const params = new URLSearchParams({
    ...filters,
    size: size.toString(),
    sortName: sortName,
  });

  const response = await axiosInstance.get(
    `/company/talentPoolMgmt/getTalentPoolList?${params.toString()}`,
  );
  return response.data;
};
