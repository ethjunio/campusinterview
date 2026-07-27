import { axiosInstance } from "@/utils/axios";

export const deleteWithdrawCompanyInterviewRequestApi = async (interviewRequestId: any) => {
    const response = await axiosInstance.delete(
        `company/interviewMgmt/withdrawInterviewRequest`,
        {
            data: { interviewRequestId },
        }
    );
    return response.data;
};