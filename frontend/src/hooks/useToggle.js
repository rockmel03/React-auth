import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const toggle = (tValue) => {
    setValue((prev) => {
      return typeof tValue === "boolean" ? tValue : !prev;
    });
  };

  return [value, toggle];
};

export default useToggle;
