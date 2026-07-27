import { useQuery } from "@tanstack/react-query";
import { getchathistoryApi } from "@/app/services/chathistory/getchathistoryApi";

interface UseGetChatHistoryParams {
  senderId: string;
  receiverId: string;
  page?: number;
  options?: any;
}
/** Represents a single file attached to a chat message */
export interface ChatFile {
  id: number;
  messageId: number;
  doc_url: string;
}

/** Represents one chat message in the conversation list */
 interface ChatMessage {
  id: number;
  createdAt: string;          // e.g. "2025-06-11T13:29:45.567Z"
  updatedAt: string;          // e.g. "2025-06-11T14:01:01.413Z"
  companyId: string;          // UUID
  candidateId: string;        // UUID
  contentType: "text" | "file" | string;
  sentBy: "candidate" | "company" | string;
  content: string;
  isRead: boolean;
  isNotified: boolean;
  files: ChatFile[];          // empty array if none
}

/** Pagination metadata */
 interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Top-level API response for conversation list */
 export interface ConversationListResponse {
  status: boolean;
  message: string;
  data: any;
  pagination: Pagination;
  senderId:any,
  receiverId:any,
  page :any,
  options :any
 }
export const useGetChatHistoryQuery = ({
  senderId,
  receiverId,
  page = 0,
  options = {},
}: UseGetChatHistoryParams) => {
  return useQuery<{ data: any }>({
    queryKey: ["getchathistoryApi", senderId, receiverId, page],
    queryFn: () => getchathistoryApi({ senderId, receiverId, page }),
    ...options,
  });
};