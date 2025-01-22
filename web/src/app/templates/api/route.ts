import path from "path";
import { promises as fs } from "fs";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  console.log(request);

  const supabase = await createClient();
  const supaRes = await supabase.from("ar_projects").select();

  console.log(supaRes.data);

  const templatePath = path.resolve(
    process.cwd(),
    "src",
    "assets",
    "templates",
    "location-based.html"
  );

  const templateFile = await fs.readFile(templatePath);

  return new Response(templateFile);
}
