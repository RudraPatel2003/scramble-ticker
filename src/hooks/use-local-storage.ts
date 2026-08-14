import { useCallback, useState } from "react";

function readValue<Value>(key: string, fallbackValue: Value): Value {
  const storedValue = window.localStorage.getItem(key);

  if (storedValue === null) {
    return fallbackValue;
  }

  try {
    return JSON.parse(storedValue) as Value;
  } catch {
    return fallbackValue;
  }
}

export function useLocalStorage<Value>(
  key: string,
  initialValue: Value,
): [Value, (value: Value) => void] {
  const [value, setValue] = useState<Value>(() => readValue(key, initialValue));

  const storeValue = useCallback(
    (updatedValue: Value): void => {
      window.localStorage.setItem(key, JSON.stringify(updatedValue));

      setValue(updatedValue);
    },
    [key],
  );

  return [value, storeValue];
}
