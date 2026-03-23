import { test, expect } from "@playwright/test";

test("POST /upload/api - presigned URL 발급 (key, fileUrl 포함)", async ({ request }) => {
  const res = await request.post("/upload/api", {
    data: {
      fileName: "test.glb",
      contentType: "model/gltf-binary",
    },
  });
  expect(res.status()).toBe(200);

  const data = await res.json();
  expect(data.presignedUrl).toBeTruthy();
  expect(data.key).toBeTruthy();
  expect(data.fileUrl).toBeTruthy();
});

test("presigned URL로 파일 PUT → S3 저장 확인", async ({ request }) => {
  // 1. presigned URL 발급
  const uploadRes = await request.post("/upload/api", {
    data: {
      fileName: "test.glb",
      contentType: "model/gltf-binary",
    },
  });
  expect(uploadRes.status()).toBe(200);

  const { presignedUrl, fileUrl } = await uploadRes.json();

  // 2. presigned URL로 S3에 직접 PUT
  const fileContent = Buffer.from("fake-glb-content");
  const putRes = await request.put(presignedUrl, {
    data: fileContent,
    headers: { "Content-Type": "model/gltf-binary" },
  });
  expect(putRes.status()).toBe(200);

  // fileUrl이 S3 경로 형식인지 확인 (버킷은 비공개이므로 HEAD 대신 URL 형식 검증)
  expect(fileUrl).toMatch(/^https:\/\/.+\.s3\..+\.amazonaws\.com\/.+/);
});
