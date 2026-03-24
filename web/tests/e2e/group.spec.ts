import { test, expect, Page } from "@playwright/test";

const GROUP_NAME = `__e2e_그룹_${Date.now()}__`;

const testMap = {
  "그룹 생성 및 목록 노출": 그룹생성및목록노출,
};

async function 그룹생성및목록노출({
  page,
}: {
  page: Page;
}) {
  await page.goto("/");

  // 인트로 애니메이션 대기 (1초 + 여유)
  await page.waitForTimeout(1500);

  // 그룹 목록 로드 대기
  await page.waitForSelector(
    '[data-testid="add-group-btn"]',
  );

  // 생성 전에는 없어야 함
  await expect(
    page.getByText(GROUP_NAME),
  ).not.toBeVisible();

  // + 버튼 클릭
  await page.click('[data-testid="add-group-btn"]');

  // 다이얼로그 노출 확인
  await expect(
    page.getByText("새로운 그룹 만들기"),
  ).toBeVisible();

  // 그룹명 입력
  await page.fill(
    'input[placeholder="ex) 용담 플레이"]',
    GROUP_NAME,
  );

  // 만들기 클릭
  await page
    .locator(".dialog-button")
    .filter({ hasText: "만들기" })
    .click();

  // 목록에 새 그룹 노출 확인
  await expect(page.getByText(GROUP_NAME)).toBeVisible(
    {
      timeout: 10000,
    },
  );
}

for (const [description, fn] of Object.entries(
  testMap,
)) {
  test(description, fn);
}
