import React, { FC, ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import Header from '../organisms/header/Header';

type Props = {
  isSignedIn: boolean;
  children?: ReactNode;
};

export const SiteLayout: FC<Props> = ({ children, isSignedIn }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Head>
        <link rel="shortcut icon" href="/favs/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favs/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favs/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favs/favicon-16x16.png"
        />
        <link rel="manifest" href="/favs/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favs/safari-pinned-tab.svg"
          color="#388bed"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="IEwarning">
        You are currently using unsupported internet browser. Please use
        Chrome/Firefox/Safari/Opera or Edge.
      </div>
      <Header isSignedIn={isSignedIn} />
      {children}
    </div>
  );
};

// Adjusting getSiteLayout to match expected type
export function getSiteLayout(
  page: ReactNode, // Change from ReactElement to ReactNode for broader compatibility
  isSignedIn = false,
): ReactElement {
  return <SiteLayout isSignedIn={isSignedIn}>{page}</SiteLayout>;
}

