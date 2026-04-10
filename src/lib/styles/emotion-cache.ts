import createCache from "@emotion/cache";

export function createEmotionCache() {
  return createCache({ key: "frfojo", prepend: true });
}

