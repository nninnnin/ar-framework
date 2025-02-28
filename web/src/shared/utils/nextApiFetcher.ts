import { UpdateBody } from "@/shared/types";
import axios from "axios";

interface FetcherConfig {
  entity: "group" | "project" | "glbModel";
}

const createNextApiFetcher = ({
  entity,
}: FetcherConfig) => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_URL}/${entity}s/api`,
  });

  return {
    getItem: async <T>(uid: string) =>
      await axiosInstance.get<T>(
        `?${entity}Id=${uid}`
      ),
    getItems: async <T>(filter?: {
      groupName: string;
    }) => {
      if (entity === "project") {
        return await axiosInstance.get<T>("", {
          params: {
            groupName: encodeURIComponent(
              filter?.groupName ?? ""
            ),
          },
        });
      }

      return await axiosInstance.get<T>("");
    },
    createItem: async (body: any) =>
      await axiosInstance.post("", body),
    updateItem: async (
      uid: string,
      body: UpdateBody
    ) => {
      return await axiosInstance.put(
        `?${entity}Id=${uid}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    deleteItem: async (uid: string) =>
      await axiosInstance.delete(`?${entity}=${uid}`),
  };
};

export default createNextApiFetcher;
