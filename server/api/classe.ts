import { classes, ClassesType } from "../data/classe";

export default defineEventHandler(() => {
  return { data: classes as ClassesType };
});
