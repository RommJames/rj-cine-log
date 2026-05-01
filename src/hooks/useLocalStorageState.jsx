import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue === null) return initialState;

      try {
        const parsedValue = JSON.parse(storedValue);
        return parsedValue ?? initialState;
      } catch {
        try {
          localStorage.removeItem(key);
        } catch {}
        return initialState;
      }
    } catch {
      return initialState;
    }
  });

  useEffect(
    function () {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    },
    [value, key],
  );

  return [value, setValue];
}
