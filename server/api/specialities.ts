import { specialities, SpecialitiesType } from "../data/specialities";

export default defineEventHandler(() => {
  return { data: specialities as SpecialitiesType };
});
