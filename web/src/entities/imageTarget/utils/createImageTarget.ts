const BASE_URL = () => `${process.env.NEXT_URL}/imageTargets/api`;

export const createImageTarget = async (name: string, path: string) => {
  const res = await fetch(BASE_URL(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, path }),
  });
  return res.text();
};
