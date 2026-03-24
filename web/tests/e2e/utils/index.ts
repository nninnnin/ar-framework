import fs from "fs";
import path from "path";

import { Page } from "@playwright/test";

export const FIXTURES_DIR = path.join(__dirname, "../../fixtures");

export async function waitForAppReady(page: Page) {
  await page.goto("/");
  await page.waitForTimeout(1500);
  await page.waitForSelector('[data-testid="add-project-btn"]');
}

export async function dropGlbFile(page: Page, fileName = "test.glb") {
  const glbBytes = Array.from(
    fs.readFileSync(path.join(FIXTURES_DIR, fileName)),
  );

  // 드롭 존이 렌더링될 때까지 대기
  await page.waitForSelector("text=GLB 파일을 올려보세요.");

  await page.evaluate(
    ({ bytes, name }: { bytes: number[]; name: string }) => {
      const dt = new DataTransfer();
      const file = new File([new Uint8Array(bytes)], name, {
        type: "model/gltf-binary",
      });
      dt.items.add(file);

      const allDivs = Array.from(document.querySelectorAll("div"));
      const target = allDivs.find(
        (div) => div.textContent?.trim() === "GLB 파일을 올려보세요.",
      );
      if (!target) throw new Error("Drop zone not found");

      target.dispatchEvent(
        new DragEvent("dragover", { bubbles: true, cancelable: true }),
      );
      target.dispatchEvent(
        new DragEvent("drop", {
          bubbles: true,
          cancelable: true,
          dataTransfer: dt,
        }),
      );
    },
    { bytes: glbBytes, name: fileName },
  );

  // React 상태 업데이트 대기
  await page.waitForTimeout(500);
}

// 다이얼로그 마지막 버튼 클릭 (항상 "앞으로" 이동 버튼)
export async function clickForwardButton(page: Page) {
  await page
    .locator(".dialog-button-container .dialog-button")
    .last()
    .click();
}
