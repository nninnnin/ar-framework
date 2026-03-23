import { generateUid } from "@/shared/utils/generateUid";
import { findAllGroups, createGroup } from "./queries/index";

export async function GET() {
  const groups = await findAllGroups();
  return Response.json(groups);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const uid = generateUid();

  await createGroup({
    uid,
    createdAt: new Date().toISOString(),
    name: { KO: name },
  });

  return Response.json({ uid, name });
}
