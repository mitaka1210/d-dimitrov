import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let cached: { bg: Record<string, string>; en: Record<string, string> } | null = null;

export async function getErrorMessages() {
  if (cached) return cached;
  const bgPath = path.join(__dirname, 'errorMessages', 'bg.json');
  const enPath = path.join(__dirname, 'errorMessages', 'en.json');
  const [bg, en] = await Promise.all([
    fs.readFile(bgPath, 'utf-8').then((s) => JSON.parse(s)),
    fs.readFile(enPath, 'utf-8').then((s) => JSON.parse(s)),
  ]);
  cached = { bg, en };
  return cached;
}

export function translate(
  messages: { bg: Record<string, string>; en: Record<string, string> },
  key: string,
  locale: string
): string {
  const lang = locale === 'en' ? 'en' : 'bg';
  return messages[lang]?.[key] ?? messages.bg[key] ?? key;
}
