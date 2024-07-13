import { categories } from "./data";

export const serializeParams = (params: URLSearchParams) => {
  const obj = Object.fromEntries(params.entries());

  const newObj: Record<string, string | string[] | number | boolean> = {};

  for (let key in obj) {
    const findFilterType = categories.find((c) => c.key === key);
    newObj[key] = obj[key];
    // array
    if (findFilterType?.type === "checkbox") {
      newObj[key] = obj[key].split("-");
    }
  }

  return newObj;
};
