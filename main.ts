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

// The gate in competition.yaml caps the entry at 30 characters. Naming the
// cap keeps the number in one place and makes the comment the reason the
// limit exists, instead of a bare 30 buried in a function call.
const MAX_CHARS = 30;

// Each gate item gets its own named check so a failure names the item that
// was missed instead of a bare character count. The checks run in the order
// the gate states them: non-blank text, a single line, a single word, then
// the length cap.
function checkNotBlank(word: string): void {
  if (word.trim().length === 0) {
    throw new Error('gate failed: entry must not be only whitespace');
  }
}

function checkSingleLine(word: string): void {
  if (word.includes('\n') || word.includes('\r')) {
    throw new Error('gate failed: entry must be a single line with no line break');
  }
}

function checkSingleWord(word: string): void {
  if (/\s/.test(word)) {
    throw new Error('gate failed: entry must be a single word with no spaces');
  }
}

function checkLength(word: string, maxChars: number): void {
  const chars = [...word].length;
  if (chars < 1 || chars > maxChars) {
    throw new Error(`gate failed: entry must be 1-${maxChars} characters, got ${chars}`);
  }
}

function validateEntry(word: string, maxChars: number): string {
  checkNotBlank(word);
  checkSingleLine(word);
  checkSingleWord(word);
  checkLength(word, maxChars);
  return word + '\n';
}

const ENTRY = validateEntry(WORD, MAX_CHARS);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
