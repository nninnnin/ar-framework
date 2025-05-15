"use client";

import React from "react";
import { OverlayProvider } from "@toss/use-overlay";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import useFunnelRedirection from "@/features/projectCreation/hooks/useFunnelRedirection";

const queryClient = new QueryClient();

const GlobalWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useFunnelRedirection();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>{children}</OverlayProvider>
    </QueryClientProvider>
  );
};

export default GlobalWrapper;
