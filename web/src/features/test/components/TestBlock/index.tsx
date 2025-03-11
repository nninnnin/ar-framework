import { useRef, useState } from "react";

import TogglerHeader from "@/features/test/components/TestBlock/TestBlockHeader";
import { css } from "@emotion/react";
import {
  TestCodeWithoutParam,
  TestCodeWithParam,
  TestItemCode,
} from "@/shared/types/test";

const TestBlock = ({
  testName,
  runningCode,
  tester,
  cleanup,
  children,
}: {
  testName?: string;
  runningCode: TestItemCode;
  tester: (result: any) => boolean;
  cleanup?: (result: any) => void;
  children?: React.ReactNode;
}) => {
  const [isTestPassed, setIsTestPassed] =
    useState(false);
  const [codeResult, setCodeResult] = useState<
    null | string
  >(null);
  const [showDetails, setShowDetails] =
    useState(false);
  const [isTestRunned, setIsTestRunned] =
    useState(false);

  const testBlockRef = useRef<null | HTMLDivElement>(
    null
  );

  const runTest = async () => {
    const inputElement =
      testBlockRef.current?.querySelector(
        "input"
      ) as HTMLInputElement;

    const result = inputElement
      ? await (runningCode as TestCodeWithParam)({
          [inputElement.name]: inputElement.value,
        })
      : await (runningCode as TestCodeWithoutParam)();
    const matched = tester(result);

    console.log("result: ", result);
    console.log("matched: ", matched);

    if (cleanup) await cleanup(result);

    setCodeResult(String(result));
    setIsTestPassed(matched);

    setShowDetails(true);
    setIsTestRunned(true);
  };

  return (
    <div
      css={css`
        margin-top: 5px;
        margin-bottom: 5px;
      `}
      ref={testBlockRef}
    >
      <TogglerHeader
        isTestRunned={isTestRunned}
        isTestPassed={isTestPassed}
        name={testName}
        showDetails={showDetails}
        handleToggleClick={() =>
          setShowDetails((prev) => !prev)
        }
        handleTestRunClick={runTest}
      >
        {children}
      </TogglerHeader>

      {showDetails && (
        <div
          css={css`
            background-color: #eeeeee;
            border: 1px solid black;
            border-top: 0px;

            padding: 1em;

            display: flex;
            flex-direction: column;
            gap: 0.5em;
          `}
        >
          <div>result: {String(codeResult) ?? ""}</div>
          <div>tester: {tester.toString()}</div>
        </div>
      )}
    </div>
  );
};

export default TestBlock;
