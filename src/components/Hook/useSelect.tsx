import { Popular } from "../type";

export const loadOptions = async (search: string): Promise<any> => {
  if (!search) {
    return {
      options: [],
    };
  }
  const response = await fetch(`${process.env.REACT_APP_FIND}${search}`);
  const json = await response.json();

  return {
    options: json?.results?.map((e: Popular) => {
      return {
        values: e,
        label: e.title,
      };
    }),
  };
};
