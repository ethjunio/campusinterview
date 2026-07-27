import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import Provider from "./provider";

import "../styles/index.scss";
import { Suspense } from "react";

import { fetchData } from "@/actions/GET";
import OnlineHeader from "./(visitors)/_components/onlineCampusInterview/homepage/navbar";
import Header from "./(visitors)/_components/campusInterview/homepage/navbar";
import { isOnlineCampusInterview } from "@/utils/interviewBrand";
import { getSiteUiFlagFromFetch } from "@/utils/landingPageData";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: {
    template: "%s | Campus Interview",
    default: "Campus Interview",
  },
  description: "Campus Interview",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const data = await fetchData({ url: "visitor/getlandingPageData" });

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="">
        {/* <QueryClientProvider client={queryClient}> */}
        <NextIntlClientProvider messages={messages}>
          <Provider>
          {isOnlineCampusInterview(getSiteUiFlagFromFetch(data)) ? (
            <OnlineHeader />
          ) : (
            <Header />
          )}
            {/* Todo add suspense fallback ui */}
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </Provider>
        </NextIntlClientProvider>

        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
