/**
 * Преобразува път от базата (/upload/filename.png) в URL за API route (/api/upload/filename.png).
 * @param {string | null | undefined} path - Път от DB, напр. /upload/1767370010013.png
 * @returns {string | null} URL за img src или null ако path е невалиден
 */
export function getUploadImageUrl(path) {
  if (typeof path !== "string" || !path.trim()) return null;
  const trimmed = path.trim();
  if (!trimmed.startsWith("/upload/")) return null;
  const filename = trimmed.slice("/upload/".length);
  if (!filename) return null;
  return `/api/upload/${filename}`;
}
