// The Internet in One Word (Node 22, standard library only):
// writes one word — the whole internet, described in a single word — to
// /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The internet is one giant group chat: strangers arguing, memes flying,
// notifications at 3am, everyone talking over everyone else, nobody ever
// leaving. It makes a reader laugh, then nod.
const WORD = 'groupchat';

// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1-30
// characters, not only whitespace, and a single word. validateEntry checks
// each of those items separately so a failure names the gate item that was
// missed instead of a bare character count.
function validateEntry(word: string, maxChars: number): string {
  if (word.trim().length === 0) {
    throw new Error('gate failed: entry must not be only whitespace');
  }
  if (word.includes('\n') || word.includes('\r')) {
    throw new Error('gate failed: entry must be a single line with no line break');
  }
  if (/\s/.test(word)) {
    throw new Error('gate failed: entry must be a single word with no spaces');
  }
  const chars = [...word].length;
  if (chars < 1 || chars > maxChars) {
    throw new Error(`gate failed: entry must be 1-${maxChars} characters, got ${chars}`);
  }
  return word + '\n';
}

const ENTRY = validateEntry(WORD, 30);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
