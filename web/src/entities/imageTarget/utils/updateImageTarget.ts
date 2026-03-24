import { UpdateBody } from "@/shared/types";

const BASE_URL = () => `${process.env.NEXT_URL}/imageTargets/api`;

export const updateImageTarget = async (body: UpdateBody) => {
  return fetch(`${BASE_URL()}?imageTargetId=${body.uid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
