import { useEffect, useState } from "react";

export default function useLocalStorage({ key, defaultValue }) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    return savedValue !== "undefined" ? JSON.parse(savedValue) : defaultValue;
  });

  useEffect(() => {
    if (key) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
