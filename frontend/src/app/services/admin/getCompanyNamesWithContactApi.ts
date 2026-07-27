import { axiosInstance } from "@/utils/axios";

export const getCompanyNamesWithContactAPI = async (searchParams: {
  search: string;
}): Promise<any> => {
  const queryParams = new URLSearchParams();
  if (searchParams.search) queryParams.append("search", searchParams.search);

  const response = await axiosInstance.get(
    `/admin/companyCredMgmt/getCompanyNamesWithContact?${queryParams.toString()}`
  );
  return response.data;
};
