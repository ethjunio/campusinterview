"use client"
import { useTranslations } from 'next-intl';
import { BackLink } from '@/components/atoms/BackLink';
import { EditLink } from '@/components/molecules/EditLink';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
export interface EditProfileMenuProps {
  type?: string;
  editLinks?: { label: string; href: string }[];
}

const EditProfileMenu: React.FC<EditProfileMenuProps> = ({
  type,
  editLinks,
}) => {
  const t = useTranslations(type);
  const pathname = usePathname();
  const router = useRouter();
  const cn = 'pt-4 w-full lg:w-72 h-full border border-light';

  return (
    <nav className={cn}>
      <BackLink className="px-8" href={`/company/profile`}>
        {t('profile.back')}
      </BackLink>
      <h1 className="px-8 py-4">{t('profile.title')}</h1>
      <ul className="vstack vstack-2">
        {editLinks?.map(({ label, href }) => (
          <EditLink
            key={label}
            active={pathname === href}
            label={t(label)}
            href={href}
          />
        ))}
      </ul>
    </nav>
  );
};

export default EditProfileMenu;
