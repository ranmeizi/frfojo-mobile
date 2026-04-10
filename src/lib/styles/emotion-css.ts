import createEmotion from "@emotion/css/create-instance";

const emotion = createEmotion({
  key: "frfojo",
  prepend: true,
});

export const css = emotion.css;
export const cx = emotion.cx;
export const keyframes = emotion.keyframes;
export const injectGlobal = emotion.injectGlobal;
export const emotionCache = emotion.cache;
