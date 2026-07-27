import { axiosInstance } from "@/utils/axios";

export const getCompanyListApi = async (filters: Record<string, any>, size:number, sortOrder:string): Promise<any> => {
  const params = new URLSearchParams({
    isFavourite: "0",
    ...filters,
    size: size.toString(),
    sortOrder: sortOrder
  });

  console.log("Filter params:", params.toString());

  const response = await axiosInstance.get(
    `/student/companyMgmt/getCompanyList?${params.toString()}`
  );
  return response.data;
};
