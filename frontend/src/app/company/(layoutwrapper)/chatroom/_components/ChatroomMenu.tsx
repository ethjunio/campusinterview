"use client"
import { Fragment, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import ChatCandidateList from './ChatCandidateList';
import classnames from 'classnames';
import { useSearchParams } from 'next/navigation';
import useAuthStore from '@/app/store/authStore';
import { useWebSocket } from '@/hooks/socket/useWebsocket';

export interface ChatroomMenuProps {
  type: string;
  className?: string;
}

const ChatroomMenu: React.FC<ChatroomMenuProps> = ({ type, className }) => {
  const t = useTranslations();
  const { user } = useAuthStore();

  const searchParams = useSearchParams();
  const candidateId = searchParams.get('candidateId');
  const [candidates, setCandidates] = useState([]);

  const userId = user?.companyId

  const { getcandidatestochatData, unreadCountCandidate, sendMessage, newMessage } = useWebSocket(userId, candidateId);

  useEffect(() => {
    if (candidateId && user && user.companyId) {

      const getCandidateUnreadMessageCountPayload = {
        "type": "get_unread_count_company"
      }

      const getCandidateToChatPayload = {
        type: 'get_candidates_to_chat',
        candidateId: candidateId
      }

      sendMessage(getCandidateToChatPayload);
      sendMessage(getCandidateUnreadMessageCountPayload);
    }
  }, [newMessage, candidateId]);

  // useEffect(() => {
  //   if (getcandidatestochatData) {
  //     const newData = getcandidatestochatData
  //     newData.sort((a: any, b: any) => {
  //       if (new Date(a.lastUpdate) > new Date(b.lastUpdate)) return 1;
  //       else return -1;
  //     });
  //     newData.sort((a: any) => {
  //       if (a.state === 'rejected') return 1;
  //       return -1;
  //     });

  //     if (unreadCountCandidate?.length > 0) {
  //       for (const item of unreadCountCandidate) {
  //         const candidateIndex = newData.findIndex((sortedCompany: any) => {
  //           return sortedCompany.candidate.id === item.candidate.id;
  //         });
  //         if (candidateIndex !== -1) {
  //           newData[candidateIndex]['count'] = item.unreadMessageCount;
  //         }
  //       }
  //     }

  //     setCandidates(newData);
  //   }
  // }, [getcandidatestochatData, unreadCountCandidate, candidateId]);


  useEffect(() => {
    if (getcandidatestochatData) {
      const newData = getcandidatestochatData; // clone to avoid mutation

      // Sort by lastUpdate, handling null/undefined
      newData.sort((a: any, b: any) => {
        const dateA = a.lastUpdate ? new Date(a.lastUpdate) : null;
        const dateB = b.lastUpdate ? new Date(b.lastUpdate) : null;

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateB.getTime() - dateA.getTime(); // latest first
      });

      // Sort to move 'rejected' to the bottom
      // newData.sort((a: any) => {
      //   return a.state === 'rejected' ? 1 : -1;
      // });

      // Add unread message count if available
      if (unreadCountCandidate?.length > 0) {
        for (const item of unreadCountCandidate) {
          const candidateIndex = newData.findIndex(
            (sortedCandidate: any) => sortedCandidate.candidate.id === item.candidate.id
          );
          if (candidateIndex !== -1) {
            newData[candidateIndex]['count'] = item.unreadMessageCount;
          }
        }
      }

      setCandidates(newData);
    }
  }, [getcandidatestochatData, unreadCountCandidate, candidateId]);
  const cn =
    'pt-5 w-100 h-auto vstack vstack-7 border border-light-soft overflow-auto';
  return (
    <Fragment>
      <nav
        style={{ height: 'calc(100vh - 56px)' }}
        className={classnames(cn, className)}>
        <h3 className="px-4 lg:px-8">{t('companies.chatroom.title')}</h3>
        {candidates?.length > 0 ? <ChatCandidateList data={candidates} /> : null}
      </nav>
    </Fragment>
  );
};

export default ChatroomMenu;
