"use client";

import React from "react";
import useFunnelRedirection from "@/features/projectCreation/hooks/useFunnelRedirection";

const FunnelRedirectionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useFunnelRedirection();

  return <>{children}</>;
};

export default FunnelRedirectionWrapper;
