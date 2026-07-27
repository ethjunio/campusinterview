"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

const Provider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />
      {/* <I18nextProvider i18n={i18n}> */}
      {children}
      {/* </I18nextProvider> */}
    </QueryClientProvider>
  );
};

export default Provider;
