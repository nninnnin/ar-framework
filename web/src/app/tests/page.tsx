"use client";

import React from "react";
import { css } from "@emotion/react";

import TestBlock from "@/features/test/components/TestBlock";

import projectTestSuite from "@/entities/project/tests";
import glbModelTestSuite from "@/entities/glbModel/tests";
import TestInput from "@/features/test/components/TestBlock/TestInput";

const TestPage = () => {
  const testSuites = [
    ...projectTestSuite,
    ...glbModelTestSuite,
  ];

  return (
    <div
      css={css`
        background-color: #fff;
        width: 100%;
        height: 100%;

        padding: 1em;
      `}
    >
      <h1
        css={css`
          font-size: 1.2em;
          margin-bottom: 0.8em;
        `}
      >
        테스트 목록
      </h1>

      {testSuites.map((test) => (
        <TestBlock
          key={test.name}
          testName={test.name}
          runningCode={test.code}
          tester={test.tester}
          cleanup={test.cleanup}
        >
          {test.input && (
            <TestInput
              name={test.input.paramKey}
              placeholder={test.input.placeholder}
            />
          )}
        </TestBlock>
      ))}
    </div>
  );
};

export default TestPage;
