import { useEffect, useState } from "react";
import {
  createMemexFetcher,
  pipe,
  pluckData,
  pluckList,
  extractStringValues,
} from "@rebel9/memex-fetcher";
import { last } from "lodash";

const token = process.env.MEMEX_TOKEN ?? "";
const projectId = process.env.MEMEX_PROJECT_ID ?? "";
const memexFetcher = createMemexFetcher(token);

const useAdminPassword = () => {
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await memexFetcher.getList(
          projectId,
          "adminPassword",
          {
            page: 0,
            size: 1,
          }
        );

        const result = await res.json();

        const { password } = pipe(
          result,
          pluckList,
          (list: Array<unknown>) => last(list),
          pluckData,
          extractStringValues(["password"], "KO")
        );

        if (password) {
          setPassword(password);
        }
      } catch (error) {
        console.error(
          "Password fetching error: ",
          error
        );

        throw new Error(
          "패스워드를 가져오던 중 에러가 발생했습니다"
        );
      }
    })();
  }, []);

  return {
    password,
  };
};

export default useAdminPassword;
