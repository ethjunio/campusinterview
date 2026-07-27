"use client";
import { useEffect, useRef } from "react";
import { initSocket } from "@/utils/socket";
import useAuthStore from "@/app/store/authStore";

export function useWebSocket(
  userId: any,
  companyId: any = "",
  types: string = ""
) {
  const {
    setGetConvoData,
    setSockData,
    setGetcandidatestochatData,
    setUnreadCountCompany,
    setUnreadCountCandidate,
    setTotalUnreadCount, // ✅ setter
    setUnansweredMatchesCount, // ✅ NEW setter for matches
    newMessage,
    getConvoData,
    sockData,
    unreadCountCompany,
    unreadCountCandidate,
    totalUnreadCount, // ✅ added here
    getcandidatestochatData,
    setNewMessage,
  } = useAuthStore();

  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (userId) {
      const socket = initSocket(userId);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket connection established");

        // Initial messages on WebSocket connection
        if (types === "company") {
          socket.send(
            JSON.stringify({
              type: "get_chat_conversation",
              senderId: companyId,
              sentBy: "candidate",
            })
          );
        } else {
          socket.send(
            JSON.stringify({
              type: "get_chat_conversation",
              senderId: companyId,
              sentBy: "company",
            })
          );
        }

        // 👇 ask backend for unanswered matches count
        socket.send(JSON.stringify({ type: "get_unanswered_matches_company" }));
        socket.send(JSON.stringify({ type: "get_unanswered_matches_candidate" }));
        const keepAlive = setInterval(() => socket.readyState === WebSocket.OPEN && socket.send('{"type":"ping"}'), 25_000);
        socket.addEventListener("close", () => clearInterval(keepAlive), { once: true });
        // Get all chat list menu
        if (companyId) {
          socket.send(
            JSON.stringify({
              type: "get_companies_to_chat",
              companyId: companyId,
            })
          );
          socket.send(
            JSON.stringify({
              type: "get_candidates_to_chat",
              candidateId: companyId,
            })
          );
        } else {
          socket.send(JSON.stringify({ type: "get_companies_to_chat" }));
          socket.send(JSON.stringify({ type: "get_candidates_to_chat" }));
        }

        socket.send(JSON.stringify({ type: "get_unread_count_candidate" }));
        socket.send(JSON.stringify({ type: "get_unread_count_company" }));
      };

      socket.onmessage = (event: MessageEvent) => {
        try {
          const message = JSON.parse(event.data);

          if (message.type === "get_chat_conversation") {
            setGetConvoData(message.data);
          }
          if (message.type === "get_total_chat_list") {
            setSockData(message.data);
          }
          if (message.type === "get_total_candidate_chat_list") {
            setGetcandidatestochatData(message.data);
          }
          if (message.type === "new_message") {
            setNewMessage(message.data);
          }

          // NOTE: keep your existing mapping as-is:
          // "unread_count_candidate" -> setUnreadCountCompany
          // "unread_count_company"   -> setUnreadCountCandidate

          if (message.type === "unread_count_candidate") {
            setUnreadCountCompany(message.data);

            if (message.totalUnreadCount !== undefined) {
              setTotalUnreadCount(message.totalUnreadCount);
            } else {
              const { unreadCountCandidate: currentCandidate } =
                useAuthStore.getState();
              const total =
                (Number(message.data) || 0) + (Number(currentCandidate) || 0);
              setTotalUnreadCount(total);
            }
          }

          if (message.type === "unread_count_company") {
            setUnreadCountCandidate(message.data);

            if (message.totalUnreadCount !== undefined) {
              setTotalUnreadCount(message.totalUnreadCount);
            } else {
              const { unreadCountCompany: currentCompany } =
                useAuthStore.getState();
              const total =
                (Number(message.data) || 0) + (Number(currentCompany) || 0);
              setTotalUnreadCount(total);
            }
          }

          // ✅ handle unanswered matches for company
          if (message.type === "unanswered_matches_company") {
            setUnansweredMatchesCount(message.count);
          }
          // ✅ handle unanswered matches for company
          if (message.type === "unanswered_matches_candidate") {
            setUnansweredMatchesCount(message.count);
          }
        } catch (error) {
          console.log("❌ Error parsing message:", error);
        }
      };

      socket.onerror = (error: Event) => {
        console.log("error in user connection", error);
      };
    }
  }, [userId, companyId]);

  // Send updated messages whenever userId or companyId changes
  useEffect(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      if (types === "company") {
        socketRef.current.send(
          JSON.stringify({
            type: "get_chat_conversation",
            senderId: companyId,
            sentBy: "candidate",
          })
        );
      } else {
        socketRef.current.send(
          JSON.stringify({
            type: "get_chat_conversation",
            senderId: companyId,
            sentBy: "company",
          })
        );
      }
    }
  }, [userId, companyId]);

  // 🔥 refresh unread counts when hook mounts / user changes
  useEffect(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "get_unread_count_candidate" }));
      socketRef.current.send(JSON.stringify({ type: "get_unread_count_company" }));
      socketRef.current.send(JSON.stringify({ type: "get_unanswered_matches_company" })); // 👈 refresh unanswered matches too
    }
  }, [userId]);

  const sendMessage = (message: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };
  const sendMessageAwait = (
    message: object,
    timeout = 10_000
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) {
        return reject(new Error("WebSocket is not open"));
      }

      const handler = (event: MessageEvent) => {
        let msg;
        try {
          msg = JSON.parse(event.data);
        } catch {
          return;
        }

        if (msg.type === "new_message") {
          socketRef.current?.removeEventListener("message", handler);
          clearTimeout(timer);
          resolve(msg.data);
        }
      };

      socketRef.current.addEventListener("message", handler);

      const timer = setTimeout(() => {
        socketRef.current?.removeEventListener("message", handler);
        reject(new Error("Timed out waiting for new_message"));
      }, timeout);

      socketRef.current.send(JSON.stringify(message));
    });
  };

  const readMessage = (message: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return {
    getConvoData,
    sockData,
    getcandidatestochatData,
    newMessage,
    unreadCountCompany,
    unreadCountCandidate,
    totalUnreadCount,
    sendMessage,
    readMessage,
    sendMessageAwait,
  };
}
