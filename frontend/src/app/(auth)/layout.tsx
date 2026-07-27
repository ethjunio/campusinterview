import LoginIlustration from '@/icons/illustrations/illustration_login.svg';
import Link from 'next/link';
import { getTranslations } from "next-intl/server";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {

  const t = await getTranslations();

  return (
     <main className="flex flex-grow h-screen">
      <section className="hidden sm:block px-8 bg-gray-100 w-1/2 flex relative h-screen">
        <LoginIlustration
          style={{ height: '50vw' }}
          className="absolute left-0 bottom-0 top-0"
        />
      </section>

      <section className="w-full sm:w-1/2 px-8 lg:px-12 mx-auto max-w-md lg:max-w-xl sm-h:mt-7 my-10">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
