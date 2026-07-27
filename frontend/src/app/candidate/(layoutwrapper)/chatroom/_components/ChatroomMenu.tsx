"use client"
import { Fragment, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import classnames from 'classnames';
import { useSearchParams } from 'next/navigation';
import ChatCompanyList from './ChatCompanyList';
import { useWebSocket } from '@/hooks/socket/useWebsocket';
import useAuthStore from '@/app/store/authStore';

export interface ChatroomMenuProps {
  type: string;
  className?: string;
}

const ChatroomMenu: React.FC<ChatroomMenuProps> = ({ type, className }) => {
  const t = useTranslations();
  const { user } = useAuthStore();
  const [companies, setCompanies] = useState([]);

  const searchParams = useSearchParams();

  const companyId = searchParams.get('companyId');

  const userId = user?.candidateId

  const { sockData: getCompanyToChat, unreadCountCompany, sendMessage, newMessage } = useWebSocket(userId, companyId);

  useEffect(() => {
    if (companyId && user && user.candidateId) {

      const getCompanyUnreadMessageCountPayload = {
        "type": "get_unread_count_candidate"
      }

      const getCompanyToChatPayload = {
        type: 'get_companies_to_chat',
        companyId: companyId
      }
      sendMessage(getCompanyToChatPayload);
      sendMessage(getCompanyUnreadMessageCountPayload);
    }
  }, [newMessage, companyId]);

  // useEffect(() => {
  //   if (getCompanyToChat) {
  //     const newData = getCompanyToChat
  //     newData.sort((a:any, b:any) => {
  //       if (new Date(a.lastUpdate) > new Date(b.lastUpdate)) return 1;
  //       else return -1;
  //     });
  //     newData.sort((a:any) => {
  //       if (a.state === 'rejected') return 1;
  //       return -1;
  //     });

  //     if (unreadCountCompany?.length > 0) {
  //       for (const item of unreadCountCompany) {
  //         const companyIndex = newData.findIndex((sortedCompany: any) => {
  //           return sortedCompany.company.id === item.company.id;
  //         });
  //         if (companyIndex !== -1) {
  //           newData[companyIndex]['count'] = item.unreadMessageCount;
  //         }
  //       }
  //     }

  //     setCompanies(newData);
  //   }
  // }, [getCompanyToChat, unreadCountCompany, companyId]);

  useEffect(() => {
    if (getCompanyToChat) {
      const newData = getCompanyToChat // clone to avoid mutating original data

      // Sort by lastUpdate, placing null/undefined values at the end
      newData.sort((a: any, b: any) => {
        const dateA = a.lastUpdate ? new Date(a.lastUpdate) : null;
        const dateB = b.lastUpdate ? new Date(b.lastUpdate) : null;

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1; // a goes after b
        if (!dateB) return -1; // a goes before b
        return dateB.getTime() - dateA.getTime(); // latest date first
      });

      // Sort again to push 'rejected' state to the end
      // newData.sort((a: any) => {
      //   return a.state === 'rejected' ? 1 : -1;
      // });

      // Apply unread count if available
      if (unreadCountCompany?.length > 0) {
        for (const item of unreadCountCompany) {
          const companyIndex = newData.findIndex(
            (sortedCompany: any) => sortedCompany.company.id === item.company.id
          );
          if (companyIndex !== -1) {
            newData[companyIndex]['count'] = item.unreadMessageCount;
          }
        }
      }

      setCompanies(newData);
    }
  }, [getCompanyToChat, unreadCountCompany, companyId]);

  const cn =
    'pt-5 w-100 h-auto vstack vstack-7 border border-light-soft overflow-auto';
  return (
    <Fragment>
      <nav
        style={{ height: 'calc(100vh - 56px)' }}
        className={classnames(cn, className)}>
        <h3 className="px-4 lg:px-8">{t('candidate.chatroom.title')}</h3>
        {companies?.length > 0 ? <ChatCompanyList data={companies} /> : null}
      </nav>
    </Fragment>
  );
};

export default ChatroomMenu;
