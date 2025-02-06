import path from "path";
import { promises as fs } from "fs";

export async function GET(request: Request) {
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
