"use client";

import React, { Suspense } from "react";
import { OverlayProvider } from "@toss/use-overlay";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import FunnelRedirectionWrapper from "@/shared/components/FunnelRedirectionWrapper";

const queryClient = new QueryClient();

const GlobalWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <Suspense>
          <FunnelRedirectionWrapper>
            {children}
          </FunnelRedirectionWrapper>
        </Suspense>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default GlobalWrapper;
