import { test, expect } from "@playwright/test";

test("GET /glbModels/api - GLB 모델 목록 반환", async ({ request }) => {
  const res = await request.get("/glbModels/api");
  expect(res.status()).toBe(200);

  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
});

test("POST /glbModels/api - GLB 모델 생성 후 uid 반환", async ({ request }) => {
  const res = await request.post("/glbModels/api", {
    data: {
      data: {
        languageMap: { KO: "__테스트모델__" },
        glbUrl: "https://example.com/test.glb",
      },
    },
  });
  expect(res.status()).toBe(201);

  const uid = await res.text();
  expect(uid).toBeTruthy();
});
