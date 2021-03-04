import { useEffect, useState } from "react";

export const usePersistState = (key, defaultValue) => {
  console.log(defaultValue);
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  });
  return [state, setState];
};
