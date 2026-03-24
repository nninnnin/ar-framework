import path from "path";

import { test, expect, Page } from "@playwright/test";

import {
  FIXTURES_DIR,
  waitForAppReady,
  dropGlbFile,
  clickForwardButton,
} from "./utils";

const testMap = {
  "위치기반 AR 프로젝트 생성 (GLB 파일 업로드 포함)":
    위치기반AR프로젝트생성,
  "이미지마커 AR 프로젝트 생성 (이미지 타겟 + GLB 업로드 포함)":
    이미지마커AR프로젝트생성,
};

async function 위치기반AR프로젝트생성({
  page,
}: {
  page: Page;
}) {
  const PROJECT_NAME = `__e2e_위치기반_${Date.now()}__`;

  await waitForAppReady(page);

  // 프로젝트 생성 + 버튼 클릭
  await page.click('[data-testid="add-project-btn"]');

  // 프로젝트 타입 선택
  await expect(
    page.getByText("프로젝트 타입 선택"),
  ).toBeVisible();
  await page.getByText("위치기반 AR").click();
  await clickForwardButton(page);

  // 모델 선택
  await expect(
    page.getByText("모델 선택"),
  ).toBeVisible();
  await dropGlbFile(page);
  await expect(
    page
      .locator("#added-models-container")
      .getByText("test.glb"),
  ).toBeVisible({ timeout: 5000 });
  await clickForwardButton(page);

  // 프로젝트명 입력
  await expect(
    page.getByText(
      "AR 프로젝트의 이름을 입력해주세요!",
    ),
  ).toBeVisible();
  await page.fill(
    'input[placeholder="예) 소원의 정원 버블버블"]',
    PROJECT_NAME,
  );
  await page
    .locator(".dialog-button")
    .filter({ hasText: "프로젝트 생성" })
    .click();

  // 로딩 스피너 확인
  await expect(
    page.getByText("프로젝트를 생성하고 있습니다..."),
  ).toBeVisible();

  // 다이얼로그 닫힘 대기 (S3 업로드 + DB 저장)
  await expect(
    page.locator(".dialog-button"),
  ).toHaveCount(0, {
    timeout: 30000,
  });

  // 프로젝트 목록 노출 확인
  await expect(
    page.getByText(PROJECT_NAME),
  ).toBeVisible({ timeout: 5000 });
}

async function 이미지마커AR프로젝트생성({
  page,
}: {
  page: Page;
}) {
  const PROJECT_NAME = `__e2e_마커_${Date.now()}__`;

  await waitForAppReady(page);

  // 프로젝트 생성 + 버튼 클릭
  await page.click('[data-testid="add-project-btn"]');

  // 프로젝트 타입 선택
  await expect(
    page.getByText("프로젝트 타입 선택"),
  ).toBeVisible();
  await page.getByText("이미지마커 AR").click();
  await clickForwardButton(page);

  // 마커 등록
  await expect(
    page.getByText("마커정보 생성과 등록"),
  ).toBeVisible();
  const fileChooserPromise =
    page.waitForEvent("filechooser");
  await page.getByText("마커파일 업로드").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    path.join(FIXTURES_DIR, "test.mind"),
  );
  await expect(
    page.getByText("업로드 된 파일: test.mind"),
  ).toBeVisible({
    timeout: 5000,
  });
  await clickForwardButton(page);

  // 모델 선택
  await expect(
    page.getByText("모델 선택"),
  ).toBeVisible();
  await dropGlbFile(page);
  await expect(
    page
      .locator("#added-models-container")
      .getByText("test.glb"),
  ).toBeVisible({ timeout: 5000 });
  await clickForwardButton(page);

  // 프로젝트명 입력
  await expect(
    page.getByText(
      "AR 프로젝트의 이름을 입력해주세요!",
    ),
  ).toBeVisible();
  await page.fill(
    'input[placeholder="예) 소원의 정원 버블버블"]',
    PROJECT_NAME,
  );
  await page
    .locator(".dialog-button")
    .filter({ hasText: "프로젝트 생성" })
    .click();

  // 로딩 스피너 확인
  await expect(
    page.getByText("프로젝트를 생성하고 있습니다..."),
  ).toBeVisible();

  // 다이얼로그 닫힘 대기
  await expect(
    page.locator(".dialog-button"),
  ).toHaveCount(0, {
    timeout: 30000,
  });

  // 프로젝트 목록 노출 확인
  await expect(
    page.getByText(PROJECT_NAME),
  ).toBeVisible({ timeout: 5000 });
}

for (const [description, fn] of Object.entries(
  testMap,
)) {
  test(description, fn);
}
