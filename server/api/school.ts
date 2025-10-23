import { schools, SchoolsType } from "../data/schools";

export default defineEventHandler(() => {
  return {
    data: schools as SchoolsType,
  };
});
