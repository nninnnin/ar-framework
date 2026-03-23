import { test, expect } from "@playwright/test";

test("GET /groups/api - 그룹 목록 반환", async ({ request }) => {
  const res = await request.get("/groups/api");
  expect(res.status()).toBe(200);

  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  expect(data[0]).toHaveProperty("uid");
  expect(data[0]).toHaveProperty("name");
});

test("POST /groups/api - 그룹 생성", async ({ request }) => {
  const res = await request.post("/groups/api", {
    data: { name: "__테스트그룹__" },
  });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty("uid");

  // 생성된 그룹 확인
  const listRes = await request.get("/groups/api");
  const list = await listRes.json();
  expect(list.some((g: { name: string }) => g.name === "__테스트그룹__")).toBe(true);
});
