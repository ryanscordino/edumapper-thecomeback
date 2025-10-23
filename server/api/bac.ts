import { bac, BacTypes } from "../data/bac";

export default defineEventHandler(() => {
  return { data: bac as BacTypes };
});
