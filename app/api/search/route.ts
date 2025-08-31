import { createFromSource } from "fumadocs-core/search/server";

import { cjkTokenizer } from "@/lib/cjk-tokenizer";
import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  components: {
    tokenizer: cjkTokenizer,
  },
});
