"use client"
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Children, cloneElement, FC, useEffect, useState } from 'react';
import c from 'classnames';
import styles from './Sidebar.module.css';
import Overview from '@/icons/ic-home.svg';
import Profile from '@/icons/ic-profile.svg';
import Matching from '@/icons/ic-confirm.svg';
import Chatroom from '@/icons/ic-mail.svg';
import Interviews from '@/icons/ic-calendar.svg';
import Preevent from '@/icons/ic-presentation.svg';
import Companies from '@/icons/ic-company.svg';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useMobileDetect from '@/utils/useMobileDetect';
import { useSidebarStatus } from '@/utils/customHooks';
import useWindowDimensions from '@/utils/useWindowDimensions';
import useAuthStore from '@/app/store/authStore';
import { useWebSocket } from '@/hooks/socket/useWebsocket';

const base = 'block flex pl-3 cursor-pointer hover:bg-h-primary-light';
const active =
  'bg-gradient-135-primary-dark hover:bg-gradient-135-h-primary-dark';

const Item: FC<any> = ({
  client,
  title,
  isActive,
  children,
  href,
  as = href,
  sidebarStatus,
  badge,
}) => {

  const { currentDevice, hasMounted } = useMobileDetect();
  const isMobile = currentDevice.isMobile();
  const { setSidebarStatus } = useSidebarStatus();

  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };
  const cn = c(
    base,
    {
      [active]: isActive,
    },
    'justify-start',
  );
  const classText = c(
    styles['link-text'],
    sidebarStatus ? 'opacity-100 w-full' : '',
  );
  return (
    <Link {...{ href, as }}>
      <li
        className={cn}
        onClick={() => {
          hasMounted && isMobile && setSidebarStatus(!sidebarStatus);
        }}>
        <div className="flex items-center gap-0.8 text-white">
          <span className={styles.link}>{children}</span>
          <div className={classText}>{title}</div>
          {badge && badge > 0 ? (
            <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {badge > 99 ? '99+' : badge}
            </span>
          ) : null}
        </div>
      </li>
    </Link>
  );
};

const Routes: FC<any> = ({ rootPath, children }) => {
  const pathname = usePathname();

  return (
    <div className="py-12 lg:py-0 px-6 lg:px-0">
      <ul>
       {Children.map(children, (child) => {
                const href = `/${rootPath}/${child.props.href}`;
                const baseHref = href.replace('/menu', ''); // normalize
      
                return cloneElement(child, {
                  href,
                  isActive: pathname?.startsWith(baseHref),
                });
              })}
      </ul>
    </div>
  );
};



export const Sidebar: FC<{
  client?: any;
  rootPath: string;
  sidebarStatus?: boolean;
  items: Array<[string, string, FC<{ className: string }>]>;
}> = ({ client, rootPath, items, sidebarStatus }) => {

  const { currentDevice, hasMounted } = useMobileDetect();
  const isMobile = currentDevice.isMobile();

    // 👇 subscribe to totalUnreadCount in real time
    const totalUnreadCount = useAuthStore((state) => state.totalUnreadCount);
        const unansweredMatchesCount = useAuthStore(
        (state) => state.unansweredMatchesCount
      );

  let sidebarClass;
  if (hasMounted && !isMobile) {
    sidebarClass = 'block';
  } else if (hasMounted && isMobile) {
    sidebarClass = !sidebarStatus ? 'hidden' : 'block';
  }

  const cn = c(
    styles.nav,
    'fixed left-0 top-0 bottom-0 mt-14 z-50 h-full flex-shrink w-12 hover:w-48 transition-width duration-200 bg-gradient-135-primary-light',
    sidebarStatus ? 'w-screen block hover:w-screen ' : '',
    sidebarClass,
  );

  // avoid server/client markup mismatch: only render after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className={cn}>
      <Routes rootPath={rootPath}>
        {items.map(([title, href, Icon], index) => (
          <Item
            key={`${index}-${href}`}
            {...{ title, href }}
            sidebarStatus={sidebarStatus}
            client={client}
                        badge={
              href.includes("chatroom")
                ? totalUnreadCount
                : href.includes("matching")
                ? unansweredMatchesCount
                : undefined
            } // ✅ show badges for chat + matching
            >
            <Icon className={styles.icon} />
          </Item>
        ))}
      </Routes>
    </nav>
  );
};

export const CandidateSidebar: FC = () => {
  const t = useTranslations();
  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();

  const { width } = useWindowDimensions();

  return (
    <Sidebar
      rootPath="candidate"
      sidebarStatus={sidebarStatus}
      client={true}
      items={[
        [t('candidate.nav.overview'), 'overview', Overview],
        [t('candidate.nav.profile'), 'profile', Profile],
        [t('candidate.nav.companies'), 'companies', Companies],
        [
          t('candidate.nav.matching'),
          (width ?? 0) < 1024 ? 'matching/menu' : 'matching',
          Matching,
        ],
        [t('candidate.nav.chat'), (width ?? 0) < 1024 ? 'chatroom/menu' : 'chatroom', Chatroom],
        [t('candidate.nav.interviews'), 'interviews', Interviews],
        [t('candidate.nav.preevent'), 'pre-events', Preevent],
      ]}
    />
  );
};


const layout = ({ children }: { children: React.ReactNode }) => {
      const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  // Normalize null → undefined for TypeScript compatibility
  const id = user?.id ?? undefined;
  const companyId = user?.candidateId ?? undefined;
  const type = user?.type ?? undefined;
  const searchParams = useSearchParams();

  const companyIdChat:any = searchParams.get('companyId');

  // ✅ Build tuple safely
  const socketArgs: [string | undefined, string | undefined, string | undefined] =
    pathname?.includes("/chatroom")
      ? [id, companyIdChat, type]
      : [companyId, undefined, type];

  // ✅ Now TS happy
  useWebSocket(...socketArgs);
  return (
    <>
      <CandidateSidebar />
      <section className="lg:ml-12 flex flex-col flex-grow">{children}</section>
    </>
  );
};

export default layout;


