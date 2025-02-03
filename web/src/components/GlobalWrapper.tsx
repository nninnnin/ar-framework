"use client";

import React from "react";
import { OverlayProvider } from "@toss/use-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const GlobalWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>{children}</OverlayProvider>
    </QueryClientProvider>
  );
};

export default GlobalWrapper;
