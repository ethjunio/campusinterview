import { axiosInstance } from "@/utils/axios";

interface UpdateBoxcredentials{
  siteUIFlag:number,
   
}

interface payload {
    key :string,
    formdata:FormData
  }
export const updatePolicyGuidanceBoxDataAPI = async (payload: payload) => {
    const response = await axiosInstance.put(
      `/admin/policyTermsMgmt/updatePolicyTermsInfo/${payload?.key}/dev`,
      payload?.formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  
    return response.data;
  };