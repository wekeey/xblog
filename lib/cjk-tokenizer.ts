/**
 * A lightweight CJK-aware tokenizer for Orama search engine
 *
 * Features:
 * - Splits ASCII text by word boundaries (case-insensitive)
 * - Splits CJK text into overlapping bigrams with unigram fallback
 * - Supports mixed CJK/ASCII text
 * - Compatible with Orama's tokenizer interface
 */

/**
 * CJK Unicode ranges for comprehensive character detection
 */
const CJK_RANGES = [
  [0x4e00, 0x9fff], // CJK Unified Ideographs
  [0x3400, 0x4dbf], // CJK Extension A
  [0x20000, 0x2a6df], // CJK Extension B
  [0x2a700, 0x2b73f], // CJK Extension C
  [0x2b740, 0x2b81f], // CJK Extension D
  [0x2b820, 0x2ceaf], // CJK Extension E
  [0xf900, 0xfaff], // CJK Compatibility Ideographs
  [0x3040, 0x30ff], // Hiragana + Katakana
  [0xac00, 0xd7af], // Hangul Syllables
] as const;

/**
 * Check if a character code point belongs to CJK character ranges
 */
function isCJKChar(codePoint: number): boolean {
  return CJK_RANGES.some(
    ([start, end]) => codePoint >= start && codePoint <= end,
  );
}

/**
 * Extract ASCII words from text and normalize to lowercase
 */
function extractASCIITokens(text: string): string[] {
  const matches = text.match(/[A-Za-z0-9_]+/g);
  return matches?.map((token) => token.toLowerCase()) ?? [];
}

/**
 * Generate n-grams from CJK text for better search coverage
 * Creates overlapping bigrams plus individual characters
 */
function generateCJKNgrams(text: string): string[] {
  const chars = Array.from(text);

  // Single character - return as is
  if (chars.length === 1) {
    return chars;
  }

  const tokens: string[] = [];

  // Generate overlapping bigrams
  for (let i = 0; i < chars.length - 1; i++) {
    tokens.push(chars[i] + chars[i + 1]);
  }

  // Add individual characters for single-char queries
  tokens.push(...chars);

  return tokens;
}

/**
 * Tokenize text with CJK awareness
 * Handles mixed CJK and ASCII text by segmenting and applying appropriate tokenization
 */
function tokenizeCJKAware(text: string): string[] {
  if (!text?.trim()) {
    return [];
  }

  const tokens: string[] = [];
  let buffer = "";
  let inCJK = false;

  for (const char of Array.from(text)) {
    const codePoint = char.codePointAt(0) ?? 0;
    const isCJK = isCJKChar(codePoint);

    // Switch between CJK and ASCII modes
    if (inCJK !== isCJK && buffer) {
      // Flush previous segment with appropriate tokenization
      if (inCJK) {
        tokens.push(...generateCJKNgrams(buffer));
      } else {
        tokens.push(...extractASCIITokens(buffer));
      }
      buffer = "";
    }

    inCJK = isCJK;
    buffer += char;
  }

  // Process remaining buffer
  if (buffer) {
    if (inCJK) {
      tokens.push(...generateCJKNgrams(buffer));
    } else {
      tokens.push(...extractASCIITokens(buffer));
    }
  }

  // Remove duplicates while preserving order
  return Array.from(new Set(tokens.filter(Boolean)));
}

/**
 * CJK-aware tokenizer for Orama search engine
 * Provides language-agnostic tokenization for mixed CJK/ASCII content
 */
export const cjkTokenizer = {
  language: "universal" as const,
  normalizationCache: new Map<string, string>(),
  tokenize: tokenizeCJKAware,
} as const;

export default cjkTokenizer;
