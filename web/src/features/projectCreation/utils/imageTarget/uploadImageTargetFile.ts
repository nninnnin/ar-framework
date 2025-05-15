import { createMemexFetcher } from "@rebel9/memex-fetcher";

const TOKEN = process.env.MEMEX_TOKEN ?? "";
const PROJECT_ID = process.env.MEMEX_PROJECT_ID ?? "";

const memexFetcher = createMemexFetcher(TOKEN);

export const uploadImageTargetFile = async (
  file: File | undefined
) => {
  if (!file) {
    throw new Error(
      "업로드 에러: 마커파일이 존재하지 않습니다."
    );
  }

  return await memexFetcher.postMedia(
    PROJECT_ID,
    file
  );
};
