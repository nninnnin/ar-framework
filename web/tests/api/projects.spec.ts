import { test, expect } from "@playwright/test";

const GROUP_NAME = "수변갤러리";
const GROUP_UID = "4003c360b3c3409f92eea21f4127ab0a";
const salt = Math.random().toString(36).slice(2, 6);

const projectBody = {
  data: {
    name: { KO: `__테스트프로젝트__${salt}` },
    projectType: [4682],
    groupName: [GROUP_UID],
    glbModels: [],
    imageTarget: [],
    isLocked: "false",
    templateId: "",
  },
};

test("GET /projects/api?groupName - 프로젝트 목록 반환", async ({ request }) => {
  const res = await request.get(
    `/projects/api?groupName=${encodeURIComponent(GROUP_NAME)}`,
  );
  expect(res.status()).toBe(200);

  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  expect(data[0]).toHaveProperty("uid");
});

test("POST /projects/api - 프로젝트 생성 후 uid 반환", async ({ request }) => {
  const res = await request.post("/projects/api", { data: projectBody });
  expect(res.status()).toBe(201);

  const uid = await res.text();
  expect(uid).toBeTruthy();
});

test("PUT /projects/api - 프로젝트 수정", async ({ request }) => {
  const createRes = await request.post("/projects/api", { data: projectBody });
  const uid = await createRes.text();

  const updateRes = await request.put(`/projects/api?projectId=${uid}`, {
    data: {
      uid,
      data: {
        ...projectBody.data,
        name: { KO: `__수정완료__${salt}` },
      },
    },
  });
  expect(updateRes.status()).toBe(200);

  // 업데이트 후 전체 데이터 확인
  const getRes = await request.get(
    `/projects/api?groupName=${encodeURIComponent(GROUP_NAME)}`,
  );
  const list = await getRes.json();
  const updated = list.find((p: { uid: string }) => p.uid === uid);
  expect(updated).toMatchObject({
    uid,
    name: `__수정완료__${salt}`,
    groupName: expect.objectContaining({ name: GROUP_NAME }),
    isLocked: false,
  });
});
