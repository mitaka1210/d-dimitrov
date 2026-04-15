import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Readable } from "stream";

const isDev = process.env.NODE_ENV === "development";

// В dev: първо public/article_images/, после upload/
// В prod: само upload/ (Docker volume)
const UPLOAD_DIRS = isDev
  ? [
      path.join(process.cwd(), "public", "article_images"),
      path.join(process.cwd(), "upload"),
    ]
  : [path.join(process.cwd(), "upload")];

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

async function findFile(pathSegments: string[]): Promise<string | null> {
  for (const dir of UPLOAD_DIRS) {
    const filePath = path.join(dir, ...pathSegments);
    const resolved = path.normalize(filePath);

    // Security check
    if (!resolved.startsWith(dir)) {
      continue;
    }

    try {
      const stat = await fs.promises.stat(resolved);
      if (stat.isFile()) {
        return resolved;
      }
    } catch {
      // File not found in this directory, try next
    }
  }
  return null;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await context.params;
  if (!pathSegments?.length) {
    return NextResponse.json({ error: "Path required" }, { status: 400 });
  }
  const hasInvalidSegment = pathSegments.some(
    (seg) => seg === "" || seg.includes("..")
  );
  if (hasInvalidSegment) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const resolved = await findFile(pathSegments);
  if (!resolved) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ext = path.extname(resolved).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";

  const nodeStream = fs.createReadStream(resolved);
  const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream<Uint8Array>;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
