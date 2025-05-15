"use client";

import { useEffect } from "react";
import { useSelectedProjectType } from "@/features/project/store";
import {
  redirect,
  useSearchParams,
} from "next/navigation";

const useFunnelRedirection = () => {
  const searchParams = useSearchParams();

  const { selectedProjectType } =
    useSelectedProjectType();

  useEffect(() => {
    const projectCreationFunnelStep = searchParams.get(
      "project-creation-funnel.step"
    );

    if (!projectCreationFunnelStep) return;

    const isProjectTypeSelectionStep =
      projectCreationFunnelStep === "프로젝트타입선택";

    if (
      !isProjectTypeSelectionStep &&
      !selectedProjectType
    ) {
      redirect("/");
    }
  }, [selectedProjectType, searchParams]);
};

export default useFunnelRedirection;
