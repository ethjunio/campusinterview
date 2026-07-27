import { axiosInstance } from "@/utils/axios";
import { DeletePreeveentsCredentials } from "@/app/types";

export const deletePreeventsListApi = async (credentials: DeletePreeveentsCredentials) => {
  console.log("credentials here", credentials)

    const { id } = credentials;

    const response = await axiosInstance.delete(
        `/admin/company-preevent/delete/${id}`
      );
    return response.data;
  };
  
