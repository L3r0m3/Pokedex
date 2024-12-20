"use client";

import React, { FC } from "react";
import { SearchProvider } from "@/context/SearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type TProviderType = {
  children: React.ReactNode;
};

const Providers: FC<TProviderType> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <SearchProvider>{children}</SearchProvider>
    </QueryClientProvider>
  );
};

export default Providers;
