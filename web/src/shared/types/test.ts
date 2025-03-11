type ParamKey = string;

export type TestCodeWithParam = (inputParams: {
  [key: string]: any;
}) => Promise<any>;

export type TestCodeWithoutParam = () => Promise<any>;

export type TestItemCode =
  | TestCodeWithParam
  | TestCodeWithoutParam;

export type TestItem = {
  name: string;
  code: TestItemCode;
  tester: (result: any) => boolean;
  cleanup?: (result: any) => Promise<void> | void;
  input?: {
    placeholder: string;
    paramKey: ParamKey;
  };
};

export type TestSuite = TestItem[];
